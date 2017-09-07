import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  imgForm;
  message;
  messageClass;
  selectedFile: File;


  constructor(public authService: AuthService, private formBuilder: FormBuilder) {
    this.createForm()
}

createForm() {
  this.imgForm = this.formBuilder.group({
    image: ['']
  });
}

onChange(event) {
  this.selectedFile = event.target.files[0];
}

  onImgSubmit() {
    const image = {image: this.selectedFile}
    console.log('howdy', image)
    this.authService.imgSubmit(image).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success'
        this.message = data.message
      }
    });
  }

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
