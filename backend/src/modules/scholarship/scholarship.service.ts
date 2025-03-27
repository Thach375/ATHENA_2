import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateScholarshipDto } from './dto/create-scholarship.dto';
import { UpdateScholarshipDto } from './dto/update-scholarship.dto';
import { ScholarshipRepository } from './scholarship.repository';
import { PaginationResult } from '@common/interface';
import { Scholarship } from './scholarship.schema';
import mongoose from 'mongoose';

@Injectable()
export class ScholarshipService {
  constructor(private readonly scholarshipRepository: ScholarshipRepository) {}

  public async userListScholarship(
    query: any,
  ): Promise<PaginationResult<Scholarship>> {
    // const conditions = {
    //   endTime: { $gte: new Date() },
    // };

    // if (query.name) {
    //   Object.assign(conditions, {
    //     name: {
    //       $regex: new RegExp(`${query.name.toLowerCase()}`),
    //       $options: 'i',
    //     },
    //   });
    // }

    const sort = {
      createdAt: -1,
    };

    return await this.scholarshipRepository.listWithPaginate({
      match: {},
      sort: sort,
      page: query.page,
      limit: query.limit,
    });
  }

  public async getUserScholarshipDetail(id: string): Promise<any> {
    const scholarship = await this.scholarshipRepository.model.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    if (!scholarship) {
      throw new BadRequestException(`scholarship.NOT_FOUND`);
    }

    return scholarship;
  }

  public async adminListScholarship(
    query: any,
  ): Promise<PaginationResult<Scholarship>> {
    const conditions = {};

    if (query.beginTime) {
      Object.assign(conditions, {
        beginTime: { $gte: new Date(query.beginDate) },
      });
    }

    if (query.endTime) {
      Object.assign(conditions, {
        endTime: { $lte: new Date(query.endDate) },
      });
    }

    return await this.scholarshipRepository.listWithPaginate({
      match: conditions,
      page: query.page,
      limit: query.limit,
    });
  }

  public async createScholarship(params: CreateScholarshipDto): Promise<void> {
    const existsScholarship =
      await this.scholarshipRepository.model.countDocuments({
        name: { $regex: new RegExp(params.name.trim()), $options: 'i' },
      });

    if (existsScholarship) {
      return;
    }

    if (params.beginTime) {
      Object.assign(params, { beginTime: new Date(params.beginTime) });
    }

    if (params.endTime) {
      Object.assign(params, { beginTime: new Date(params.endTime) });
    }

    const scholarship = await this.scholarshipRepository.model.create(params);
    await scholarship.save();
  }

  public async updateScholarship(
    id: string,
    params: UpdateScholarshipDto,
  ): Promise<void> {
    const scholarship = await this.scholarshipRepository.model.findOne({
      _id: id,
    });

    if (!scholarship) {
      throw new BadRequestException(`scholarship.NOT_FOUND`);
    }

    if (params.beginTime) {
      Object.assign(params, { beginTime: new Date(params.beginTime) });
    }

    if (params.endTime) {
      Object.assign(params, { beginTime: new Date(params.endTime) });
    }

    Object.assign(scholarship, params);

    await scholarship.save();
  }

  public async deleteScholarship(id: string): Promise<void> {
    const scholarship = await this.scholarshipRepository.model.findOne({
      _id: id,
    });

    if (!scholarship) {
      throw new BadRequestException(`scholarship.NOT_FOUND`);
    }

    await this.scholarshipRepository.model.deleteOne({ _id: id });
  }
}
