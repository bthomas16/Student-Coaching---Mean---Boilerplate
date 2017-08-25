import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  form: FormGroup;
  message;
  messageClass;
  processing = false;
  emailValid;
  emailMessage;
  studentClick = false;
  teacherClick = false;


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
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
      isStudent: [''],
      isTeacher: ['']
    })
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

// Function to check if an account was selected
    // isAccountSelected() {
    //   if (this.studentClick == false && this.teacherClick == false) {
    //     this.accountSelected = false
    //   } else {
    //       this.accountSelected = true
    //     }
    //   }

  studentClickHandler(event) {
    // this.studentClick = true;
    if (this.studentClick == true) {
      this.studentClick = false;
      event.target.classList.remove('active')
      console.log(this.studentClick)
    } else {
      if (this.studentClick == false) {
      this.studentClick = true;
      event.target.classList.add('active')
      console.log(this.studentClick)
    }
  }
}

teacherClickHandler(event) {
  // this.studentClick = true;
  if (this.teacherClick == true) {
    this.teacherClick = false;
    event.target.classList.remove('active')
    console.log(this.teacherClick)
  } else {
    if (this.teacherClick == false) {
    this.teacherClick = true;
    event.target.classList.add('active')
    console.log(this.teacherClick)
  }
}
}


  onRegisterSubmit() {
    this.processing = true;
    this.disableForm();
    const user = {
    fullname: this.form.get('fullname').value,
    email: this.form.get('email').value.toLowerCase(),
    password: this.form.get('password').value,
    isStudent: this.studentClick,
    isTeacher: this.teacherClick
    }
    console.log('trying to submit:', user)
    this.authService.Register(user).subscribe(data => {
    if (!data.success) {
      this.messageClass = 'alert alert-danger';
      this.message = data.message;
      this.processing = false;
      this.enableForm();
    } else {
      this.messageClass = 'alert alert-success'
      this.message = data.message
      setTimeout(() => {
        this.router.navigate(['/login'])
      }, 1400)
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
