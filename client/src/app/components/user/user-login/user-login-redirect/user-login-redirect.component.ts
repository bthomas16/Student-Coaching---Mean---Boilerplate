import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-login-redirect',
  templateUrl: './user-login-redirect.component.html',
  styleUrls: ['./user-login-redirect.component.css']
})
export class UserLoginRedirectComponent implements OnInit {
  showModal: boolean = true;

  constructor() { }

  isShowModal() {
    console.log(this.showModal)
    this.showModal = false;
  }

  ngOnInit() {
  }

}
