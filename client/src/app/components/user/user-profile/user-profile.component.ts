import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  email;
  fullname;
  isStudent;
  isTeacher;
  profPic;


  constructor(public authService: AuthService) { }

ngOnInit() {
  this.authService.getProfile()
  .subscribe(profile => {
    this.fullname = profile.user.fullname.toUpperCase();
    this.email = profile.user.email;
    this.isStudent = profile.user.isStudent;
    this.isTeacher = profile.user.isTeacher;
  });
}

}
