import { Query } from '@/app/types';

export type QueryRole = Query<Partial<Role>>;

export type QueryUser = Query<
  Omit<Partial<User>, 'role'> & { include?: 'role'; pagination?: boolean }
>;

export type Role = {
  id: number;
  name: string;
};

export type User = {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  password: string;
  role: {
    id: number;
    name: string;
  };
  roleId: number;
};
