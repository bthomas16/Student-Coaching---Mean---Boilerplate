import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  email;
  message;
  messageClass;
  fullname;
  studentBio = "Update you bio...";
  isStudent: boolean = true;
  isTeacher;
  profPic;
  processing = false;
  show = true;
  isLoading: boolean = true;
  isEdit: boolean = false;

  constructor(public authService: AuthService, private router: Router) { }

  becomeStudentRegister() {
    this.isStudent = true;
    this.processing = true;
    const user = { isStudent: this.isStudent}
    this.authService.updateStudent(user).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success'
        this.message = data.message
        setTimeout(() => {
          this.show = false;
        }, 1400)
      }
    })
  }

  getBioValue(value) {
      this.studentBio = value;
  }

  bioValueSubmit() {
    const studentBio = {
      studentBio: this.studentBio
    }
    this.authService.onBioFormSubmit(studentBio).subscribe(data => {
      if(!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.show = true;
        this.isEdit = false;
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.show = false
        }, 1200);
      }
    });
  }

  ngOnInit() {
    this.authService.getProfile()
    .subscribe(profile => {
      this.fullname = profile.user.fullname;
      this.email = profile.user.email;
      this.isStudent = profile.user.isStudent;
      this.isTeacher = profile.user.isTeacher;
      this.studentBio = profile.user.studentBio
    });
    // setTimeout(() => {
    //   this.isLoading = false;
    // }, 800);
    window.scrollTo(0, 0);
  }
}
