
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ApiService } from '../../../../services/api.service';
import { Pipe, PipeTransform } from '@angular/core';
import { ShufflePipe } from 'ngx-pipes/src/app/pipes/array/shuffle';
import { FilterPipe } from '../../../../pipes/filter.pipe';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.css'],
  providers: [ShufflePipe]
})
export class TeachersListComponent implements OnInit {
  county: string = "Select a County";
  skill: string = "Select a Skill";
  experience: number;
  searchName: string;
  sliceNumber = 6;
  canShowLess: boolean = false;
  noMoreToLoad: boolean = false;
  teachersList;
  avgRatingNumber;

  constructor(public apiService: ApiService, public shufflePipe: ShufflePipe) {}

  showMore() {
    this.canShowLess = true;
    this.sliceNumber += 4;
    this.teachersList.slice(0, this.sliceNumber)
    if(this.sliceNumber >= this.teachersList.length) {
      this.noMoreToLoad = true;
    }
    console.log(this.sliceNumber)
  }

  showLess() {
    this.canShowLess = false;
    this.noMoreToLoad = false;
    this.sliceNumber = 6;
    this.teachersList.slice(0, this.sliceNumber)
  }

  getTeachers() {
    this.apiService.getAllTeachers().subscribe(data => {
      data.teachers = this.shufflePipe.transform(data.teachers)
      this.teachersList = data.teachers;
      console.log(this.teachersList)
      if(this.teachersList == undefined) {
        return false
      }
        for(const teacher of this.teachersList) {
            this.avgRatingNumber = teacher.avgRatingNumber || null
          }
      });
  }

  ngOnInit() {
    this.getTeachers();
  }
}
