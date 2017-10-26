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
  bio;
  currentUrl;
  teacherID;
  teacherEmail;
  teacherFullname;
  teacherKRatingsArray;
  teacherPRatingsArray;
  teacherTARatingsArray;
  teacherAvgRatings;
  experiences: Array<string>;
  capFullname;
  profVideo = '';

  showRate: boolean = false;
  findTeacher: boolean = true;

  awsBucket: string = 'https://s3.amazonaws.com/savvyappphotos/';

  constructor(public authService: AuthService, public apiService: ApiService, private route: ActivatedRoute) {}


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
    this.route.params.subscribe(params => {
    let viewTeacherID = params['id'];
      if(viewTeacherID) {
         this.authService.getTeacherView(viewTeacherID).subscribe(viewTeacher => {
           if(!viewTeacher.success) {
             this.messageClass ='alert alert-danger';
             this.message = viewTeacher.message
           } else {
               this.findTeacher = false;
               this.teacherID = viewTeacher.teacher.id;
               this.bio = viewTeacher.teacher.bio;
               this.teacherEmail = viewTeacher.teacher.email;
               if(viewTeacher.teacher.profVideo) {
                 this.profVideo = (this.awsBucket + viewTeacher.teacher.profVideo);
               }
               this.teacherFullname = viewTeacher.teacher.fullname;
               this.experiences = viewTeacher.teacher.experiences
               this.capFullname = this.teacherFullname.charAt(0).toUpperCase() + this.teacherFullname.slice(1);
               console.log(this.capFullname)
               if(viewTeacher.teacher.ratings.kRatingsArray == null || undefined) {
                 return null
               }
               this.teacherKRatingsArray = viewTeacher.teacher.ratings.kRatingsArray.reduce((a, b) => a + b)/viewTeacher.teacher.ratings.kRatingsArray.length;
               this.teacherPRatingsArray = viewTeacher.teacher.ratings.pRatingsArray.reduce((a, b) => a + b)/viewTeacher.teacher.ratings.pRatingsArray.length;
               this.teacherTARatingsArray = viewTeacher.teacher.ratings.taRatingsArray.reduce((a, b) => a + b)/viewTeacher.teacher.ratings.taRa
             }
         })
         return true;
       }
    this.authService.getProfile().subscribe(profile => {
      this.userID = profile.user.id
      this.userFullname = profile.user.fullname.toUpperCase();
      this.userEmail = profile.user.email;
      this.userIsStudent = profile.user.isStudent;
      this.userIsTeacher = profile.user.isTeacher;
      this.experiences = profile.user.experiences;
    });
  });
    window.scrollTo(0, 0);
  }
  }
