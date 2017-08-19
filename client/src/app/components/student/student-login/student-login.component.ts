import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { StudentAuthService } from '../../../services/student-auth.service';
import { AuthGuard } from '../../../guards/auth.guard';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {

message;
messageClass;
processing = false;
form: FormGroup;
previousUrl;

  constructor (private formBuilder: FormBuilder, private studentAuthService: StudentAuthService, private router: Router, private authGuard: AuthGuard) {
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
  const student = {
    email: this.form.get('email').value,
    password: this.form.get('password').value
  }
  this.studentAuthService.studentLogin(student).subscribe(data => {
    if(!data.success) {
      this.messageClass = 'alert alert-danger';
      this.message = data.message;
      this.processing = false;
      this.enableForm();
    } else {
      this.messageClass = 'alert alert-success';
      this.message = data.message;
      this.studentAuthService.storeStudentData(data.token, data.student);
      setTimeout(() => {
        if (this.previousUrl) {
          this.router.navigate([this.previousUrl])
        } else {

        this.router.navigate(['/student/profile/'])
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
