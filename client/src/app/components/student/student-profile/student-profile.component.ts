import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})

export class StudentProfileComponent implements OnInit {
  email;
  firstname;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getStudentProfile()
    .subscribe(profile => {
      this.firstname = profile.student.firstname.toUpperCase();
      this.email = profile.student.email;
    });
  }

}
