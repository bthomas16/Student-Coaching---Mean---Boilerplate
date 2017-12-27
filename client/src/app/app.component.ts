import { Component} from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";
// import {GoogleAnalyticsEventsService} from "./services/google-analytics-events/google-analytics-events.service";
import { ApiService } from './services/api.service';
import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routerTransition', [
      transition('* <=> *', [
    /* order */
    // /* 1 */ query(':enter, :leave', style({ position: 'fixed', width:'100%' }), { optional: true }),
            query('.option', style({ opacity: 0 }) , { optional: true }),
    /* 2 */ group([  // block executes in parallel
            query(':enter', [style({ transform: 'translateX(100%)' }),animate('0.75s ease-in-out', style({ transform: 'translateX(0%)' }))], { optional: true }),
            query(':leave', [style({ transform: 'translateX(0%)' }), animate('0.75s ease-in-out', style({ transform: 'translateX(-100%)' }),
          )], { optional: true }),

        ]),
        query(':enter .option', stagger(400, [
          style({ transform: 'translateY(100px)' }),
          animate('1s ease-in-out',
          style({ transform: 'translateY(0px)', opacity: 1 })),
      ]), { optional: true }),
      ])
     ])
    ]
  })

export class AppComponent {
  title = 'app';

  constructor(private apiService: ApiService, public router: Router){

  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

// submit() {
//   this.googleAnalyticsEventsService.emitEvent("testCategory", "testAction", "testLabel", 10);
// }


  changeMenu() {
    let showMenu = true;
    this.apiService.changeMenuFalse(showMenu);
  }
}
