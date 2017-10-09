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

    isChecked1: boolean = false;
    isChecked2: boolean = false;
    isChecked3: boolean = false;
    isChecked4: boolean = false;
    isChecked5: boolean = false;
    yetRated: boolean = false;

    tempkRatingsArray: Array<number> = [];
    temppRatingsArray: Array<number> = [];
    temptaRatingsArray: Array<number> = [];

    avgkRating;
    avgpRating;
    avgtaRating;
    numberOfRatings;
    avgTotalRating;

    teachersList;


    constructor(public authService: AuthService, private route: ActivatedRoute, private shufflePipe: ShufflePipe) { }


  ngOnInit() {
    this.route.params.subscribe(params => {
    let viewTeacherID = params['id'];
      if(viewTeacherID) {
         this.authService.getTeacherView(viewTeacherID).subscribe(viewTeacher => {
            this.teachersList = this.shufflePipe.transform(viewTeacher.teacher.ratings)
            });
          }
      if(!viewTeacherID) {
      this.authService.getProfile()
      .subscribe(profile => {
        this.teachersList = this.shufflePipe.transform(profile.user.ratings)
      });
    }
  });
  }
}
