import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StudentAuthService } from '../services/student-auth.service';

@Injectable()
export class NotAuthGuard implements CanActivate {

  constructor(
    private studentAuthService: StudentAuthService,
    private router: Router) {}

  canActivate() {
    if (this.studentAuthService.loggedIn()) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
