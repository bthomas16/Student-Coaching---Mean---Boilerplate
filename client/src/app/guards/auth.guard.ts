import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  redirectUrl;
  isStudent;
  isTeacher;
  dataToggle = '';
  dataTarget = '';
  showModal: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router)
    {}

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.redirectUrl = state.url;
      this.dataToggle = 'modal';
      this.dataTarget = '#login'
      setTimeout(() => {
        this.router.navigate(['/login'])
      },500)
      return false;
    }
  }

}
