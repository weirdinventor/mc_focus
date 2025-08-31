import { GroupPermission } from './DiscussionPermission';

export interface Discussion {
  id: string;
  name: string;
  coverImage: string;
  subject: string;
  voiceRoomId: string | null;
  permissions: GroupPermission[];
  thumbnail: string;
  ownerId: string;
  members: number;
  isModule: boolean;
  createdAt: string;
  updatedAt: string;
  owned?: boolean;
}
