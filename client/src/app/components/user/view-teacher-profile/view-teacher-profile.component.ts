import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-teacher-profile',
  templateUrl: './view-teacher-profile.component.html',
  styleUrls: ['./view-teacher-profile.component.css']
})
export class ViewTeacherProfileComponent implements OnInit {
  message;
  messageClass;
  userID;
  userEmail;
  userFullname;
  userIsStudent: boolean = true;
  userIsTeacher: boolean = true;
  // profPic;
  processing: boolean = false;
  show: boolean = true;
  edit: boolean = false;
  currentUrl;
  teacherID;
  teacherEmail;
  teacherFullname;
  teacherKRatingsArray;
  teacherPRatingsArray;
  teacherTARatingsArray;
  teacherAvgRatings;

  findTeacher: boolean = true;

  constructor(public authService: AuthService, private activatedRoute: ActivatedRoute) {}


  isUserTheTeacher() {
    if(this.teacherID == this.userID) {
      return false
    } else {
      return true;
    }
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.userID = profile.user.id
      this.userFullname = profile.user.fullname.toUpperCase();
      this.userEmail = profile.user.email;
      this.userIsStudent = profile.user.isStudent;
      this.userIsTeacher = profile.user.isTeacher;
    })
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.authService.getTeacherView(this.currentUrl.id).subscribe(data => {
      if(!data.success) {
        this.messageClass ='alert alert-danger';
        this.message = data.message
      } else {
          this.findTeacher = false;
          this.teacherID = data.teacher.id;
          this.teacherEmail = data.teacher.email;
          this.teacherFullname = data.teacher.fullname;
          this.teacherKRatingsArray = data.teacher.kRatingsArray.reduce((a, b) => a + b)/data.teacher.kRatingsArray.length;
          this.teacherPRatingsArray = data.teacher.pRatingsArray.reduce((a, b) => a + b)/data.teacher.pRatingsArray.length;
          this.teacherTARatingsArray = data.teacher.taRatingsArray.reduce((a, b) => a + b)/data.teacher.taRatingsArray.length;
      }
    });
  }
  }
