import { Component, OnInit, AfterContentChecked } from '@angular/core';
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
  canShowRegisterModal;
  canShowLoginModal;

  constructor(public authService: AuthService, public apiService: ApiService, private router: Router, private flashMessagesService: FlashMessagesService) { }

  closeRating(){
    this.canRate = false;
    this.apiService.closeRating(this.canRate)
  }

  onLogoutClick() {
    this.changeMenuFalse()
    this.authService.Logout();
    this.flashMessagesService.grayOut(true);
    this.flashMessagesService.show('Logged Out', { cssClass: 'alert-info form-control' });
      this.router.navigate(['/'])
  }

  ngAfterContentChecked() {
    this.showMenu = this.apiService.getMenuStatus();
  }

  changeMenuTrue() {
    this.showMenu = true;
    this.apiService.changeMenuTrue(this.showMenu);
  }

  changeMenuFalse() {
    this.showMenu = false;
    this.apiService.changeMenuFalse(this.showMenu);
  }

  registerModal() {
    if(this.canShowLoginModal = true) {
      let valueFalse = false;
      this.apiService.loginModal(valueFalse)
    }
    let value = true;
    this.apiService.registerModal(value);
  }

  loginModal() {
    if(this.canShowRegisterModal = true) {
      let valueFalse = false;
      this.apiService.registerModal(valueFalse)
    }
    let value = true;
    this.apiService.loginModal(value);
  }

  hideModal() {
    if(this.canShowLoginModal === true) {
      let value = false;
      this.apiService.loginModal(value);
    }
    if(this.canShowRegisterModal === true) {
      let value = false;
      this.apiService.registerModal(value);
    }

  }

  ngOnInit() {
    this.canShowLoginModal = this.apiService.getLoginModalStatus();
    this.canShowRegisterModal = this.apiService.getRegisterModalStatus();
  }

}
