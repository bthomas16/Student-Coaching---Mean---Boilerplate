import { Component, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, DoCheck {
  canRate;
  emailForm;
  message;
  messageClass;
  processing = false;
  emailValid;
  emailMessage;
  show: boolean = false;
  isLoggedIn:boolean = false;
  isTeacher:boolean = false;
  isStudent: boolean = false;

  constructor(private formBuilder: FormBuilder, public apiService: ApiService, public authService: AuthService) {
    this.createForm()
  }

  closeRating(){
    this.canRate = false;
    this.apiService.closeRating(this.canRate)
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
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 1200)
    } else {
      this.messageClass = 'alert alert-success';
      this.message = data.message;
      this.processing = true;
      this.emailForm.reset();
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 1200)
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

    ngDoCheck() {
      this.isLoggedIn = this.authService.loggedIn();
    }

  ngOnInit() {
    this.isLoggedIn = this.authService.loggedIn();
    this.authService.getProfile().subscribe(data => {
      if(!data.user) {
        return false;
      }
      this.isTeacher = data.user.isTeacher;
      this.isStudent = data.user.isStudent;
    })
  }

}
