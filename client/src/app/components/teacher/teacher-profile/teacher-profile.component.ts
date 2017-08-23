// import { Component, OnInit } from '@angular/core';
// import { TeacherAuthService } from '../../../services/teacher-auth.service';
//
// @Component({
//   selector: 'app-teacher-profile',
//   templateUrl: './teacher-profile.component.html',
//   styleUrls: ['./teacher-profile.component.css']
// })
//
// export class TeacherProfileComponent implements OnInit {
//   email;
//   firstname;
//
//   constructor(private teacherAuthService: TeacherAuthService) { }
//
//   ngOnInit() {
//     this.teacherAuthService.getTeacherProfile()
//     .subscribe(profile => {
//       this.firstname = profile.teacher.firstname.toUpperCase();
//       this.email = profile.teacher.email;
//     });
//   }
//
// }
