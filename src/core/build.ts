import { AxiosInstance } from 'axios';
import { RDAuthRepo } from './adapters/real/repositories/RDAuthRepo';
import { LoginWithEmail } from './usecases/authRepo/LoginWithEmail';
import { RDUserRepo } from './adapters/real/repositories/RDUserRepo';
import { GetMe } from './usecases/userRepo/GetMe';
import { CreateProfile } from './usecases/userRepo/CreateProfile';
import { SignUp } from './usecases/authRepo/SignUp';
import { CheckEmail } from './usecases/authRepo/CheckEmail';
import { CheckUsername } from './usecases/authRepo/CheckUsername';
import { UploadPicture } from './usecases/userRepo/UploadPicture';
import { ValidateUploadPicture } from './usecases/userRepo/ValidateUploadPicture';
import { GenerateProfilePictureUrl } from './usecases/userRepo/GenerateProfilePictureUrl';
import { AppleSignup } from './usecases/authRepo/AppleSignup';
import { AppleSignin } from './usecases/authRepo/AppleSignin';
import { GoogleSignup } from './usecases/authRepo/GoogleSignup';
import { GoogleSignin } from './usecases/authRepo/GoogleSignin';
import { RDFeedRepo } from './adapters/real/repositories/RDFeedRepo';
import { GetFeedPosts } from './usecases/feedRepo/GetFeedPosts';
import { GeneratePasswordCode } from './usecases/authRepo/GeneratePasswordCode';
import { ResetPassword } from './usecases/authRepo/ResetPassword';
import { ChangeUsername } from './usecases/userRepo/ChangeUsername';
import { ChangePassword } from './usecases/userRepo/ChangePassword';
import { EnrollDevice } from './usecases/authRepo/EnrollDevice';
import { GetTimeframeLives } from './usecases/feedRepo/GetTimeframeLives';
import { RDStreamRepo } from './adapters/real/repositories/RDStreamRepo';
import { JoinStream } from './usecases/streamRepo/JoinStream';
import { GetCategories } from './usecases/feedRepo/GetCategories';
import { SearchUserByUsername } from './usecases/userRepo/SearchUserByUsername';
import { RDChatRepo } from './adapters/real/repositories/RDChatRepo';
import { GetUserConversations } from './usecases/chatRepo/GetUserConversations';
import { CreateConversation } from './usecases/chatRepo/CreateConversation';
import { SendMessage } from './usecases/chatRepo/SendMessage';
import { GetDiscussions } from './usecases/chatRepo/GetDiscussions';
import { GetDiscussionById } from './usecases/chatRepo/GetDiscussionById';
import { SendGroupMessage } from './usecases/chatRepo/SendGroupMessage';
import { FirebaseRefreshToken } from './usecases/authRepo/FirebaseRefreshToken';
import { GetResourcesByGroupId } from './usecases/feedRepo/GetResourcesByGroupId';
import { GetConversationByUserId } from './usecases/chatRepo/GetConversationByUserId';
import { JoinVoiceRoom } from './usecases/streamRepo/JoinVoiceRoom';
import { GetRecords } from './usecases/feedRepo/GetRecords';
import { InterestToLive } from './usecases/streamRepo/InterestToLive';
import { RDModulesRepo } from './adapters/real/repositories/RDModulesRepo';
import { GetModuleById } from './usecases/modulesRepo/GetModuleById';
import { GetModules } from './usecases/modulesRepo/GetModules';
import { BuySubscription } from './usecases/authRepo/BuySubscription';
import { DeleteAccount } from './usecases/userRepo/DeleteAccount';
import { BlockUser } from './usecases/userRepo/BlockUser';
import { LikePost } from './usecases/feedRepo/LikePost';
import { GetUserBadges } from './usecases/userRepo/GetUserBadges';

export enum PersistNavigationEnum {
  DEV = 'dev',
  PROD = 'prod',
}

export interface BaseConfigurationProps {
  persistNav: PersistNavigationEnum;
  realDependencies: boolean;
}

export interface ConfigurationProps {
  httpClient: AxiosInstance;
}

