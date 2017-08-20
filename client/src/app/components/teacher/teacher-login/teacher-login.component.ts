import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { TeacherAuthService } from '../../../services/teacher-auth.service';
import { AuthGuard } from '../../../guards/auth.guard';

@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.css']
})
export class TeacherLoginComponent implements OnInit {

message;
messageClass;
processing = false;
form: FormGroup;
previousUrl;

  constructor (private formBuilder: FormBuilder, private teacherAuthService: TeacherAuthService, private router: Router, private authGuard: AuthGuard) {
    this.createForm();
}

createForm() {
  this.form = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
}

disableForm() {
  this.form.controls['email'].disable();
  this.form.controls['password'].disable();
}

enableForm(){
  this.form.controls['email'].enable();
  this.form.controls['password'].enable();
}

onLoginSubmit() {
  this.processing = true;
  this. disableForm();
  const teacher = {
    email: this.form.get('email').value,
    password: this.form.get('password').value
  }
  this.teacherAuthService.teacherLogin(teacher).subscribe(data => {
    if(!data.success) {
      this.messageClass = 'alert alert-danger';
      this.message = data.message;
      this.processing = false;
      this.enableForm();
    } else {
      this.messageClass = 'alert alert-success';
      this.message = data.message;
      this.teacherAuthService.storeTeacherData(data.token, data.teacher);
      setTimeout(() => {
        if (this.previousUrl) {
          this.router.navigate([this.previousUrl])
        } else {

        this.router.navigate(['/teacher/profile/'])
        }
      }, 1400)
    }
  })
}

  ngOnInit() {
    if (this.authGuard.redirectUrl) {
      this.messageClass = "alert alert-warning";
      this.message = 'You must be logged in first';
      this.previousUrl = this.authGuard.redirectUrl
      this.authGuard.redirectUrl = undefined;
    }
  }

}
