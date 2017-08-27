import { Component, OnInit } from '@angular/core';
import { TeacherAuthGuard } from '../../../guards/teacher-auth.guard';

@Component({
  selector: 'app-teacher-register',
  templateUrl: './teacher-register.component.html',
  styleUrls: ['./teacher-register.component.css']
})
export class TeacherRegisterComponent implements OnInit {

message;
messageClass;
previousUrl;


  constructor(private teacherAuthGuard: TeacherAuthGuard) { }

  ngOnInit() {
    if (this.teacherAuthGuard.redirectUrl) {
      this.messageClass = "alert alert-warning";
      this.message = 'You must first Register as a Teacher';
      this.previousUrl = this.teacherAuthGuard.redirectUrl
      this.teacherAuthGuard.redirectUrl = undefined;
    }
  }

}
