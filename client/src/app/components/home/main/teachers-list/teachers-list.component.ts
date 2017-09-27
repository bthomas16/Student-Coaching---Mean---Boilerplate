
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
  teachersList;
  filterText;
  id: number;

  constructor(public apiService: ApiService, public shufflePipe: ShufflePipe) {

   }

  getAllTeachers() {
  // Function to GET all blogs from database
  this.apiService.getAllTeachers().subscribe(data => {
    data.teachers = this.shufflePipe.transform(data.teachers)
    this.teachersList = data.teachers
  });
}

  ngOnInit() {
    this.getAllTeachers();
  }

}
