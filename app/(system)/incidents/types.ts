import { Query } from '@/app/types';
import { User } from '../users/types';

export type Category = {
  id: number;
  name: string;
};

export type Comment = {
  content: string;
  createdAt: string;
  deletedAt?: string;
  id: number;
  imageUrl?: string;
  incidentId: number;
  updatedAt?: string;
  user?: User;
  userId: number;
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

export type CommentPayload = Pick<
  Comment,
  'content' | 'incidentId' | 'imageUrl' | 'userId'
>;

export type IncidentPayload = Omit<
  Incident,
  'assignee' | 'category' | 'id' | 'owner' | 'status'
> & { comment?: string };

export type QueryCategory = Query<Partial<Category>>;
export type QueryComment = Query<
  Partial<
    CommentPayload & {
      id: number;
      include?: ('incident' | 'user')[];
    }
  >
>;
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
