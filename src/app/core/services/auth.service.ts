import { Injectable } from '@angular/core';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { IUser } from '../../shared/interfaces/user.interface';
import { TokenService } from './token.service';

const USERS_LIST: IUser[] = [
  Object.freeze({
    username: 'admin',
    password: 'admin',
    firstName: 'Admin',
    lastName: 'Admin',
  }),
  Object.freeze({
    username: 'ali',
    password: '123456',
    firstName: 'Ali',
    lastName: 'Einollahi',
  }),
  Object.freeze({
    username: 'john',
    password: 'smith',
    firstName: 'John',
    lastName: 'Smith',
  }),
];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>({
    username: '',
    firstName: '',
    lastName: '',
  });

  constructor(private tokenService: TokenService) {}

  public getAuthState(): Observable<IUser> {
    return this.user$.asObservable();
  }

  public setAuthState(user: IUser): void {
    this.user$.next(user);
  }

  public login(username: string, password: string): Observable<any> {
    return this.loginMock(username, password).pipe(
      tap({
        next: (user: IUser) => {
          const { username, firstName, lastName } = user;
          this.user$.next({ username, firstName, lastName });

          const id = Math.ceil(Math.random() * 1000000000).toString(36);
          const token = JSON.stringify({ id, ...user });
          this.tokenService.setToken(token);
        },
        error: () => {
          this.tokenService.removeToken();
          this.user$.next({ username: '', firstName: '', lastName: '' });
        },
      })
    );
  }

  private loginMock(username: string, password: string): Observable<IUser> {
    const foundUser = USERS_LIST.find(
      (user) => user.username === username && user.password === password
    );

    return new Observable((observer) => {
      const user = { ...foundUser };

      if (Object.keys(user).length > 0) {
        delete user?.['password'];
        observer.next(user as IUser);
        observer.complete();
      } else {
        observer.error('Invalid Username or password');
        observer.complete();
      }
    });
  }

  public logout(): void {
    this.tokenService.removeToken();
    this.user$.next({ username: '', firstName: '', lastName: '' });
  }
}
