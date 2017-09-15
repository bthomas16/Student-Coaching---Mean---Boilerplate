import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {
  email;
  message;
  messageClass;
  userID;
  fullname;
  isStudent;
  isTeacher: boolean = true;
  profPic;
  processing: boolean = false;
  show: boolean = true;
  edit: boolean = false;
  currentUrl;
  teacherID;

  constructor(public authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {}

  isEdit() {
    this.edit = true;
  }

  isSave() {
    this.edit = false;
  }

  hideMessage() {}

  becomeTeacherRegister() {
    this.isTeacher = true;
    this.processing = true;
    const user = { isTeacher: this.isTeacher}
    this.authService.updateTeacher(user).subscribe(data => {
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

  isUserTheTeacher() {
    if(this.teacherID == this.userID) {
      return false
    } else {
      return true;
    }
  }

  ngOnInit() {
    this.authService.getProfile()
    .subscribe(profile => {
      this.userID = profile.user.id
      this.fullname = profile.user.fullname.toUpperCase();
      this.email = profile.user.email;
      this.isTeacher = profile.user.isTeacher;
      this.isTeacher = profile.user.isTeacher;
    })
}
}
