export interface Pagination {
  limit: number;
  page: number;
  totalItems: number;
  totalPages: number;
}

export interface ApiMeta extends Partial<Pagination> {
  sort?: string;
  filter?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface ApiResponseBase {
  success: boolean;
  message: string | null;
  meta?: ApiMeta;
}

export interface ApiItemResponse<T> extends ApiResponseBase {
  data: T;
}

export interface ApiListResponse<T> extends ApiResponseBase {
  data: T[];
}
