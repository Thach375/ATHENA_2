import { PaginationResult } from '@common/interface';
import { EnglishProficiencyType } from '@constants/enum';
import { UserService } from '@modules/user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ChancesPropRepository } from './chances-properties/chances-properties.repository';
import { InsertSchoolDto } from './dto/insert-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { MajorRepository } from './major/major.repository';
import { Major } from './major/major.schema';
import { SchoolRepository } from './school.repository';
import { School } from './school.schema';
import * as fs from 'fs';
import * as path from 'path';
import mongoose from 'mongoose';
import { ObjectUtils } from 'src/utils/object.util';
import { Profile } from '@modules/user/profile/profile.schema';
import { OpenAiService } from 'src/external-services/open-ai/open-ai.service';
import { ChanceLogService } from '@modules/chance-logs/chance-log.service';

@Injectable()
export class SchoolService {
  constructor(
    private readonly schoolRepository: SchoolRepository,
    private readonly majorRepository: MajorRepository,
    private readonly userService: UserService,
    private readonly chancePropRepository: ChancesPropRepository,
    private readonly openAiService: OpenAiService,
    private readonly chanceLogService: ChanceLogService,
  ) {}

  public async userListSchoolChances(id: string) {
    const user = await this.userService.userGetProfile(id);
    const schools = await this.schoolRepository.model.find({});

    const logs = await this.chanceLogService.reverseAllLog(id);

    if (logs?.length !== schools.length || logs?.length === 0) {
      await this.chanceLogService.removeAllLog(id);
      const results = await this.openAIChances(
        user.profile,
        schools.map((school) => ({
          id: school._id.toString(),
          name: school.name,
        })),
      );
      for (const result of results) {
        await this.chanceLogService.saveLog({
          userId: id,
          schoolId: result.id,
          chanceScore: result.result,
        });
      }
      return results;
    } else {
      return logs.map((l) => {
        return { id: l.school.toString(), result: l.chanceScore };
      });
    }
  }

  public async listAllSchools(): Promise<School[]> {
    return await this.schoolRepository.model.find({});
  }

  public async userListMajors(): Promise<string[]> {
    const majorContent = await fs.readFileSync(
      path.join(__dirname, '../../assets/majors.json'),
    );
    const majors = JSON.parse(majorContent.toString());
    return majors.data;
  }

  public async userGetChances(
    schoolId: string,
    userId: string,
  ): Promise<string | number | null> {
    const school = await this.schoolRepository.model
      .findOne({
        _id: new mongoose.Types.ObjectId(schoolId),
      })
      .lean();

    if (!school) {
      throw new BadRequestException(`School not found.`);
    }

    // const user = await this.userService.userGetProfile(userId);

    const chanceLog = await this.chanceLogService.reverseLog(
      userId,
      school._id.toString(),
    );

    // if (!chanceLog) {
    //   const chanceScore = await this.openAIChances(school.name, user.profile);

    //   await this.chanceLogService.saveLog({
    //     userId: userId,
    //     schoolId: school._id.toString(),
    //     chanceScore: chanceScore,
    //   });

    //   return chanceScore;
    // }

    return chanceLog.chanceScore;
  }

  public async userDetailSchool(
    schoolId: string,
    userId: string,
  ): Promise<School & { chanceScore?: number }> {
    const school = await this.schoolRepository.model
      .findOne({
        _id: new mongoose.Types.ObjectId(schoolId),
      })
      .lean();

    const properties = await this.chancePropRepository.model.findOne({
      school: (school as School & { _id: mongoose.Types.ObjectId })._id,
    });
    const gpaProps = properties?.gpa?.gpa;
    const avgGpa = (gpaProps?.[3] + gpaProps?.[2]) / 2;
    Object.assign(school, {
      avgGpa: avgGpa ? +(avgGpa / 25)?.toFixed(2) : null,
    });

    if (userId) {
      // const user = await this.userService.userGetProfile(userId);
      // const chanceScore = await this.openAIChances(school.name, user.profile);
      // if (chanceScore) {
      //   Object.assign(school, { chanceScore: chanceScore });
      // }
    }

    return school;
  }

  public async userListSchool(
    query: {
      name: string;
      sort: string;
      limit: number;
      page: number;
      country: string;
      minScholarship: number;
      maxScholarship: number;
      minCost: number;
      maxCost: number;
      major: string;
    },
    userId?: string,
  ): Promise<PaginationResult<School>> {
    const user = await this.userService.userGetProfile(userId);
    const intendedSchools = await this.schoolRepository.model.find({
      _id: { $in: user.profile?.aspiration?.intendedUniversities || [] },
    });

    Object.assign(query, {
      ignoreSchools: user.profile?.aspiration?.intendedUniversities || [],
    });

    const result = await this.adminListSchool(query);

    result.data.unshift(...intendedSchools);

    for (const school of result.data) {
      const properties = await this.chancePropRepository.model.findOne({
        school: (school as School & { _id: mongoose.Types.ObjectId })._id,
      });
      const gpaProps = properties?.gpa?.gpa;
      const avgGpa = (gpaProps?.[3] + gpaProps?.[2]) / 2;
      Object.assign(school, {
        avgGpa: avgGpa ? +(avgGpa / 25).toFixed(2) : null,
      });
      // if (userId) {
      //   const calcResult = await this.openAIChances(school.name, user.profile);
      //   if (calcResult) {
      //     Object.assign(school, {
      //       chanceScore: calcResult,
      //     });
      //   }
      // }
    }

    return result;
  }

