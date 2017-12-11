import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-teacher-profile-main',
  templateUrl: './teacher-profile-main.component.html',
  styleUrls: ['./teacher-profile-main.component.css']
})
export class TeacherProfileMainComponent implements OnInit {
  @Input() fullname;
  showModal: boolean = false;

  constructor() { }


  ngOnInit() {
  }

}
