import { AppObject } from '@constants/object';
import { Inject, Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { GoogleAuthConnectOptions } from './google-auth.interface';

@Injectable()
export class GoogleAuthService {
  private auth: OAuth2Client;

  constructor(
    @Inject(AppObject.APP_PROVIDERS.GOOGLE_AUTH)
    private readonly options: GoogleAuthConnectOptions,
  ) {
    this._initialGoogleAuth();
  }

  async verifyIdToken(idToken: string): Promise<any> {
    const ticket = await this.auth.verifyIdToken({
      idToken: idToken,
      audience: this.auth._clientId,
    });

    const payload = ticket.getPayload();

    return payload;
  }

  /**
   * Initial google cloud service instance
   */
  private async _initialGoogleAuth(): Promise<void> {
    const options = {
      keyFilename: this.options.credentials.path,
      projectId: this.options.projectId,
    };

    this.auth = new OAuth2Client(options);
  }
}
