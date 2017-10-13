
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
  profPic;
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
      if(this.teachersList == undefined) {
        return false
      }
        for(const teacher of this.teachersList) {
            this.avgRatingNumber = teacher.avgRatingNumber || null
          }
      });
      return true;
    }
}
