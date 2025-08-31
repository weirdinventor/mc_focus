// All of these imports are from your core domain, so they are platform-agnostic and correct.
import { CreateProfileCommand } from './../../../core/usecases/userRepo/CreateProfile';
import { UploadPictureCommand } from './../../../core/usecases/userRepo/UploadPicture';
import { ValidateUploadPictureCommand } from './../../../core/usecases/userRepo/ValidateUploadPicture';
import { GeneratedUrl } from '../entities/GeneratedUrl';
import { User } from '../entities/User';
import { ChangeUsernameCommand } from './../../../core/usecases/userRepo/ChangeUsername';
import { ChangePasswordCommand } from './../../../core/usecases/userRepo/ChangePassword';
import { SearchUserByUsernameCommand } from './../../../core/usecases/userRepo/SearchUserByUsername';
import { OtherUser } from '../entities/OtherUser';
import { BlockUserCommand } from './../../../core/usecases/userRepo/BlockUser';
import { Badge } from '../entities/Badge';
import { GetUserBadgesCommand } from './../../../core/usecases/userRepo/GetUserBadges';

// The 'FetchBlobResponse' import from 'react-native-blob-util' is removed.

export interface UserRepo {
  getMe(): Promise<User>;
  createProfile(req: CreateProfileCommand): Promise<void>;
  generateProfilePictureUrl(): Promise<GeneratedUrl>;
  
  // --- THIS IS THE CONVERTED LINE ---
  // The return type is now the standard web `Response` object.
  uploadPicture(req: UploadPictureCommand): Promise<Response>; 

  validateUploadPicture(req: ValidateUploadPictureCommand): Promise<void>;
  changeUsername(req: ChangeUsernameCommand): Promise<void>;
  changePassword(req: ChangePasswordCommand): Promise<void>;
  searchUserByUsername(req: SearchUserByUsernameCommand): Promise<OtherUser[]>;
  deleteAccount(): Promise<void>;
  blockUser(req: BlockUserCommand): Promise<void>;
  getUserBadges(req: GetUserBadgesCommand): Promise<Badge[]>;
}