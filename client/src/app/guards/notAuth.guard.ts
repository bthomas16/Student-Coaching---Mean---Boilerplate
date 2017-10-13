import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class NotAuthGuard implements CanActivate {

isStudent;
isTeacher;
  constructor(
    private authService: AuthService,
    private router: Router) {}

  canActivate() {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/profile']);
      return false;
    } else {
      return true;
    }
  }


// canActivateTeacher() {
//     this.authService.getProfile().subscribe(profile => {
//       this.isTeacher = profile.user.isTeacher;
//     });
//     if (this.authService.loggedIn()) {
//       this.router.navigate(['/'])
//       return false;
//       } else {
//         if(this.isTeacher == true ) {
//           return true
//     }
//   }
// }
// canActivateStudent() {
//     this.authService.getProfile().subscribe(profile => {
//       this.isStudent = profile.user.isStudent;
//     });
//     if (this.authService.loggedIn()) {
//       this.router.navigate(['/'])
//       return false;
//       } else {
//         if(this.isStudent == true ) {
//           return true
//     }
//   }
// }
}
