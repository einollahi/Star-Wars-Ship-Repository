import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  user!: IUser;
  subscription: Subscription = new Subscription();
  showLoader!: boolean;

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.loadingService
        .getLoadingStatus()
        .subscribe((loaderStatus: boolean) => {
          this.showLoader = loaderStatus;
        })
    );
    this.subscription.add(
      this.authService.getAuthState().subscribe((userState: IUser) => {
        this.user = userState;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  login(): void {
    this.router.navigate(['login']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
