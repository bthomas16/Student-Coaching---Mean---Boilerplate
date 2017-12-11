import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  form;
  message;
  messageClass;
  processing = false;
  emailValid;
  emailMessage;
  isStudent: boolean = false;
  isTeacher: boolean = false;
  dataDismissAttribute = '';
  roleValue;

  constructor(private formBuilder: FormBuilder, public authService: AuthService, private router: Router, private apiService: ApiService) {
    this.createForm()
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
      ])],
      fullname: ['', Validators.required],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],
      // role: [[]],
      isStudent: [''],
      isTeacher: ['']
    });
  }

  disableForm() {
    this.form.controls['fullname'].disable();
    this.form.controls['email'].disable();
    this.form.controls['password'].disable();
  }

  enableForm(){
    this.form.controls['fullname'].enable();
    this.form.controls['email'].enable();
    this.form.controls['password'].enable();
  }

// Valid Email
  validateEmail(controls){
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    if(regExp.test(controls.value)) {
      return null;
    } else {
      return {
        'validateEmail': true
      }
    }
  }


  studentClickHandler() {
    this.isStudent = !this.isStudent;
    this.isTeacher = !this.isStudent;
    if(this.isStudent) {
      this.roleValue = 'student';
      return true;
    }
    this.roleValue = 'teacher';
  }

  teacherClickHandler() {
    this.isTeacher = !this.isTeacher;
    this.isStudent = !this.isTeacher;
    if(this.isTeacher) {
      this.roleValue = 'teacher';
      return true;
    }
    this.roleValue = 'student';
  }


  onRegisterSubmit() {
    this.processing = true;
    this.disableForm();
    let fullname = this.form.get('fullname').value.trim();
    fullname.toLowerCase();
    fullname = fullname.charAt(0).toUpperCase() + fullname.slice(1);
    const user = {
    fullname: fullname,
    email: this.form.get('email').value.toLowerCase().trim(),
    password: this.form.get('password').value.trim(),
    isStudent: this.isStudent,
    isTeacher: this.isTeacher
    }
    this.authService.Register(user).subscribe(data => {
    if (!data.success) {
      this.messageClass = 'alert alert-danger';
      this.message = data.message;
      this.processing = false;
      this.enableForm();
    } else {
      this.messageClass = 'alert alert-success';
      this.message = data.message;
      this.authService.storeData(data.token, data.user);
      setTimeout(() => {
        let value = false;
        this.apiService.registerModal(value);
        this.router.navigate(['/profile/' + this.roleValue ]);
      }, 1200);
    }
  });
  }

  checkEmail() {
    const email = this.form.get('email').value
    this.authService.checkEmail(email)
      .subscribe(data => {
        if (!data.success) {
          this.emailValid = false;
          this.emailMessage = data.message;
        } else {
          this.emailValid = true;
          this.emailMessage = data.message;
        }
      });
    }


  ngOnInit() {
  }

}
