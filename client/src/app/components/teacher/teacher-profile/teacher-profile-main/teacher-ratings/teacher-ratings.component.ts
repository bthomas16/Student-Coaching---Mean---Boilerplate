import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-teacher-ratings',
  templateUrl: './teacher-ratings.component.html',
  styleUrls: ['./teacher-ratings.component.css']
})
export class TeacherRatingsComponent implements OnInit {
  ratings: Array<number> = [];
  rating: number;
  average: number;
  processing: boolean = false;
  showRating: boolean = false;
  avgRating: number = 0;
  sum: number = 0;
  message;
  messageClass;


  constructor(public authService: AuthService) {}

  five() {
    this.rating = 5;
    this.showRating = true;
  }

  fourhalf() {
    this.rating = 4.5;
    this.showRating = true;
  }

  four() {
    this.rating = 4;
    this.showRating = true;
  }

  threehalf() {
    this.rating = 3.5;
    this.showRating = true;
  }

  three() {
    this.rating = 3;
    this.showRating = true;
  }

  twohalf() {
    this.rating = 2.5;
    this.showRating = true;
  }

  two() {
    this.rating = 2;
    this.showRating = true;
  }

  onehalf() {
    this.rating = 1.5;
    this.showRating = true;
  }

  one() {
    this.rating = 1;
    this.showRating = true;
  }

  half() {
    this.rating = 0.5;
    this.showRating = true;
  }

  rate() {
    this.processing = true;
    this.ratings.push(this.rating)
    console.log('Ratings Array:', this.ratings)
    const rated = { ratingsArray: this.ratings }
    this.authService.Rate(rated).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success'
        this.message = data.message
        this.getRating();
      }
    });
  }

  getRating() {
    this.authService.onGetRating().subscribe(data => {
      this.ratings = data.user.ratingsArray;
      console.log('omggg', this.ratings);
      // let ratingsArray = this.ratings.length;
      this.avgRating = this.ratings.reduce((a, b) => a + b)/this.ratings.length;
    });
  }

  ngOnInit() {
    this.getRating();
  }


}
