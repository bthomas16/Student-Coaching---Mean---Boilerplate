import { Component, OnInit } from '@angular/core';
import { StudentAuthGuard } from '../../../guards/student-auth.guard';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {

message;
messageClass;
previousUrl;


  constructor(private studentAuthGuard: StudentAuthGuard) { }

  ngOnInit() {
    if (this.studentAuthGuard.redirectUrl) {
      this.messageClass = "alert alert-warning";
      this.message = 'You first register as a Student';
      this.previousUrl = this.studentAuthGuard.redirectUrl
      this.studentAuthGuard.redirectUrl = undefined;
    }
  }

}
