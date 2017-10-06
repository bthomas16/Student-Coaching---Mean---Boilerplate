import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-teacher-profile',
  templateUrl: './view-teacher-profile.component.html',
  styleUrls: ['./view-teacher-profile.component.css']
})
export class ViewTeacherProfileComponent implements OnInit, AfterContentChecked {
  message;
  messageClass;
  userID;
  userEmail;
  userFullname;
  userIsStudent: boolean = true;
  userIsTeacher: boolean = true;
  canRate: boolean = false;
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

  experience1;
  experience2;
  experience3;
  experience4;
  experience5;

  showRate: boolean = false;

  findTeacher: boolean = true;

  constructor(public authService: AuthService, public apiService: ApiService, private activatedRoute: ActivatedRoute) {}


  isUserTheTeacher() {
    if(this.teacherID == this.userID) {
      return false
    } else {
      return true;
    }
  }

  closeRating(){
    this.canRate = false;
    this.apiService.closeRating(this.canRate)
  }

  openRating(){
    this.canRate = true;
    this.apiService.openRating(this.canRate)
  }

  ngAfterContentChecked(){
    this.canRate =  this.apiService.getRatingStatus();
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.userID = profile.user.id
      this.userFullname = profile.user.fullname.toUpperCase();
      this.userEmail = profile.user.email;
      this.userIsStudent = profile.user.isStudent;
      this.userIsTeacher = profile.user.isTeacher;
      this.experience1 = profile.user.experience1;
      this.experience2 = profile.user.experience2;
      this.experience3 = profile.user.experience3;
      this.experience4 = profile.user.experience4;
      this.experience5 = profile.user.experience5;
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
          if(data.teacher.ratings.kRatingsArray == null || undefined) {
            return null
          }
          this.teacherKRatingsArray = data.teacher.ratings.kRatingsArray.reduce((a, b) => a + b)/data.teacher.ratings.kRatingsArray.length;
          this.teacherPRatingsArray = data.teacher.ratings.pRatingsArray.reduce((a, b) => a + b)/data.teacher.ratings.pRatingsArray.length;
          this.teacherTARatingsArray = data.teacher.ratings.taRatingsArray.reduce((a, b) => a + b)/data.teacher.ratings.taRatingsArray.length;
      }
    });
    window.scrollTo(0, 0);
  }
  }
