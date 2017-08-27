
import { Injectable} from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class StudentAuthGuard implements CanActivate {

  redirectUrl;
  fullname;
  email;
  isStudent;
  isTeacher;

  constructor(
    private authService: AuthService,
    private router: Router)
    {
    }

    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.checkStatus()
    }

private checkStatus():boolean {
  if (this.authService.isStudent()) {
    console.log('nope')
    return true
  } else {
    this.router.navigate(['/student/register'])
    console.log('fail')
    return false;
  }}
    // this.redirectUrl = state.url;
}
