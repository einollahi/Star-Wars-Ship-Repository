import { IUser } from 'src/app/shared/interfaces/user.interface';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { TokenService } from './../../core/services/token.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.getUserFromToken();

    if (state.url.toLocaleLowerCase() === '/login') {
      if (user?.username) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    } else {
      if (user?.username) {
        return true;
      }
      this.router.navigate(['login']);
      return false;
    }
  }

  private getUserFromToken(): IUser | undefined {
    const token = this.tokenService.getToken();

    if (token) {
      return JSON.parse(token);
    }
    return;
  }
}
