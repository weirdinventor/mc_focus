import { FirebaseToken } from './../../../../core/domain/entities/FirebaseToken';
import { ProviderTokenCommand } from './../../../../core/domain/entities/ProviderTokenCommand';
import { Taken } from './../../../../core/domain/entities/Taken';
import { Token } from './../../../../core/domain/entities/Token';
import { UsernameValidity } from './../../../../core/domain/entities/UsernameValidity';
import { AuthRepo } from './../../../../core/domain/repositories/AuthRepo';
import { BuySubscriptionCommand } from './../../../../core/usecases/authRepo/BuySubscription';
import { CheckEmailCommand } from './../../../../core/usecases/authRepo/CheckEmail';
import { CheckUsernameCommand } from './../../../../core/usecases/authRepo/CheckUsername';
import { EnrollDeviceCommand } from './../../../../core/usecases/authRepo/EnrollDevice';
import { GeneratePasswordCodeCommand } from './../../../../core/usecases/authRepo/GeneratePasswordCode';
import { LoginWithEmailCommand } from './../../../../core/usecases/authRepo/LoginWithEmail';
import { ResetPasswordCommand } from './../../../../core/usecases/authRepo/ResetPassword';
import { AxiosInstance } from 'axios';

export class RDAuthRepo implements AuthRepo {
  constructor(private httpClient: AxiosInstance) {}

  async loginWithEmail(req: LoginWithEmailCommand) {
    const result: Token & FirebaseToken = await this.httpClient.post(
      'api/user/signin',
      req,
    );
    return result;
  }

  async signUp(req: LoginWithEmailCommand) {
    const result: Token & FirebaseToken = await this.httpClient.post(
      'api/user/signup',
      req,
    );
    return result;
  }

  async checkEmail(req: CheckEmailCommand) {
    const result: Taken = await this.httpClient.post('api/common/email', req);
    return result;
  }

  async checkUsername(req: CheckUsernameCommand) {
    const result: UsernameValidity = await this.httpClient.post(
      'api/common/username',
      req,
    );
    return result;
  }

  async appleSignup(req: ProviderTokenCommand) {
    const result: Token & FirebaseToken = await this.httpClient.post(
      'api/user/register/apple',
      req,
    );
    return result;
  }

  async appleSignin(req: ProviderTokenCommand) {
    const result: Token & FirebaseToken = await this.httpClient.post(
      'api/user/auth/apple',
      req,
    );
    return result;
  }

  async googleSignup(req: ProviderTokenCommand) {
    const result: Token & FirebaseToken = await this.httpClient.post(
      'api/user/register/google',
      req,
    );
    return result;
  }

  async googleSignin(req: ProviderTokenCommand) {
    const result: Token & FirebaseToken = await this.httpClient.post(
      'api/user/auth/google',
      req,
    );
    return result;
  }

  async generatePasswordCode(req: GeneratePasswordCodeCommand) {
    const result: void = await this.httpClient.patch(
      'api/user/password/recovery',
      req,
    );
    return result;
  }

  async resetPassword(req: ResetPasswordCommand) {
    const result: void = await this.httpClient.patch(
      'api/user/password/reset',
      req,
    );
    return result;
  }

  async enrollDevice(req: EnrollDeviceCommand) {
    const result: void = await this.httpClient.post('api/user/device', req);
    return result;
  }

  async firebaseRefreshToken() {
    const result: Token = await this.httpClient.post(
      'api/user/auth/refresh-token',
    );
    return result;
  }

  async buySubscription(req: BuySubscriptionCommand) {
    const result: void = await this.httpClient.post('api/iap/receipt', req);
    return result;
  }
}
