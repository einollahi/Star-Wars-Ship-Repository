import { IUser } from './../../shared/interfaces/user.interface';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class StartupService {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  load(): Promise<void> {
    return new Promise(async (resolve) => {
      const token = this.tokenService.getToken();
      const tokenObj = await this.parseJSON(token as string);

      if (tokenObj) this.authService.setAuthState(tokenObj);
      else this.tokenService.removeToken();

      resolve();
    });
  }

  private async parseJSON(str: string) {
    try {
      return JSON?.parse(str);
    } catch (error) {
      return null;
    }
  }
}
