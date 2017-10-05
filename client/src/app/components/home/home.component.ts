import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cookieValue = 'UNKNOWN';
  cookies = false;
  emailForm;
  message;
  messageClass;
  processing = false;
  emailValid;
  emailMessage;

  constructor(private cookieService: CookieService,private formBuilder: FormBuilder, public authService: AuthService, public apiService: ApiService, private router: Router) {
    this.createForm()
  }

  createForm() {
    this.emailForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
      ])]
    })
  }

  disableForm() {
    this.emailForm.controls['email'].disable();
  }

  enableForm(){
    this.emailForm.controls['email'].enable();
  }

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

  emailSubmit() {
    this.closeInitialModal();
    this.onEmailSubmit();
  }

  onEmailSubmit() {
    this.processing = true;
    this.disableForm();
    const emailSubscriber = {
      email: this.emailForm.get('email').value.trim(),
    }
    console.log('now submitting email:', emailSubscriber)
    this.apiService.Email(emailSubscriber).subscribe(data => {
    if (!data.success) {
      this.messageClass = 'alert alert-danger';
      this.message = data.message;
      this.processing = false;
      this.enableForm();
    } else {
      this.messageClass = 'alert alert-success';
      this.message = data.message;

    }
  });
  }

  checkEmail() {
    const emailSubscriber = this.emailForm.get('email').value
    this.authService.checkEmailSubscriber(emailSubscriber)
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

// Initial Modal

  checkCookies() {
      this.cookieValue = this.cookieService.get('Skillz');
      if(this.cookieValue == "Here, have some cookies!") {
        return true
      }
      setTimeout(() => {
        this.cookieService.set( 'Skillz', 'Here, have some cookies!' );
        return false
      },120000)
  }

  closeInitialModal() {
    this.cookies = true;
    this.cookieService.set( 'Skillz', 'Here, have some cookies!' );
    this.checkCookies();
  }


  ngOnInit(): void {
    this.checkCookies();
  }
}
