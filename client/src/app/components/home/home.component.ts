import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private cookieService: CookieService,private formBuilder: FormBuilder, public authService: AuthService, private router: Router) {
    this.createForm()
  }

  createForm() {
    this.emailForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ])]
    })
  }

  disableForm() {
    this.emailForm.controls['email'].disable();
  }

  enableForm(){
    this.emailForm.controls['email'].enable();
  }

  emailSubmit() {
    this.processing = true;
    this.disableForm();
    const email = {
    email: this.emailForm.get('email').value.trim(),
  }
    console.log('now submitting email:', email)
    this.authService.Email(email).subscribe(data => {
    if (!data.success) {
      this.messageClass = 'alert alert-danger';
      this.message = data.message;
      this.processing = false;
      this.enableForm();
    } else {
      this.messageClass = 'alert alert-success';
      this.message = data.message;
      this.authService.storeData(data.token, data.email);
      setTimeout(() => {
        this.router.navigate(['/profile'])
      }, 1200)
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

  closeInitialModel() {
    this.cookies = true;
  }


  ngOnInit(): void {
    this.checkCookies();
  }
}
