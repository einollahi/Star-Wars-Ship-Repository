import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    const username = this.loginForm.get('username')?.value?.trim();
    const password = this.loginForm.get('password')?.value?.trim();

    if (this.loginForm.invalid || !username || !password) return;

    this.authService.login(username, password).subscribe((res) => {
      if (res) this.router.navigate(['/']);
    });
  }
}
