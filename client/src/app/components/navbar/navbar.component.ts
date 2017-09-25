import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // @Input('showMenu') showMenu;
  showMenu: boolean = false;

  constructor(public authService: AuthService, private router: Router, private flashMessagesService: FlashMessagesService) { }

  onLogoutClick() {
    this.showMenu = false;
    this.authService.Logout();
    this.flashMessagesService.grayOut(true);
    this.flashMessagesService.show('Logged Out', { cssClass: 'alert-info form-control' });
      this.router.navigate(['/'])
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
