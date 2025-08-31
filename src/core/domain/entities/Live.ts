import { AccessLevel } from './AccessLevel';
import { Owner } from './Owner';

export interface Live {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  status: 'scheduled' | 'ongoing';
  moderators: unknown[];
  notifications: unknown[];
  airsAt: string;
  canceledAt: string | null;
  duration: number;
  accessLevel: AccessLevel;
  owner: Owner;
  ownerId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}
