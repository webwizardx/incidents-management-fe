import { Query } from '@/app/types';
import { User } from '../users/types';

export type Category = {
  id: number;
  name: string;
};

export type Incident = {
  assignee?: User;
  assignedTo: number;
  category?: Category;
  categoryId: number;
  closedAt?: string;
  id: number;
  owner?: User;
  ownerId: number;
  status: Status;
  statusId: number;
  title: string;
};

export type IncidentPayload = Omit<
  Incident,
  'assignee' | 'category' | 'id' | 'owner' | 'status'
>;

export type QueryCategory = Query<Partial<Category>>;
export type QueryIncident = Query<
  Partial<
    IncidentPayload & {
      id: number;
      include?: ('assignee' | 'category' | 'owner' | 'status')[];
    }
  >
>;
export type QueryStatus = Query<Partial<Status>>;

export type Status = {
  description?: string;
  id: number;
  name: string;
};
