import { Component, OnInit, AfterContentChecked, trigger, state, transition, style, animate} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterContentChecked {
  canRate;

  // @Input('showMenu') showMenu;
  showMenu: boolean = false;
  registerState;
  loginState;

  constructor(public authService: AuthService, public apiService: ApiService, private router: Router, private flashMessagesService: FlashMessagesService) { }

  closeRating(){
    this.canRate = false;
    this.apiService.closeRating(this.canRate)
  }

  onLogoutClick() {
    this.showMenu = !this.showMenu;
    this.changeMenuFalse()
    this.authService.Logout();
    this.flashMessagesService.grayOut(true);
    this.flashMessagesService.show('Logged Out', { cssClass: 'alert-info form-control' });
      this.router.navigate(['/'])
  }

  ngAfterContentChecked() {
    this.showMenu = this.apiService.getMenuStatus();
    this.canRate = this.apiService.getRatingStatus();
  }

  changeMenuTrue() {
    this.showMenu = true;
    this.apiService.changeMenuTrue(this.showMenu);
  }

  changeMenuFalse() {
    this.showMenu = false;
    this.apiService.changeMenuFalse(this.showMenu);
  }

  loginModal() {
    this.registerState = 'normal'
    let rvalue = this.registerState;
    this.apiService.registerModal(rvalue);
    if(this.loginState === 'normal') {
      this.loginState = 'loginFadein'
      let value = this.loginState;
      this.apiService.loginModal(value)
      console.log(value, 'is the loginModal status')
    }
    this.loginState = 'normal';
  }

  registerModal() {
    this.loginState = 'normal';
    let value = this.loginState;
    this.apiService.loginModal(value);
    console.log(value, 'is the loginModal status')
    if(this.registerState === 'normal') {
      this.registerState = 'registerFadein'
      let rvalue = this.registerState;
      this.apiService.registerModal(rvalue)
    }
    this.registerState = 'normal';
  }


  ngOnInit() {
    this.loginState = this.apiService.getLoginModalStatus();
    this.registerState = this.apiService.getRegisterModalStatus();
  }

}
