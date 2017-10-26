import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service'
import { ActivatedRoute } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { ShufflePipe } from 'ngx-pipes/src/app/pipes/array/shuffle';

@Component({
  selector: 'app-teacher-reviews',
  templateUrl: './teacher-reviews.component.html',
  styleUrls: ['./teacher-reviews.component.css'],
  providers: [ShufflePipe]
})
export class TeacherReviewsComponent implements OnInit {
    message;
    messageClass;
    userID;
    userEmail;
    userFullname;
    teacherEmail;
    teacherFullname;
    yetRated: boolean = false;
    numberOfRatings;
    avgTotalRating;
    sliceNumber: number = 3;
    canReadMore: boolean = false;
    teachersList;
    teachersListLength;
    readSliceNumber;
    originalTeachersListLength;
    canShowMore: boolean = true;


    constructor(public authService: AuthService, private route: ActivatedRoute, private shufflePipe: ShufflePipe) { }

    addSlice3(){
      console.log('hi', this.originalTeachersListLength, this.sliceNumber)
      this.sliceNumber += 3;
      if(this.sliceNumber > this.originalTeachersListLength) {
        this.sliceNumber = this.teachersListLength;
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


  ngOnInit() {
    this.route.params.subscribe(params => {
    let viewTeacherID = params['id'];
      if(viewTeacherID) {
         this.authService.getTeacherView(viewTeacherID).subscribe(viewTeacher => {
            this.originalTeachersListLength = viewTeacher.teacher.ratings.length;
            this.teachersList = this.shufflePipe.transform(viewTeacher.teacher.ratings);
            this.teachersList.slice(0, 3);
            this.teachersListLength = this.teachersList.length;
            });
          }
      if(!viewTeacherID) {
      this.authService.getProfile()
      .subscribe(profile => {
        this.originalTeachersListLength = profile.user.ratings.length;
        this.teachersList = this.shufflePipe.transform(profile.user.ratings)
        this.teachersList.slice(0, this.sliceNumber)
        this.teachersListLength = this.teachersList.length;
      });
    }
  });
  }
}
