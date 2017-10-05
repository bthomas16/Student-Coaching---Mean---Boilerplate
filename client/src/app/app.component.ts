import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private apiService: ApiService){

  }


  changeMenu() {
    let showMenu = true;
    this.apiService.changeMenuFalse(showMenu);
  }
}
