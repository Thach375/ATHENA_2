import { BadRequestException, Injectable } from '@nestjs/common';
import { PaginationResult } from '@common/interface';
import { FounderRepository } from './founder.repository';
import { SaveFounderDto } from './dto/save-founder';
import { Founder } from './founder.schema';
import { UpdateFounderDto } from './dto/update-founder';

@Injectable()
export class FounderService {
  constructor(private readonly founderRepository: FounderRepository) {}

  public async adminSaveFounder(params: SaveFounderDto): Promise<void> {
    const founder = await this.founderRepository.model.create(params);
    await founder.save();
  }

  public async adminUpdateFounder(
    id: string,
    params: UpdateFounderDto,
  ): Promise<void> {
    const founderDocs = await this.founderRepository.model.findOne({ _id: id });

    if (!founderDocs) {
      throw new BadRequestException('founder.NOT_FOUND');
    }

    Object.assign(founderDocs, params);

    await founderDocs.save();
  }

  public async adminRemoveFounder(id: string): Promise<void> {
    const mentorDocs = await this.founderRepository.model.findOne({ _id: id });

    if (!mentorDocs) {
      throw new BadRequestException('founder.NOT_FOUND');
    }

    await this.founderRepository.model.deleteOne({ _id: id });
  }

  public async listFounder(query: {
    fullName?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginationResult<Founder>> {
    const conditions = {};

    if (query.fullName) {
      Object.assign(conditions, {
        fullName: {
          $regex: new RegExp(`${query.fullName?.toLowerCase()}`),
          $options: 'i',
        },
      });
    }

    return await this.founderRepository.listWithPaginate({
      match: conditions,
      limit: query.limit,
      page: query.page,
    });
  }
}
