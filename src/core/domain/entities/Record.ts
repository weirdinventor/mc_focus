import { AccessLevel } from './AccessLevel';
import { Category } from './Category';
import { Owner } from './Owner';

export enum RecordStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export interface Record {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  accessLevel: AccessLevel;
  status: RecordStatus;
  fileUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
  category: Category;
  owner: Owner;
}
