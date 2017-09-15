import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../../../../services/auth.service';

@Component({
  selector: 'app-professionalism',
  templateUrl: './professionalism.component.html',
  styleUrls: ['./professionalism.component.css']
})
export class ProfessionalismComponent implements OnInit {
  pRatings: any[];
  pRating: number;
  avgProfessionalismRating: number;
  processing: boolean = false;
  showPRating: boolean = false;
  sum: number = 0;
  message;
  messageClass;

  @Output() professionalismRated = new EventEmitter<{ professionalismRating: number} >();


  constructor(public authService: AuthService) {

  }

    //Professionalism Rating

    pfive() {
      this.pRating = 5;
      this.showPRating = true;
      this.professionalismRated.emit({
        professionalismRating: this.pRating
      });
    }

    pfourhalf() {
      this.pRating = 4.5;
      this.showPRating = true;
      this.professionalismRated.emit({
        professionalismRating: this.pRating
      });
    }

    pfour() {
      this.pRating = 4;
      this.showPRating = true;
      this.professionalismRated.emit({
        professionalismRating: this.pRating
      });
    }

    pthreehalf() {
      this.pRating = 3.5;
      this.showPRating = true;
      this.professionalismRated.emit({
        professionalismRating: this.pRating
      });
    }

    pthree() {
      this.pRating = 3;
      this.showPRating = true;
      this.professionalismRated.emit({
        professionalismRating: this.pRating
      });
    }

    ptwohalf() {
      this.pRating = 2.5;
      this.showPRating = true;
      this.professionalismRated.emit({
        professionalismRating: this.pRating
      });
    }

    ptwo() {
      this.pRating = 2;
      this.showPRating = true;
      this.professionalismRated.emit({
        professionalismRating: this.pRating
      });
    }

    ponehalf() {
      this.pRating = 1.5;
      this.showPRating = true;
      this.professionalismRated.emit({
        professionalismRating: this.pRating
      });
    }

    pone() {
      this.pRating = 1;
      this.showPRating = true;
      this.professionalismRated.emit({
        professionalismRating: this.pRating
      });
    }

    phalf() {
      this.pRating = 0.5;
      this.showPRating = true;
      this.professionalismRated.emit({
        professionalismRating: this.pRating
      });
    }

  ngOnInit() {
  }

}
