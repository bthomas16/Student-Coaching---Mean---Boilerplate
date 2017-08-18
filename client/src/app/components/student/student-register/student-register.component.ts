import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {
  studentRegisterForm: FormGroup;
  message;
  messageClass;
  processing = false;
  emailValid;
  emailMessage;


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.createForm()
  }

  createForm() {
    this.studentRegisterForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
      ])],
      firstname: ['', Validators.compose([
        Validators.required,
        this.validateFirstname
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5)
        // this.validatePassword
      ])],
      confirm: ['', Validators.required]
    }, { validator: this.matchingPasswords('password', 'confirm')})
  }

  disableForm() {
    this.studentRegisterForm.controls['firstname'].disable();
    this.studentRegisterForm.controls['email'].disable();
    this.studentRegisterForm.controls['password'].disable();
    this.studentRegisterForm.controls['confirm'].disable();
  }

  enableForm(){
    this.studentRegisterForm.controls['firstname'].enable();
    this.studentRegisterForm.controls['email'].enable();
    this.studentRegisterForm.controls['password'].enable();
    this.studentRegisterForm.controls['confirm'].enable();
  }

// Only a-z letters
  validateFirstname(controls){
    const regExp = new RegExp(/^[a-zA-Z]+$/)
    if(regExp.test(controls.value)) {
      return null;
    } else {
      return {
        'validateFirstname': true
      }
    }
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

  // Funciton to ensure passwords match
    matchingPasswords(password, confirm) {
      return (group: FormGroup) => {
        // Check if both fields are the same
        if (group.controls[password].value === group.controls[confirm].value) {
          return null; // Return as a match
        } else {
          return { 'matchingPasswords': true } // Return as error: do not match
        }
      }
    }

// Must contain 1 letter and 1 number
  // validatePassword(controls){
  //   const regExp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
  //   if(regExp.test(controls.value)) {
  //     return null;
  //   } else {
  //     return {
  //       'validateEmail': true
  //     }
  //   }
  // }

  onRegisterSubmit() {
    this.processing = true;
    this.disableForm();
    const student = {
    firstname: this.studentRegisterForm.get('firstname').value,
      email: this.studentRegisterForm.get('email').value,
    password: this.studentRegisterForm.get('password').value
    }
    this.authService.registerStudent(student).subscribe(data => {
    if (!data.success) {
      this.messageClass = 'alert alert-danger';
      this.message = data.message;
      this.processing = false;
      this.enableForm();
    } else {
      this.messageClass = 'alert alert-success'
      this.message = data.message
      setTimeout(() => {
        this.router.navigate(['/student/profile'])
      }, 2200)
    }
  });
  }

  checkEmail() {
    const email = this.studentRegisterForm.get('email').value
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
