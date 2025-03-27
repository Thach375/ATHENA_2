import { CommonResponse, PaginationResult } from '@common/interface';
import { AppObject } from '@constants/object';
import { MailerService } from '@modules/mailer/mailer.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import mongoose, { Document } from 'mongoose';
import { AppConfig } from 'src/configs';
import { ObjectUtils } from 'src/utils/object.util';
import StringUtils from 'src/utils/string.util';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateBasicInformationDto } from './dto/update-basic-information.dto';
import { UpdateCourseWorkDto } from './dto/update-coursework.dto';
import { UpdateCreditDto } from './dto/update-credit.dto';
import { UpdateDemographicsDto } from './dto/update-demographics.dto';
import { UpdateExtracurricularsDto } from './dto/update-extracurricular.dto';
import { UpdateGradesDto } from './dto/update-grade.dto';
import { ScoresAndCertsDto } from './dto/update-scores-and-certs.dto';
import { UpdateTestScoresDto } from './dto/update-test-score.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserUpdateProfileDto } from './dto/user-update-profile.dto';
import { ProfileRepository } from './profile/profile.repository';
import { Profile } from './profile/profile.schema';
import { UserRepository } from './user.repository';
import { User } from './user.schema';
import { UpdateExperiencesDto } from './dto/update-experiences.dto';
import { UpdateAspirationDto } from './dto/update-aspiration-dto';
import { ChanceLogService } from '@modules/chance-logs/chance-log.service';
import { School } from '@modules/school/school.schema';
import { SchoolRepository } from '@modules/school/school.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly mailerService: MailerService,
    private readonly appConfig: AppConfig,
    private readonly chanceLogService: ChanceLogService,
    private readonly schoolRepository: SchoolRepository,
  ) {}

  public async userSendConsultation(userId: string): Promise<void> {
    const user = await this.userRepository.model.findOne({ _id: userId });

    if (!user) {
      throw new BadRequestException(`user.NOT_FOUND`);
    }

    this.mailerService.sendEmails({
      options: {
        to: this.appConfig.appEnv.GOOGLE.MAIL.ADMIN,
        subject: AppObject.EMAIL_TEMPLATES.USER_CONSULTATION.SUBJECT,
      },
      template: {
        data: {
          email: user.email,
          phone: user.phone,
        },
        name: AppObject.EMAIL_TEMPLATES.USER_CONSULTATION.TEMPLATE,
      },
    });
  }

  public async adminUpdateUserBalance(
    id: string,
    body: UpdateCreditDto,
  ): Promise<void> {
    const user = await this.userRepository.model.findOne({ _id: id });

    if (!user) {
      throw new BadRequestException(`user.NOT_FOUND`);
    }

    Object.assign(user, {
      credits: +body.credits,
      pricingPlan: body.pricingPlan,
    });

    await user.save();
  }

  public async updateTestScores(
    userId: string,
    body: UpdateTestScoresDto,
  ): Promise<void> {
    if (body.englishProficiencyType && !body.englishProficiency) {
      throw new BadRequestException(`Error: english proficiency is required.`);
    }

    if (body.englishProficiency && !body.englishProficiencyType) {
      throw new BadRequestException(
        `Error: english proficiency type is required.`,
      );
    }

    // switch (body.englishProficiencyType) {
    //   case EnglishProficiencyType.IELTS: {
    //     if (typeof body.englishProficiency !== typeof body.englishProficiency) {
    //       throw new BadRequestException(
    //         `Error: Invalid english proficiency information.`,
    //       );
    //     }
    //     break;
    //   }
    //   case EnglishProficiencyType.DuolingoEnglishTest: {
    //     if (typeof body.englishProficiency !== typeof DuolingoEnglishTestDto) {
    //       throw new BadRequestException(
    //         `Error: Invalid english proficiency information.`,
    //       );
    //     }
    //     break;
    //   }
    //   case EnglishProficiencyType.PTE: {
    //     if (typeof body.englishProficiency !== typeof PTEDto) {
    //       throw new BadRequestException(
    //         `Error: Invalid english proficiency information.`,
    //       );
    //     }
    //     break;
    //   }
    //   case EnglishProficiencyType.TOEFLPaper: {
    //     if (typeof body.englishProficiency !== typeof TOEFLPaperDto) {
    //       throw new BadRequestException(
    //         `Error: Invalid english proficiency information.`,
    //       );
    //     }
    //     break;
    //   }
    //   case EnglishProficiencyType.TOEFLiBT: {
    //     if (typeof body.englishProficiency !== typeof TOEFLiBTDto) {
    //       throw new BadRequestException(
    //         `Error: Invalid english proficiency information.`,
    //       );
    //     }
    //     break;
    //   }
    // }

    const user = await this.userRepository.model.findOne({ _id: userId });

    if (!user) {
      throw new BadRequestException(`Error: user not found.`);
    }

    let profile = await this.profileRepository.model.findOne({
      user: user._id,
    });

    if (!profile) {
      profile = await this.profileRepository.model.create({ user: user._id });

      await profile.save();
    }

    Object.assign(profile, { testscores: body });

    await this.chanceLogService.expireLog(user._id.toString());

    await profile.save();
  }

  public async updateExperiences(
    userId: string,
    body: UpdateExperiencesDto,
  ): Promise<void> {
    const user = await this.userRepository.model.findOne({ _id: userId });

    if (!user) {
      throw new BadRequestException(`Error: user not found.`);
    }

    let profile = await this.profileRepository.model.findOne({
      user: user._id,
    });

    if (!profile) {
      profile = await this.profileRepository.model.create({ user: user._id });

      await profile.save();
    }

    Object.assign(profile, { experiences: body });

    await this.chanceLogService.expireLog(user._id.toString());

    await profile.save();
  }

  public async updateAspiration(
    userId: string,
    body: UpdateAspirationDto,
  ): Promise<void> {
    const user = await this.userRepository.model.findOne({ _id: userId });

    if (!user) {
      throw new BadRequestException(`Error: user not found.`);
    }

    let profile = await this.profileRepository.model.findOne({
      user: user._id,
    });

    if (!profile) {
      profile = await this.profileRepository.model.create({ user: user._id });

      await profile.save();
    }

    Object.assign(profile, { aspiration: body });

    await profile.save();
  }

  public async updateExtracurriculars(
    userId: string,
    body: UpdateExtracurricularsDto,
  ): Promise<void> {
    const user = await this.userRepository.model.findOne({ _id: userId });

    if (!user) {
      throw new BadRequestException(`Error: user not found.`);
    }

    let profile = await this.profileRepository.model.findOne({
      user: user._id,
    });

    if (!profile) {
      profile = await this.profileRepository.model.create({ user: user._id });

      await profile.save();
    }

    Object.assign(profile, { extracurriculars: body });

    await profile.save();
  }

  public async updateCoursework(
    userId: string,
    body: UpdateCourseWorkDto,
  ): Promise<void> {
    const user = await this.userRepository.model.findOne({ _id: userId });

    if (!user) {
      throw new BadRequestException(`Error: user not found.`);
    }

    let profile = await this.profileRepository.model.findOne({
      user: user._id,
    });

    if (!profile) {
      profile = await this.profileRepository.model.create({ user: user._id });

      await profile.save();
    }

    Object.assign(profile, { courseworks: body });

    await profile.save();
  }

  public async updateGradesDto(
    userId: string,
    body: UpdateGradesDto,
  ): Promise<void> {
    if (body.gpa > body.coefficient || body.gpa <= 0) {
      throw new BadRequestException(`Error: incorrect gpa value.`);
    }

    const user = await this.userRepository.model.findOne({ _id: userId });

    if (!user) {
      throw new BadRequestException(`Error: user not found.`);
    }

    let profile = await this.profileRepository.model.findOne({
      user: user._id,
    });

    if (!profile) {
      profile = await this.profileRepository.model.create({ user: user._id });

      await profile.save();
    }

    Object.assign(profile, { grades: body });

    await profile.save();
  }

  public async updateDemographics(
    userId: string,
    body: UpdateDemographicsDto,
  ): Promise<void> {
    const user = await this.userRepository.model.findOne({ _id: userId });

    if (!user) {
      throw new BadRequestException(`Error: user not found.`);
    }

    let profile = await this.profileRepository.model.findOne({
      user: user._id,
    });

    if (!profile) {
      profile = await this.profileRepository.model.create({ user: user._id });

      await profile.save();
    }

    Object.assign(profile, { demographics: body });

    await profile.save();
  }

  public async updateScoresAndCertificates(
    userId: string,
    body: ScoresAndCertsDto,
  ): Promise<void> {
    const user = await this.userRepository.model.findOne({ _id: userId });

    if (!user) {
      throw new BadRequestException(`Error: user not found.`);
    }

    let profile = await this.profileRepository.model.findOne({
      user: user._id,
    });

    if (!profile) {
      profile = await this.profileRepository.model.create({ user: user._id });

      await profile.save();
    }

    Object.assign(profile, { scoresAndCerts: body });

    await this.chanceLogService.expireLog(user._id.toString());

    await profile.save();
  }

  public async updateBasicInformation(
    userId: string,
    body: UpdateBasicInformationDto,
  ): Promise<void> {
    const user = await this.userRepository.model.findOne({ _id: userId });

    if (!user) {
      throw new BadRequestException(`Error: user not found.`);
    }

    let profile = await this.profileRepository.model.findOne({
      user: user._id,
    });

    if (!profile) {
      profile = await this.profileRepository.model.create({ user: user._id });

      await profile.save();
    }

    Object.assign(profile, { basicInformation: body });

    await profile.save();
  }

  public async userUpdateProfile(
    userId: string,
    params: UserUpdateProfileDto,
  ): Promise<CommonResponse> {
    const user = await this.userRepository.model.findOne({ _id: userId });

    if (!user) {
      throw new BadRequestException(`user.NOT_FOUND`);
    }

    if (params?.dob === 0 || params?.dob) {
      if (params.dob > Date.now()) {
        throw new BadRequestException(`user.DOB_TOO_LARGE`);
      }
      Object.assign(user, { dateOfBirth: new Date(params.dob) });
    }

    Object.assign(user, params);

    await user.save();

    return { ok: 1 };
  }

  // public async changePassword(
  //   userId: string,
  //   params: ChangePasswordDto,
  // ): Promise<CommonResponse> {
  //   const user = await this.userRepository.model.findOne({ _id: userId });

  //   if (!user) {
  //     throw new BadRequestException(`user.NOT_FOUND`);
  //   }

  //   const isPasswordMatch = await StringUtils.comparePassword(
  //     params.password,
  //     user.password,
  //   );

  //   if (!isPasswordMatch) {
  //     throw new BadRequestException(`auth.PASSWORD_NOT_MATCH`);
  //   }

  //   const newPassword = await StringUtils.encryptPassword(params.newPassword);

  //   Object.assign(user, { password: newPassword });

  //   await user.save();

  //   return { ok: 1 };
  // }

  public async userGetProfile(
    id: string,
  ): Promise<User & { profile: Profile }> {
    const user = await this.userRepository.model.findOne({ _id: id }).lean();
    const profile = await this.profileRepository.model
      .findOne({
        user: user._id,
      })
      .lean();
    Object.assign(user, { profile: profile });
    return ObjectUtils.omit(['password'], user);
  }

  public async getSchoolsInfo(ids: string[]): Promise<School[]> {
    return await this.schoolRepository.model.find({ _id: { $in: ids } });
  }

  public async adminUpdateUser(
    id: string,
    params: UpdateUserDto,
  ): Promise<CommonResponse> {
    const userDoc = await this.userRepository.model.findOne({ _id: id }).lean();

    Object.assign(userDoc, params);

    if (params.password) {
      userDoc.password = await StringUtils.encryptPassword(params.password);
    }

    await this.userRepository.model.updateOne(
      { _id: id },
      ObjectUtils.omit(['createdAt', 'updatedAt'], userDoc),
    );

    return { ok: 1 };
  }

  public async adminDeleteUser(id: string): Promise<CommonResponse> {
    const numUsers = await this.userRepository.model.countDocuments({
      _id: id,
    });

    if (!numUsers) {
      throw new BadRequestException(`user.NOT_FOUND`);
    }

    await this.userRepository.model.deleteOne({ _id: id });

    return { ok: 1 };
  }

  public async detailUser(id: string): Promise<any> {
    const user = await this.userRepository.model.findOne({ _id: id }).lean();

    if (!user) {
      throw new BadRequestException(`user.NOT_FOUND`);
    }

    return ObjectUtils.omit(['password'], user);
  }

  public async adminListUsers(query: any): Promise<PaginationResult<User>> {
    const match = {};
    const sort = {};

    if (query.email) {
      Object.assign(match, {
        email: {
          $regex: new RegExp(
            StringUtils.escapeSpecialCharacters(query.email.toLowerCase()),
          ),
          $options: 'i',
        },
      });
    }

    if (query.sort) {
      Object.assign(sort, { ...ObjectUtils.getSorts(query.sort) });
    }

    return await this.userRepository.listWithPaginate({
      match: match,
      project: { __v: 0, password: 0 },
      sort: sort,
      page: +query.page,
      limit: +query.limit,
    });
  }

  public async adminCreateUser(params: CreateUserDto): Promise<{ id: string }> {
    const userExists = await this.userRepository.model.countDocuments({
      email: params.email.toLowerCase(),
    });

    if (userExists) {
      throw new BadRequestException(`user.ALREADY_EXISTS`);
    }

    Object.assign(params, {
      password: await StringUtils.encryptPassword(params.password),
    });

    // if (params.dob) {
    //   if (params.dob > Date.now()) {
    //     throw new BadRequestException(`user.DOB_TOO_LARGE`);
    //   }
    //   Object.assign(params, { dateOfBirth: new Date(params.dob) });
    // }

    const created = await this.createOne(params);

    return { id: created._id.toString() };
  }

  public async findOneById(id: string): Promise<Document & User> {
    const user = await this.userRepository.model.findOne({ _id: id });

    if (!user) {
      throw new BadRequestException(`user.NOT_FOUND`);
    }

    return user as unknown as Document & User;
  }

  public async findOneByEmail(
    email: string,
    ignoreError?: boolean,
  ): Promise<User> {
    const user = await this.userRepository.model.findOne({ email: email });

    if (!user && !ignoreError) {
      throw new BadRequestException(`user.NOT_FOUND`);
    }

    return user;
  }

  public async createOne(
    user: User,
  ): Promise<User & { _id: mongoose.Types.ObjectId }> {
    const isExists = await this.isExists(user.email);

    if (isExists) {
      throw new BadRequestException(`user.ALREADY_EXISTS`);
    }

    const userDocs = await this.userRepository.model.create(user);

    await userDocs.save();

    return userDocs as User & { _id: mongoose.Types.ObjectId };
  }

  public async isExists(email: string): Promise<boolean> {
    const numExists = await this.userRepository.model
      .countDocuments({ email: email })
      .lean();

    if (numExists) {
      return true;
    }

    return false;
  }
}
