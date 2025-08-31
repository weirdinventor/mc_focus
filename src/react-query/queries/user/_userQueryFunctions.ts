import { core } from './../../../config/Configuration';
import { GetConversationByUserIdCommand } from './../../../core/usecases/chatRepo/GetConversationByUserId';
import { GetDiscussionByIdCommand } from './../../../core/usecases/chatRepo/GetDiscussionById';
import { GetRecordsCommand } from './../../../core/usecases/feedRepo/GetRecords';
import { GetResourcesByGroupIdCommand } from './../../../core/usecases/feedRepo/GetResourcesByGroupId';
import { GetTimeframeLivesCommand } from './../../../core/usecases/feedRepo/GetTimeframeLives';
import { BlockUserCommand } from './../../../core/usecases/userRepo/BlockUser';
import { ChangePasswordCommand } from './../../../core/usecases/userRepo/ChangePassword';
import { ChangeUsernameCommand } from './../../../core/usecases/userRepo/ChangeUsername';
import { CreateProfileCommand } from './../../../core/usecases/userRepo/CreateProfile';
import { GetUserBadgesCommand } from './../../../core/usecases/userRepo/GetUserBadges';
import { SearchUserByUsernameCommand } from './../../../core/usecases/userRepo/SearchUserByUsername';
import { UploadPictureCommand } from './../../../core/usecases/userRepo/UploadPicture';
import { ValidateUploadPictureCommand } from './../../../core/usecases/userRepo/ValidateUploadPicture';
import { defaultQueryResult } from '../../queryHelpers';

const getMe = async () => {
  const result = await core.getMe.execute();
  return defaultQueryResult(result);
};

const createProfile = async (req: CreateProfileCommand) => {
  const result = await core.createProfile.execute(req);
  return defaultQueryResult(result);
};

const uploadPicture = async (req: UploadPictureCommand) => {
  const result = await core.uploadPicture.execute(req);
  return defaultQueryResult(result);
};

const generatePictureUrl = async () => {
  const result = await core.generatePictureUrl.execute();
  return defaultQueryResult(result);
};

const validateUploadPicture = async (req: ValidateUploadPictureCommand) => {
  const result = await core.validateUploadPicture.execute(req);
  return defaultQueryResult(result);
};

const changeUsername = async (req: ChangeUsernameCommand) => {
  const result = await core.changeUsername.execute(req);
  return defaultQueryResult(result);
};

const changePassword = async (req: ChangePasswordCommand) => {
  const result = await core.changePassword.execute(req);
  return defaultQueryResult(result);
};

const getTimeframeLives = async (req: GetTimeframeLivesCommand) => {
  const result = await core.getTimeframeLives.execute(req);
  return defaultQueryResult(result);
};

const getCategories = async () => {
  const result = await core.getCategories.execute();
  return defaultQueryResult(result);
};

const searchUserByUsername = async (req: SearchUserByUsernameCommand) => {
  const result = await core.searchUserByUsername.execute(req);
  return defaultQueryResult(result);
};

const getDiscussions = async () => {
  const result = await core.getDiscussions.execute();
  return defaultQueryResult(result);
};

const getDiscussionById = async (req: GetDiscussionByIdCommand) => {
  const result = await core.getDiscussionById.execute(req);
  return defaultQueryResult(result);
};

const getResourcesByGroupId = async (req: GetResourcesByGroupIdCommand) => {
  const result = await core.getResourcesByGroupId.execute(req);
  return defaultQueryResult(result);
};

const getConversationByUserId = async (req: GetConversationByUserIdCommand) => {
  const result = await core.getConversationByUserId.execute(req);
  return defaultQueryResult(result);
};

const getRecords = async (req: GetRecordsCommand) => {
  const result = await core.getRecords.execute(req);
  return defaultQueryResult(result);
};

const blockUser = async (req: BlockUserCommand) => {
  const result = await core.blockUser.execute(req);
  return defaultQueryResult(result);
};

const deleteAccount = async () => {
  const result = await core.deleteAccount.execute();
  return defaultQueryResult(result);
};
const getUserBadges = async (req: GetUserBadgesCommand) => {
  const result = await core.getUserBadges.execute(req);
  return defaultQueryResult(result);
};
export const UserQueryFunctions = {
  getMe,
  createProfile,
  uploadPicture,
  generatePictureUrl,
  validateUploadPicture,
  changeUsername,
  changePassword,
  getTimeframeLives,
  getCategories,
  searchUserByUsername,
  getDiscussions,
  getDiscussionById,
  getResourcesByGroupId,
  getConversationByUserId,
  getRecords,
  blockUser,
  deleteAccount,
  getUserBadges,
};
