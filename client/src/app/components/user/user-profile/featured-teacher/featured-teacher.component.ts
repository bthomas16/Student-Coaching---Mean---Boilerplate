import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Pipe, PipeTransform } from '@angular/core';
import { ShufflePipe } from 'ngx-pipes/src/app/pipes/array/shuffle';
import { FilterPipe } from '../../../../pipes/filter.pipe';


@Component({
  selector: 'app-featured-teacher',
  templateUrl: './featured-teacher.component.html',
  styleUrls: ['./featured-teacher.component.css'],
  providers: [ShufflePipe]
})
export class FeaturedTeacherComponent implements OnInit {
  grabValue = 0;
  indexValue = 1;
  randomRatingIndex = 0;
  featuredTeacherId;
  fullname;
  email;
  county;
  yrsExperience;
  id;
  skills;
  handicap;
  cost;
  profPic;
  allTeacher;
  bio: String = '';
  route: String = '../view-teacher-profile/'
  avgRatingArray;
  teachersList;
  ratingsList;
  promotion;


  promoExample = "There's no substitute for great coaching!"

  // server = "";
  awsBucket = 'https://s3.amazonaws.com/savvyappphotos/';

  constructor(public authService: AuthService, private shufflepipe: ShufflePipe) {
   }

   paginate(value) {
     this.grabValue = value;
     this.indexValue = this.grabValue + 1;
     console.log(this.grabValue)
   }

   up1() {
     this.grabValue++;
     this.indexValue++;
     if(this.grabValue >= 3) {
       this.grabValue = 0;
       this.indexValue = 1;
     }
     console.log(this.grabValue, this.indexValue)
   }

   down1() {
     this.grabValue--;
     this.indexValue--;
     if(this.grabValue < 0) {
       this.grabValue = 2;
       this.indexValue = 3;
     }
     console.log(this.grabValue)
   }

  ngOnInit() {
    this.authService.getFeaturedTeacher()
    .subscribe(featured => {
      let shuffledTeachersRatings = this.shufflepipe.transform(featured.teachers)
      this.teachersList = shuffledTeachersRatings.slice(0,3);
      if(this.teachersList[this.grabValue].ratings[0]) {
        let ratingsLength = this.teachersList[this.indexValue].ratings.length
        this.randomRatingIndex = Math.floor((Math.random() * (ratingsLength - 1)) + 1)
        console.log(this.randomRatingIndex, 'ri')
      }
       });
  }
}
