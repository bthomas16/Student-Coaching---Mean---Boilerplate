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

  // @Input('showMenu') showMenu;
  showMenu: boolean = false;

  constructor(public authService: AuthService, public apiService: ApiService, private router: Router, private flashMessagesService: FlashMessagesService) { }

  onLogoutClick() {
    this.changeMenuFalse()
    this.authService.Logout();
    this.flashMessagesService.grayOut(true);
    this.flashMessagesService.show('Logged Out', { cssClass: 'alert-info form-control' });
      this.router.navigate(['/'])
  }

  ngAfterContentChecked() {
    this.showMenu = this.apiService.getMenuStatus();
    console.log(this.apiService.getMenuStatus(), "this be th ish")
  }

  changeMenuTrue() {
    this.showMenu = true;
    this.apiService.changeMenuTrue(this.showMenu);
  }

  changeMenuFalse() {
    this.showMenu = false;
    this.apiService.changeMenuFalse(this.showMenu);
  }

  // canShowMenu() {
  //   if(this.showMenu === false) {
  //     return this.showMenu = true
  //   } else
  //   return this.showMenu = false;
  // }

  ngOnInit() {
  }

}