  public async adminListSchool(query: {
    name?: string;
    sort?: string;
    limit?: number;
    page?: number;
    country?: string;
    major?: string;
    minCost?: number;
    maxCost?: number;
    minScholarship?: number;
    maxScholarship?: number;
    ignoreSchools?: string[];
  }): Promise<PaginationResult<School>> {
    const conditions = {};
    const sorts = {};

    if (query.name) {
      Object.assign(conditions, {
        name: {
          $regex: new RegExp(`${query.name?.toLowerCase()}`),
          $options: 'i',
        },
      });
    }

    if (query.sort) {
      Object.assign(sorts, ObjectUtils.getSorts(query.sort));
    }

    if (query.minCost) {
      Object.assign(conditions, { cost: { $gte: +query.minCost } });
    }

    if (query.maxCost) {
      Object.assign(conditions, { cost: { $lte: +query.maxCost } });
    }

    if (query.major) {
      Object.assign(conditions, {
        majors: { $regex: `${query.major.toLowerCase()}`, $options: 'i' },
      });
    }

    if (query.country) {
      Object.assign(conditions, { country: query.country.toUpperCase() });
    }

    if (query.ignoreSchools) {
      Object.assign(conditions, {
        _id: {
          $nin: query.ignoreSchools.map(
            (id) => new mongoose.Types.ObjectId(id),
          ),
        },
      });
    }

    return await this.schoolRepository.listWithPaginate({
      match: conditions,
      sort: sorts,
      limit: query.limit,
      page: query.page,
    });
  }

  public async updateSchool(id: string, body: UpdateSchoolDto): Promise<void> {
    const school = await this.schoolRepository.model.findOne({ _id: id });

    if (!school) {
      throw new BadRequestException(`school.NOT_FOUND`);
    }

    Object.assign(school, body);

    await school.save();
  }

  public async insertSchool(body: InsertSchoolDto): Promise<void> {
    const schoolDocs = await this.schoolRepository.model.create(body);
    await schoolDocs.save();
  }

  public async deleteSchool(id: string): Promise<void> {
    const school = await this.schoolRepository.model.findOne({ _id: id });

    if (!school) {
      throw new BadRequestException(`school.NOT_FOUND`);
    }

    await this.schoolRepository.model.deleteOne({ _id: id });
  }

  public async listMajor(query: any): Promise<PaginationResult<Major>> {
    const conditions = {};

    if (query.name) {
      Object.assign(conditions, {
        name: {
          $regex: new RegExp(`${query.name?.toLowerCase()}`),
          $options: 'i',
        },
      });
    }

    return await this.majorRepository.listWithPaginate({
      match: conditions,
      limit: query.limit,
      page: query.page,
    });
  }

  public async openAIChances(
    profile: Profile,
    schools: { name: string; id: string }[],
  ): Promise<{ id: string; result: string }[]> {
    const chanceScore = await this.openAiService.requestChances(
      schools,
      profile,
    );

    const data = JSON.parse(chanceScore);

    return data.map((d) => {
      return {
        id: d?.id || '',
        result: this.getChanceLabel(d?.result),
      };
    });
  }

  getChanceLabel(result: string): string {
    if (result.includes('very hard')) {
      return 'Very hard';
    }

    if (result.includes('hard')) {
      return 'Hard';
    }

    if (result.includes('average')) {
      return 'Average';
    }

    if (result.includes('potential')) {
      return 'Potential';
    }

    if (result.includes('easy')) {
      return 'Easy';
    }

    return 'Hard';
  }

