import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-student-profile',
  templateUrl: './view-student-profile.component.html',
  styleUrls: ['./view-student-profile.component.css']
})
export class ViewStudentProfileComponent implements OnInit, AfterContentChecked {
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
  ratingsListLength;
  experiences: Array<string>;
  profVideo = '';
  sliceNumber = 3;
  canShowMore: boolean = true;

  showRate: boolean = false;
  findTeacher: boolean = true;

  isLoading: boolean = true;

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

  addSlice3(){
    console.log('hi', this.ratingsListLength, this.sliceNumber)
    this.sliceNumber += 3;
    if(this.sliceNumber > this.ratingsListLength) {
      this.sliceNumber = this.ratingsListLength;
      this.canShowMore = false;
    }
  }

  subtractSlice3(){
      this.sliceNumber -= 3;
      this.canShowMore = true;
      if(this.sliceNumber <= 3 ) {
        this.sliceNumber = 3;
      }
    }

  resetSlice(){
      this.canShowMore = true;
      this.sliceNumber = 3;
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
               this.ratingsListLength = viewTeacher.teacher.ratings.length;
               this.teacherFullname = viewTeacher.teacher.fullname;
               this.experiences = viewTeacher.teacher.experiences
               if(viewTeacher.teacher.ratings.kRatingsArray == null || undefined) {
                 return null
               }
               this.teacherKRatingsArray = viewTeacher.teacher.ratings.kRatingsArray.reduce((a, b) => a + b)/viewTeacher.teacher.ratings.kRatingsArray.length;
               this.teacherPRatingsArray = viewTeacher.teacher.ratings.pRatingsArray.reduce((a, b) => a + b)/viewTeacher.teacher.ratings.pRatingsArray.length;
               this.teacherTARatingsArray = viewTeacher.teacher.ratings.taRatingsArray.reduce((a, b) => a + b)/viewTeacher.teacher.ratings.taRa
             }
         });
         setTimeout(() => {
           this.isLoading = false;
         }, 1000);
         return true;
       }
    this.authService.getProfile().subscribe(profile => {
      this.userID = profile.user.id
      this.userFullname = profile.user.fullname;
      this.userEmail = profile.user.email;
      this.userIsStudent = profile.user.isStudent;
      this.userIsTeacher = profile.user.isTeacher;
      this.experiences = profile.user.experiences;
      setTimeout(() => {
        this.isLoading = false;
      }, 600);
    });
  });
    window.scrollTo(0, 0);
  }
  }
