export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
  NULL_FIRST = 'NULL_FIRST',
}

export type PaginatedResponse<T> = {
  data: T[];
  limit: number;
  order: Order;
  orderBy: keyof T;
  page: number;
  totalCount: number;
};

export type Query<T = any> = {
  limit?: number;
  order?: Order;
  orderBy?: keyof T;
  page?: number;
} & T;