  // Chance function
  public async chances(user: any, properties: any): Promise<string> {
    Object.assign(user, { ...user.profile });
    delete user.profile;

    let criteria = 1;
    let gpaScore = 0;
    let courseworkScore = 0;
    let testScore = 0;
    let extracurricularScore = 0;

    if (!properties || !user?.grades?.gpa) {
      return null;
    }

    // GPA evaluate
    if (user?.grades?.gpa) {
      const userGpa = (user.grades.gpa * 100) / user.grades.coefficient;

      const gpaScoreMocks = properties.gpa.gpa;

      if (userGpa < gpaScoreMocks?.[0]) {
        return '1';
      } else {
        gpaScore = properties.gpa.wt;
        criteria++;

        for (let i = 1; i < gpaScoreMocks.length; i++) {
          if (userGpa < gpaScoreMocks[i]) {
            gpaScore =
              properties.gpa.wt *
              ((i - 1) / 4 +
                ((userGpa - gpaScoreMocks[i - 1]) * 25) /
                  (gpaScoreMocks[i] - gpaScoreMocks[i - 1]) /
                  100);

            break;
          }
        }
      }
    }

    // Coursework evaluate
    if (user?.courseworks) {
      const cntUserCw = Object.keys(user.courseworks).reduce((num, key) => {
        num = num + (user.courseworks[key] || 0);
        return num;
      }, 0);

      const cwScoreMocks = properties.courseworks.cw;

      if (cntUserCw > cwScoreMocks?.[0]) {
        courseworkScore = properties.courseworks.wt;
        criteria++;

        for (let i = 1; i < cwScoreMocks.length; i++) {
          if (cntUserCw < cwScoreMocks[i]) {
            courseworkScore =
              properties.courseworks.wt *
              ((i - 1) / 4 +
                ((cntUserCw - cwScoreMocks[i - 1]) * 25) /
                  (cwScoreMocks[i] - cwScoreMocks[i - 1]) /
                  100);

            break;
          }
        }
      }
    }

    // Testscore evaluate
    if (user?.testscores) {
      // convert score to SAT score
      const profiletestscore = user.testscores;
      let satScore =
        Number(profiletestscore.SATScore?.math) +
        Number(profiletestscore.SATScore?.reading);

      if (!satScore) {
        if (profiletestscore.PSATScore) {
          satScore =
            profiletestscore.PSATScore.math +
            profiletestscore.PSATScore.readingAndWriting;
        } else if (profiletestscore.ACTScore) {
          const ACTScore = profiletestscore.ACTScore;
          satScore = Math.floor(
            (Math.floor(
              (ACTScore.english +
                ACTScore.math +
                ACTScore.reading +
                ACTScore.science) /
                4,
            ) /
              36) *
              1600,
          );
          satScore = satScore - (satScore % 50);
        }
      }

      // convert score to IELTS Scores
      let ieltsScore = profiletestscore.englishProficiency?.overall;

      switch (profiletestscore.englishProficiencyType) {
        case EnglishProficiencyType.TOEFLiBT: {
          ieltsScore = Math.floor((ieltsScore / 120) * 9);
          ieltsScore = ieltsScore - (ieltsScore % 5);
          break;
        }
        case EnglishProficiencyType.PTE: {
          ieltsScore = Math.floor((ieltsScore / 100) * 9);
          ieltsScore = ieltsScore - (ieltsScore % 5);
          break;
        }
        case EnglishProficiencyType.TOEFLPaper: {
          ieltsScore = Math.floor((ieltsScore / 677) * 9);
          ieltsScore = ieltsScore - (ieltsScore % 5);
          break;
        }
        case EnglishProficiencyType.DuolingoEnglishTest: {
          ieltsScore = Math.floor((ieltsScore / 160) * 9);
          ieltsScore = ieltsScore - (ieltsScore % 5);
          break;
        }
      }

      const userTestScores = Math.floor(
        (satScore * properties.testscores.twt) / 100 +
          (((ieltsScore * 1600) / 9) * properties.testscores.iwt) / 100,
      );

      const tScoreMocks = properties.testscores.test;

      if (userTestScores > tScoreMocks?.[0]) {
        testScore = properties.testscores.wt;
        criteria++;

        for (let i = 1; i < tScoreMocks.length; i++) {
          if (userTestScores < tScoreMocks[i]) {
            testScore =
              properties.courseworks.wt *
              ((i - 1) / 4 +
                ((userTestScores - tScoreMocks[i - 1]) * 25) /
                  (tScoreMocks[i] - tScoreMocks[i - 1]) /
                  100);

            break;
          }
        }
      }
    }

    if (user?.extracurriculars?.activities?.length) {
      let exScore = 0;
      (user?.extracurriculars?.activities || []).forEach(
        (activity) => (exScore = activity.level + exScore),
      );

      const exScoreMocks = properties.extracurriculars.ex;

      if (exScore > exScoreMocks?.[0]) {
        extracurricularScore = properties.extracurriculars.wt;
        criteria++;

        for (let i = 1; i < exScoreMocks.length; i++) {
          if (exScore < exScoreMocks[i]) {
            extracurricularScore =
              properties.courseworks.wt *
              ((i - 1) / 4 +
                ((exScore - exScoreMocks[i - 1]) * 25) /
                  (exScoreMocks[i] - exScoreMocks[i - 1]) /
                  100);

            break;
          }
        }
      }
    }

    return Number(
      gpaScore +
        courseworkScore +
        testScore +
        extracurricularScore +
        (criteria * properties.bonus || 0),
    ).toFixed(2);
  }
}
