import { Badge } from './../../../../core/domain/entities/Badge';
import { GeneratedUrl } from './../../../../core/domain/entities/GeneratedUrl';
import { OtherUser } from './../../../../core/domain/entities/OtherUser';
import { User } from './../../../../core/domain/entities/User';
import { UserRepo } from './../../../../core/domain/repositories/UserRepo';
import { BlockUserCommand } from './../../../../core/usecases/userRepo/BlockUser';
import { ChangePasswordCommand } from './../../../../core/usecases/userRepo/ChangePassword';
import { ChangeUsernameCommand } from './../../../../core/usecases/userRepo/ChangeUsername';
import { CreateProfileCommand } from './../../../../core/usecases/userRepo/CreateProfile';
import { GetUserBadgesCommand } from './../../../../core/usecases/userRepo/GetUserBadges';
import { SearchUserByUsernameCommand } from './../../../../core/usecases/userRepo/SearchUserByUsername';
import { UploadPictureCommand } from './../../../../core/usecases/userRepo/UploadPicture';
import { ValidateUploadPictureCommand } from './../../../../core/usecases/userRepo/ValidateUploadPicture';
import { AxiosInstance } from 'axios';
// RNFetchBlob is removed, as it's a native-only library.


export class RDUserRepo implements UserRepo {
  constructor(private httpClient: AxiosInstance) {}

  // No change needed
  async getMe() {
    const result: User = await this.httpClient.get('api/user/me');
    return result;
  }

  // No change needed
  async createProfile(req: CreateProfileCommand) {
    const result: void = await this.httpClient.post('api/user/profile', req);
    return result;
  }

  // No change needed
  async generateProfilePictureUrl() {
    const result: GeneratedUrl = await this.httpClient.post(
      'api/user/picture/upload',
    );
    return result;
  }

  // --- THIS IS THE CONVERTED METHOD ---
  /**
   * Uploads a picture to a pre-signed URL using the browser's fetch API.
   * @param req The request command.
   *            - `url`: The pre-signed URL to upload the file to.
   *            - `photoPath`: For the web, this should be a `File` object from an input element.
   */
  async uploadPicture(req: UploadPictureCommand) {
    const { url, photoPath } = req;

    // Type guard to ensure photoPath is a File/Blob object for the web.
    if (!(photoPath instanceof Blob)) {
      throw new Error('For web uploads, photoPath must be a File or Blob object.');
    }

    // Use the standard browser `fetch` API to upload the binary data.
    const result = await fetch(url, {
      method: 'PUT',
      headers: {
        // Use the file's actual MIME type for better accuracy, or fallback.
        'Content-Type': photoPath.type || 'application/octet-stream',
      },
      body: photoPath, // The body is the File/Blob object itself.
    });

    if (!result.ok) {
        // Throw an error if the upload was not successful (e.g., status 4xx or 5xx)
        throw new Error(`File upload failed with status: ${result.status}`);
    }

    // The fetch response object is returned.
    return result;
  }
  
  // No change needed
  async validateUploadPicture(req: ValidateUploadPictureCommand) {
    const { filePath } = req;
    const result: void = await this.httpClient.put('api/user/picture/upload', {
      filePath,
    });
    return result;
  }

  // No change needed
  async changeUsername(req: ChangeUsernameCommand) {
    const result: void = await this.httpClient.put(
      'api/user/profile/username',
      req,
    );
    return result;
  }

  // No change needed
  async changePassword(req: ChangePasswordCommand) {
    const result: void = await this.httpClient.put(
      'api/user/password/change-password',
      req,
    );
    return result;
  }

  // No change needed
  async searchUserByUsername(req: SearchUserByUsernameCommand) {
    const { username } = req;
    const result: OtherUser[] = await this.httpClient.get(
      `api/user/search/${username}`,
    );
    return result;
  }

  // No change needed
  async deleteAccount() {
    const result: void = await this.httpClient.delete(`api/user/account`);
    return result;
  }

  // No change needed
  async blockUser(req: BlockUserCommand) {
    const { otherUserId } = req;
    const result: void = await this.httpClient.put(
      `api/user/block/${otherUserId}`,
    );
    return result;
  }
  
  // No change needed
  async getUserBadges(req: GetUserBadgesCommand) {
    const { userId } = req;
    const result: Badge[] = await this.httpClient.get(
      `api/badge/user/${userId}`,
    );
    return result;
  }
}