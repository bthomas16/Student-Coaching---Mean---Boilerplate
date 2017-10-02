
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ApiService } from '../../../../services/api.service';
import { Pipe, PipeTransform } from '@angular/core';
import { ShufflePipe } from 'ngx-pipes/src/app/pipes/array/shuffle';
import { FilterPipe } from '../../../../filter.pipe';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.css'],
  providers: [ShufflePipe]
})
export class TeachersListComponent implements OnInit {
  filterText;
  id: number;

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

  teacher;
  teachersList;
  teachersArray;
  teacherRatingArray;
  ratingsArray: Array<any> = [];
  newArray;

  avgRatingNumber;
  constructor(public apiService: ApiService, public shufflePipe: ShufflePipe) {}

  ngOnInit() {
    this.apiService.getAllTeachers().subscribe(data => {
      data.teachers = this.shufflePipe.transform(data.teachers)
      this.teachersList = data.teachers
      // console.log(this.teachersList.length, 'length')
      if(this.teachersList == undefined) {
        return false
      }
        if(this.teachersList.length !== null || undefined ) {
         //  Loop through teachers array to get each teacher
        for(const teacher of this.teachersList) {
          // this.teacherRatingArray = teacher.ratings;
            this.avgRatingNumber = teacher.avgRatingNumber || null
            console.log(this.avgRatingNumber, 'avg')
      //     let teacherRatings = [];
      //     const rate = {
      //       rating: teacher.ratings,
      //       number: this.avgTotalRating || 5
      //     }
      //     teacherRatings.push(rate)
      //     this.teacherRatingArray = teacherRatings;
      //     console.log(this.teacherRatingArray, 'mlk')
       //
      //     for(let rating in this.teacherRatingArray){
      //     console.log(rating, 'normal rating')
      //     this.tempkRatingsArray.push(rating.kRatings)
      //     this.temppRatingsArray.push(rating.pRatings)
      //     this.temptaRatingsArray.push(rating.taRatings)
      //   // }
      //  // get averages of all individual arrays
      //   let avgkRating = (this.tempkRatingsArray.reduce((a, b) => a + b))/this.tempkRatingsArray.length;
      //   let avgpRating = (this.temppRatingsArray.reduce((a, b) => a + b))/this.temppRatingsArray.length;
      //   let avgtaRating = (this.tempkRatingsArray.reduce((a, b) => a + b))/this.tempkRatingsArray.length;
      //  //  get number of ratings
      //   this.numberOfRatings = this.tempkRatingsArray.length;
      //   //  get total array average
      //   this.avgTotalRating = (avgkRating + avgpRating + avgtaRating)/3;
      //   this.newArray.push(this.avgTotalRating)
      //   console.log(this.newArray, 'this is nte newest array')
       //
      //   // this.teacherRatingArray = [{
      //   //   rating: rating,
      //   //   avgRating: this.avgTotalRating
      //   //   }]
      //   //   console.log(this.teacherRatingArray, 'meekppers')
      //   }
      }
      // let everything = {
      //   teacher: this.teacher,
      //   teachersRating: this.avgTotalRating,
      //   numerRated: this.numberOfRatings
      // }
      // this.ratingsArray.push(everything)
      // console.log(this.ratingsArray, "Raating Array")

       }
      return false;
    });
  }
}
