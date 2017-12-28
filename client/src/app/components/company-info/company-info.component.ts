import { Component, OnInit, trigger, state, transition, style, animate } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css'],
  animations: [
    trigger('modalFade', [
      state('normal', style({transform: 'translateY(-10%)', opacity: 0, transition: 'all .5s ease-in-out', visibility: 'hidden'
      })),
      state('fadein', style({transform: 'translateY(15%)', transition: 'all .5s ease-in-out',
      opacity: 1
      })),
    ]),
    trigger('greyFade', [
      state('normal', style({opacity: 0, transition: 'all .5s ease-in-out',
      })),
      state('fadein', style({transition: 'all .5s ease-in-out',
      opacity: 1,
      })),
      transition('* <=> *', animate(600))
    ])
  ]
})
export class CompanyInfoComponent implements OnInit {
  loginState = "normal";
  registerState = "normal";

  constructor(public apiService: ApiService) {
    this.registerState =  'normal';
    this.loginState = 'normal';
   }

  animateRegister() {
    this.loginState = 'normal';
    this.registerState === 'normal' ? this.registerState = 'registerFadein' : this.registerState = 'normal'

    let value = this.registerState;
    this.apiService.registerModal(value);
  }

  animateLogin() {
    this.registerState = 'normal';
    this.loginState === 'normal' ? this.loginState = 'loginFadein' : this.loginState = 'normal'
    let value = this.loginState;
    this.apiService.loginModal(value)
  }

  switchForm() {
    if(this.loginState === 'normal') {
      // this.animateLogin();
      this.loginState = 'loginFadein';
      this.registerState = 'normal';
      let loginValue = this.loginState;
      let registerValue = this.registerState;
      this.apiService.registerModal(registerValue);
      this.apiService.loginModal(loginValue);
      console.log('yooo', this.loginState, this.registerState)
      return true;
    }
    // this.animateRegister();
    this.loginState = 'normal';
    this.registerState = 'registerFadein';
    let loginValue = this.loginState;
    let registerValue = this.registerState;
    this.apiService.loginModal(loginValue);
    this.apiService.registerModal(registerValue);
    console.log('yo111', this.loginState, this.registerState)
    return true;
  }

  ngAfterContentChecked() {
    this.registerState = this.apiService.getRegisterModalStatus();
    this.loginState = this.apiService.getLoginModalStatus();
  }

  ngOnInit() {
    window.scrollTo(0, 0)
  }

}