export type CoreConfiguration = BaseConfigurationProps & ConfigurationProps;

export const Core = (configuration: CoreConfiguration) => {
  const httpClient = configuration.httpClient;

  //REPOSITORIES
  const authRepo = new RDAuthRepo(httpClient);
  const userRepo = new RDUserRepo(httpClient);
  const feedRepo = new RDFeedRepo(httpClient);
  const streamRepo = new RDStreamRepo(httpClient);
  const chatRepo = new RDChatRepo(httpClient);
  const modulesRepo = new RDModulesRepo(httpClient);

  //USECASES
  const loginWithEmail = new LoginWithEmail(authRepo);
  const signUp = new SignUp(authRepo);

  const appleSignup = new AppleSignup(authRepo);
  const appleSignin = new AppleSignin(authRepo);
  const googleSignup = new GoogleSignup(authRepo);
  const googleSignin = new GoogleSignin(authRepo);

  const checkEmail = new CheckEmail(authRepo);
  const checkUsername = new CheckUsername(authRepo);

  const getMe = new GetMe(userRepo);
  const createProfile = new CreateProfile(userRepo);

  const generatePictureUrl = new GenerateProfilePictureUrl(userRepo);
  const uploadPicture = new UploadPicture(userRepo);
  const validateUploadPicture = new ValidateUploadPicture(userRepo);

  const getFeedPosts = new GetFeedPosts(feedRepo);
  const generatePasswordCode = new GeneratePasswordCode(authRepo);
  const resetPassword = new ResetPassword(authRepo);
  const changeUsername = new ChangeUsername(userRepo);
  const changePassword = new ChangePassword(userRepo);
  const enrollDevice = new EnrollDevice(authRepo);
  const firebaseRefreshToken = new FirebaseRefreshToken(authRepo);

  const getTimeframeLives = new GetTimeframeLives(feedRepo);
  const joinStream = new JoinStream(streamRepo);
  const getCategories = new GetCategories(feedRepo);
  const searchUserByUsername = new SearchUserByUsername(userRepo);
  const getUserConversations = new GetUserConversations(chatRepo);
  const createConversation = new CreateConversation(chatRepo);
  const sendMessage = new SendMessage(chatRepo);
  const sendGroupMessage = new SendGroupMessage(chatRepo);
  const getDiscussions = new GetDiscussions(chatRepo);
  const getDiscussionById = new GetDiscussionById(chatRepo);
  const getResourcesByGroupId = new GetResourcesByGroupId(feedRepo);
  const likePost = new LikePost(feedRepo);
  const getConversationByUserId = new GetConversationByUserId(chatRepo);
  const joinVoiceRoom = new JoinVoiceRoom(streamRepo);
  const getRecords = new GetRecords(feedRepo);
  const interestToLive = new InterestToLive(streamRepo);
  const getModuleById = new GetModuleById(modulesRepo);
  const getModules = new GetModules(modulesRepo);
  const buySubscription = new BuySubscription(authRepo);
  const deleteAccount = new DeleteAccount(userRepo);
  const blockUser = new BlockUser(userRepo);
  const getUserBadges = new GetUserBadges(userRepo);

  return {
    loginWithEmail,
    getMe,
    createProfile,
    signUp,
    checkEmail,
    checkUsername,
    generatePictureUrl,
    uploadPicture,
    validateUploadPicture,
    appleSignup,
    appleSignin,
    googleSignup,
    googleSignin,
    getFeedPosts,
    generatePasswordCode,
    resetPassword,
    changeUsername,
    changePassword,
    enrollDevice,
    getTimeframeLives,
    joinStream,
    getCategories,
    searchUserByUsername,
    getUserConversations,
    createConversation,
    sendMessage,
    getDiscussions,
    getDiscussionById,
    sendGroupMessage,
    firebaseRefreshToken,
    getResourcesByGroupId,
    getConversationByUserId,
    joinVoiceRoom,
    getRecords,
    interestToLive,
    getModuleById,
    getModules,
    buySubscription,
    deleteAccount,
    blockUser,
    likePost,
    getUserBadges,
  };
};
