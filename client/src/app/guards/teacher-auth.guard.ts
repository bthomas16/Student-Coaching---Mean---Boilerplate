import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TeacherAuthGuard implements CanActivate {

  redirectUrl;
  isTeacher;

  constructor(
    private authService: AuthService,
    private router: Router)
    {}


canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  this.authService.getProfile().subscribe(profile => {
    this.isTeacher = profile;
  });
  if (this.authService.loggedIn()) {
    if(this.isTeacher == true ) {
      return true
    } else {
    this.redirectUrl = state.url;
    this.router.navigate(['/register/teacher'])
    return false;
    }
  }
}

}
