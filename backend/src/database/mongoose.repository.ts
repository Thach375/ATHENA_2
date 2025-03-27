import { CommonListWithPaginate, PaginationResult } from '@common/interface';
import { DEFAULT_LIMIT_SIZE, DEFAULT_PAGE } from '@constants/variable';
import { Model } from 'mongoose';

export class MongooseRepository<T extends object> {
  public model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async createOne(schema: Partial<T>): Promise<T> {
    const doc = new this.model(schema);
    return await doc.save();
  }

  async findAll(): Promise<T[]> {
    return await this.model.find();
  }

  async listAllWithAggregate(params: CommonListWithPaginate): Promise<T[]> {
    const pipeline: any = [];

    if (params.lookups?.length) {
      for (const lookup of params.lookups) {
        pipeline.push({ $lookup: lookup });
      }
    }

    if (params.unwinds?.length) {
      for (const unwind of params.unwinds) {
        pipeline.push({ $unwind: unwind });
      }
    }

    if (params.project) {
      pipeline.push({ $project: params.project });
    }

    pipeline.push(
      {
        $match: params.match,
      },
      {
        $sort: Object.keys(params?.sort || {})?.length
          ? params.sort
          : { createdAt: -1 },
      },
    );

    const result = await this.model.aggregate(pipeline);

    return result;
  }

  async detailWithAgregate(params: CommonListWithPaginate): Promise<T> {
    const pipeline: any = [];

    if (params.lookups?.length) {
      for (const lookup of params.lookups) {
        pipeline.push({ $lookup: lookup });
      }
    }

    if (params.unwinds?.length) {
      for (const unwind of params.unwinds) {
        pipeline.push({ $unwind: unwind });
      }
    }

    if (params.project) {
      pipeline.push({ $project: params.project });
    }

    pipeline.push(
      {
        $match: params.match,
      },
      {
        $sort: Object.keys(params?.sort || {})?.length
          ? params.sort
          : { createdAt: -1 },
      },
    );

    const result = await this.model.aggregate(pipeline);

    return result?.[0];
  }

  async listWithPaginate(
    params: CommonListWithPaginate,
  ): Promise<PaginationResult<T>> {
    const page = +params.page || DEFAULT_PAGE;
    const limit = +params.limit || DEFAULT_LIMIT_SIZE;

    const pipeline: any = [
      {
        $match: params.match,
      },
      {
        $sort: Object.keys(params?.sort || {})?.length
          ? params.sort
          : { createdAt: -1 },
      },
    ];

    if (params.lookups?.length) {
      for (const lookup of params.lookups) {
        pipeline.push({ $lookup: lookup });
      }
    }

    if (params.unwinds?.length) {
      for (const unwind of params.unwinds) {
        pipeline.push({ $unwind: unwind });
      }
    }

    if (params.project) {
      pipeline.push({ $project: params.project });
    }

    const paginateOperator: any = [
      { $skip: (page - 1) * (limit > 0 ? limit : 0) },
    ];

    if (limit > 0) {
      paginateOperator.push({ $limit: limit });
    }

    pipeline.push({
      $facet: {
        results: paginateOperator,
        total: [{ $count: 'count' }],
      },
    });

    const result = await this.model.aggregate(pipeline);

    return {
      totalItem: result[0].total.length > 0 ? result[0].total[0].count : 0,
      page: page,
      pageSize: limit,
      totalPage:
        result[0].total.length > 0
          ? limit > 0
            ? Math.ceil(result[0].total[0].count / limit)
            : 1
          : 0,
      data: result[0].results,
    };
  }

  // TODO: Add commons function
}
