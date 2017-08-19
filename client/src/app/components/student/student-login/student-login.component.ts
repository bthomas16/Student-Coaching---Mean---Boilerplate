import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

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

  constructor (private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
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
  this.authService.studentLogin(student).subscribe(data => {
    if(!data.success) {
      this.messageClass = 'alert alert-danger';
      this.message = data.message;
      this.processing = false;
      this.enableForm();
    } else {
      this.messageClass = 'alert alert-success';
      this.message = data.message;
      this.authService.storeStudentData(data.token, data.student);
      setTimeout(() => {
        this.router.navigate(['/student/profile/'])
      }, 1800)
    }
  })
}

  ngOnInit() {
  }

}
