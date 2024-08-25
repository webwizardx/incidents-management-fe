import { Query } from '@/app/types';

export type Category = {
  id: number;
  name: string;
};

export type QueryCategory = Query<Partial<Category>>;
