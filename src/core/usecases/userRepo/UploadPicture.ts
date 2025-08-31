import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { UserRepo } from './../../../core/domain/repositories/UserRepo';
import { UseCase } from './../../../core/usecases/Usecase';
// The 'react-native-blob-util' import is removed.

// --- THIS IS THE CORRECTED TYPE ALIAS ---
// We rename our custom type to avoid colliding with the global 'Response' type.
// The `Response` on the right side now correctly and safely refers to the browser's global fetch Response.
type UploadPictureResponse = ErrorOr<Response>;

// This interface is correct and needs no changes.
export interface UploadPictureCommand {
  url: string;
  photoPath: string | Blob;
}

/**
 * Use case for uploading a user's picture. It orchestrates the call to the user repository.
 */
export class UploadPicture
  // We now use our new, non-conflicting type alias here.
  implements UseCase<UploadPictureCommand, Promise<UploadPictureResponse>>
{
  constructor(private userRepo: UserRepo) {}

  public async execute(req: UploadPictureCommand): Promise<UploadPictureResponse> {
    try {
      const result = await this.userRepo.uploadPicture(req);
      return Result.ok(result);
    } catch (error) {
      // It's good practice to cast the error to the correct type for better handling.
      const typedError = error instanceof Error ? error : new Error(String(error));
      return Result.fail('UploadPicture', typedError);
    }
  }
}