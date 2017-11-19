import { Component, OnInit, AfterContentChecked, trigger, state, transition, style, animate} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('modalFade', [
      state('normal', style({display: 'none', transition: 'all .5s ease-in-out',
      opacity: 0
      })),
      state('fadein', style({display: 'block', transition: 'all .5s ease-in-out',
      opacity: 1
      })),
      transition('normal <=> fadein', animate(500))
      ])
    ]
  }
)

export class HomeComponent implements OnInit, AfterContentChecked {
  cookieValue = 'UNKNOWN';
  cookies: boolean = false;
  emailForm;
  message;
  messageClass;
  processing = false;
  emailValid;
  emailMessage;
  canShowRegisterModal;
  canShowLoginModal;

  isLoading: boolean = true;
  state = 'normal';

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
    this.animate()
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
        this.state = "normal";
        return true
      }
        this.cookieService.set( 'Skillz', 'Here, have some cookies!' );
        this.state = "fadein";
        return false
  }

  animate() {
    console.log('sop')
    this.state == "normal" ? this.state = 'fadein' : this.state = 'normal'
    this.cookieService.set( 'Skillz', 'Here, have some cookies!' );
  }


  ngAfterContentChecked() {
  }


  ngOnInit(): void {
    window.scrollTo(0, 0);
    // this.checkCookies();
    setTimeout(() => {
      this.isLoading = false;
    }, 600);
    setTimeout(() => {
      this.checkCookies()
    }, 2500);
  }
}
