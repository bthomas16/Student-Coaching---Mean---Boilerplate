import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import { AuthGuard } from '../../../guards/auth.guard';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
message;
messageClass;
processing = false;
form;
previousUrl;
dataDismissAttribute = '';

  constructor (private formBuilder: FormBuilder, public authService: AuthService, private router: Router, private authGuard: AuthGuard, private apiService: ApiService) {
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

// loginSubmit() {
//   this.dataDismissAttribute="modal"
//   console.log(this.dataDismissAttribute)
//   setTimeout(() => {
//     this.onLoginSubmit();
//   }, 1);
// }

onLoginSubmit() {
  this.processing = true;
  this.disableForm();
  const user = {
    email: this.form.get('email').value.trim(),
    password: this.form.get('password').value.trim()
  }
  this.authService.Login(user).subscribe(data => {
    if(!data.success) {
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
        if (this.previousUrl) {
          this.router.navigate([this.previousUrl])
        } else {
        this.router.navigate(['/profile/'])
        }
      }, 1200)
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
    window.scrollTo(0, 0);
  }

}
