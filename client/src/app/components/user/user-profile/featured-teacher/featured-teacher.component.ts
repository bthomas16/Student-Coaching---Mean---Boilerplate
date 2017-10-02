import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Pipe, PipeTransform } from '@angular/core';
import { ShufflePipe } from 'ngx-pipes/src/app/pipes/array/shuffle';
import { FilterPipe } from '../../../../filter.pipe';


@Component({
  selector: 'app-featured-teacher',
  templateUrl: './featured-teacher.component.html',
  styleUrls: ['./featured-teacher.component.css'],
  providers: [ShufflePipe]
})
export class FeaturedTeacherComponent implements OnInit {
  featuredTeacherId;
  fullname;
  email;
  location;
  yrsExperience;
  id;
  skills;
  handicap;
  cost;
  profPic;
  allTeacher;
  bio: String = '';
  route: String;

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

  constructor(public authService: AuthService, private shufflepipe: ShufflePipe) {
   }

  ngOnInit() {
    this.authService.getFeaturedTeacher()
    .subscribe(featured => {
      this.fullname = featured.teacher.fullname;
      this.handicap = featured.teacher.handicap;
      this.skills = featured.teacher.skills;
      this.route = ""

      let shuffledTeachersRatings = this.shufflepipe.transform(featured.teacher.ratings)
      this.teachersList = shuffledTeachersRatings
     //  if ratings array is not 0, do this operation
      if( this.teachersList.length !== null || 0 ) {
        this.yetRated = true;
       //  Loop through ratings array
      for(let rating of this.teachersList) {
        this.tempkRatingsArray.push(rating.kRatings)
        this.temppRatingsArray.push(rating.pRatings)
        this.temptaRatingsArray.push(rating.taRatings)
     }
     // get averages of all individual arrays
      let avgkRating = (this.tempkRatingsArray.reduce((a, b) => a + b))/this.tempkRatingsArray.length;
      let avgpRating = (this.temppRatingsArray.reduce((a, b) => a + b))/this.temppRatingsArray.length;
      let avgtaRating = (this.tempkRatingsArray.reduce((a, b) => a + b))/this.tempkRatingsArray.length;
     //  get number of ratings
      this.numberOfRatings = this.tempkRatingsArray.length;
      //  get total array average
      this.avgTotalRating = (avgkRating + avgpRating + avgtaRating)/3;
     //  set star states based on total average array value
      if(this.avgTotalRating >= 4.5) {
             this.isChecked5 = true;
           } else {
              if(this.avgTotalRating >= 3.5) {
                this.isChecked4 = true;
              } else {
                if(this.avgTotalRating >= 2.5) {
                  this.isChecked3 = true;
                } else {
                  if(this.avgTotalRating >= 1.5) {
                    this.isChecked2 = true;
                  } else {
                    if(this.avgTotalRating >= 0.5) {
                      this.isChecked1 = true;
                    }
                  }
                }
              }
            }
           return false;
         }
       });
    return false;
  }
}
