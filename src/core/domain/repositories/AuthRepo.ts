import { CheckEmailCommand } from './../../../core/usecases/authRepo/CheckEmail';
import { CheckUsernameCommand } from './../../../core/usecases/authRepo/CheckUsername';
import { LoginWithEmailCommand } from './../../../core/usecases/authRepo/LoginWithEmail';
import { Token } from '../entities/Token';
import { Taken } from '../entities/Taken';
import { UsernameValidity } from '../entities/UsernameValidity';
import { ProviderTokenCommand } from '../entities/ProviderTokenCommand';
import { GeneratePasswordCodeCommand } from './../../../core/usecases/authRepo/GeneratePasswordCode';
import { ResetPasswordCommand } from './../../../core/usecases/authRepo/ResetPassword';
import { EnrollDeviceCommand } from './../../../core/usecases/authRepo/EnrollDevice';
import { FirebaseToken } from '../entities/FirebaseToken';
import { BuySubscriptionCommand } from './../../../core/usecases/authRepo/BuySubscription';

export interface AuthRepo {
  loginWithEmail(req: LoginWithEmailCommand): Promise<Token & FirebaseToken>;
  signUp(req: LoginWithEmailCommand): Promise<Token & FirebaseToken>;
  checkEmail(req: CheckEmailCommand): Promise<Taken>;
  checkUsername(req: CheckUsernameCommand): Promise<UsernameValidity>;

  appleSignin(req: ProviderTokenCommand): Promise<Token & FirebaseToken>;
  appleSignup(req: ProviderTokenCommand): Promise<Token & FirebaseToken>;
  googleSignup(req: ProviderTokenCommand): Promise<Token & FirebaseToken>;
  googleSignin(req: ProviderTokenCommand): Promise<Token & FirebaseToken>;

  generatePasswordCode(req: GeneratePasswordCodeCommand): Promise<void>;
  resetPassword(req: ResetPasswordCommand): Promise<void>;

  enrollDevice(req: EnrollDeviceCommand): Promise<void>;
  firebaseRefreshToken(): Promise<Token>;
  buySubscription(req: BuySubscriptionCommand): Promise<void>;
}
