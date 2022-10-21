import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly TOKEN_NAME = 'app_token';

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  public setToken(value: string): void {
    localStorage.setItem(this.TOKEN_NAME, value);
  }

  public removeToken(): void {
    localStorage.removeItem(this.TOKEN_NAME);
  }
}
