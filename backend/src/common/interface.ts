export interface CommonResponse {
  ok: number;
}

export interface LookupOperator {
  from: string;
  localField: string;
  foreignField: string;
  as: string;
}

export interface UnwindOperator {
  path: string;
  preserveNullAndEmptyArrays: boolean;
}

export interface CommonDetailWithPaginate {
  match: any;
  sort?: any;
  project?: any;
  lookups?: LookupOperator[];
  unwinds?: UnwindOperator[];
}

export interface CommonListWithPaginate {
  match: any;
  sort?: any;
  page?: number | string;
  limit?: number | string;
  project?: any;
  lookups?: LookupOperator[];
  unwinds?: UnwindOperator[];
}

export interface PaginationResult<T> {
  page: number;
  pageSize: number;
  totalPage: number;
  totalItem: number;
  data: T[];
}
