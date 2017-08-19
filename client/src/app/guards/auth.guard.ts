import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StudentAuthService } from '../services/student-auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  redirectUrl;

  constructor(
    private studentAuthService: StudentAuthService,
    private router: Router)
    {}

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.studentAuthService.loggedIn()) {
      return true;
    } else {
      this.redirectUrl = state.url;
      this.router.navigate(['/student/login'])
      return false;
    }
  }
}
