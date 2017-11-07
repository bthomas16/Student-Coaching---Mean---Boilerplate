import { Component, OnInit} from '@angular/core';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  message;
  messageClass;
  canShowRegisterModal: boolean = false;
  canShowLoginModal: boolean = false;

  constructor(public apiService: ApiService) {
  }

  showRegisterModal() {
    if(!this.canShowRegisterModal) {
    this.canShowRegisterModal = true;
    let value = this.canShowRegisterModal;
    this.apiService.registerModal(value);
    }
  }

  hideRegisterModal() {
    if(this.canShowRegisterModal) {
    this.canShowRegisterModal = false;
    let value = this.canShowRegisterModal;
    this.apiService.registerModal(value);
    }
  }

  getResgisterModalStatus() {
    if(this.apiService.getRegisterModalStatus()) {
        this.canShowRegisterModal = true;
      } else {
        this.canShowRegisterModal = false;
      }
  }

  showLoginModal() {
    console.log('hit')
    if(!this.canShowLoginModal) {
    this.canShowLoginModal = true;
    let value = this.canShowLoginModal;
    this.apiService.loginModal(value);
    }
  }

  hideLoginModal() {
    if(this.canShowLoginModal) {
    this.canShowLoginModal = false;
    let value = this.canShowLoginModal;
    this.apiService.loginModal(value);
    }
  }

  getLoginModalStatus() {
    if(this.getLoginModalStatus()) {
        this.canShowLoginModal = true;
      } else {
        this.canShowLoginModal = false;
      }
  }

  switchForm() {
    if(this.canShowLoginModal){
      // this.canShowRegisterModal = false;
      // this.canShowLoginModal = false;
      this.hideLoginModal();
      this.showRegisterModal();
      return true;
    }
    this.hideRegisterModal();
    this.showLoginModal();
  }

  ngAfterContentChecked() {
    this.canShowRegisterModal = this.apiService.getRegisterModalStatus();
    this.canShowLoginModal = this.apiService.getLoginModalStatus();
  }

  ngOnInit() {
    // this.getResgisterModalStatus();
  }

}
