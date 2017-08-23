import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  email;
  fullname;
  isStudent;
  isTeacher;
  profPic;


  constructor(private authService: AuthService) { }

//   ngOnInit() {
//     this.authService.getProfile()
//     .subscribe(profile => {
//       this.fullname = profile.user.fullname.toUpperCase();
//       this.email = profile.user.email;
//       this.isStudent = profile.user.isStudent;
//       this.isTeacher = profile.user.isTeacher;
//       if (this.isStudent === 'true') {
//         this.isStudent = 'Student Acount'
//       } else {
//         this.isStudent = 'Create Student Account'
//       }
//       if (this.isTeacher === 'true') {
//         this.isTeacher = 'Teacher Account'
//     } else {
//       this.isTeacher = 'Create Teacher Account'
//     }
//   });
// }

ngOnInit() {
  this.authService.getProfile()
  .subscribe(profile => {
    this.fullname = profile.user.fullname.toUpperCase();
    this.email = profile.user.email;
    this.profPic = '../../../assets/blankProf.png';
    this.isStudent = profile.user.isStudent;
    this.isTeacher = profile.user.isTeacher;
    if (this.isStudent == true) {
       this.isStudent = 'Student Account'
    } else {
         this.isStudent = 'Create Student Account'
       }
    if (this.isTeacher == true) {
       this.isTeacher = "Teacher Account";
    } else {
         this.isTeacher = 'Create Teacher Account'
       }
});
}

}
