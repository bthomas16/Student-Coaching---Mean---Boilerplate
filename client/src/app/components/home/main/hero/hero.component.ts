import { Component, OnInit, trigger, state, transition, style, animate} from '@angular/core';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  animations: [
    trigger('modalLoginFade', [
      state('normal', style({display: 'none', transition: 'all .5s ease-in-out',
      opacity: 0
      })),
      state('loginFadein', style({display: 'block', transition: 'all .5s ease-in-out',
      opacity: 1
      })),
      transition('normal <=> *', animate(350)),
    ]),
    trigger('modalRegisterFade', [
      state('normal', style({display: 'none', transition: 'all .5s ease-in-out',
      opacity: 0
      })),
      state('registerFadein', style({display: 'block', transition: 'all .5s ease-in-out',
      opacity: 1
      })),
      transition('normal <=> *', animate(350))
    ])
  ]
})
export class HeroComponent implements OnInit {
  loginState = "normal";
  registerState = "normal";
  message;
  messageClass;

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
  }

}
