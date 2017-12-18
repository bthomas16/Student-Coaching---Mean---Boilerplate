import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  id;
  email;
  fullname;
  isStudent;
  isTeacher;
  selectedFile;
  message;
  messageClass;
  profPic;


  isLoading: boolean = false;


  constructor(public authService: AuthService) {
}


ngOnInit() {
  this.authService.getProfile()
  .subscribe(profile => {
    this.id = profile.user._id;
    this.fullname = profile.user.fullname.toUpperCase();
    this.email = profile.user.email;
    this.isStudent = profile.user.isStudent;
    this.isTeacher = profile.user.isTeacher;
    this.profPic = profile.user.profPicName;
    this.profPic = '/authentication/avatar-retrieve/' + this.id
    // setTimeout(() => {
    //   this.isLoading = false;
    // }, 1000);
  });
  window.scrollTo(0, 0)
}

}
