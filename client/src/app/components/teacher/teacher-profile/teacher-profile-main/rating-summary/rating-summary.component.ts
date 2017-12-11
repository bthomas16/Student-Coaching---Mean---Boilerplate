import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
import { ApiService } from '../../../../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rating-summary',
  templateUrl: './rating-summary.component.html',
  styleUrls: ['./rating-summary.component.css']
})
export class RatingSummaryComponent implements OnInit {
  kRating;
  pRating;
  taRating;
  isLoading: boolean = true;
  numberOfRatings: Number;

  constructor(public authService: AuthService, public apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
    let viewTeacherID = params['id'];
      if(viewTeacherID) {
         this.authService.getTeacherView(viewTeacherID).subscribe(viewTeacher => {
           if(viewTeacher.teacher.ratings !==0) {
          this.kRating = viewTeacher.teacher.avgKRatingArray.reduce((a, b) => a + b)/viewTeacher.teacher.avgKRatingArray.length;
          this.pRating = viewTeacher.teacher.avgPRatingArray.reduce((a, b) => a + b)/viewTeacher.teacher.avgPRatingArray.length;
          this.taRating = viewTeacher.teacher.avgTARatingArray.reduce((a, b) => a + b)/viewTeacher.teacher.avgTARatingArray.length;
          this.numberOfRatings = viewTeacher.teacher.avgRatingLength;
          }
         });
         setTimeout(() => {
           this.isLoading = false;
         }, 1000);
         return true;
       }
    this.authService.getProfile().subscribe(profile => {
      if(profile.user.ratings[0]) {
      this.kRating = profile.user.avgKRatingArray.reduce((a, b) => a + b)/profile.user.avgKRatingArray.length;
      this.pRating = profile.user.avgPRatingArray.reduce((a, b) => a + b)/profile.user.avgPRatingArray.length;
      this.taRating = profile.user.avgTARatingArray.reduce((a, b) => a + b)/profile.user.avgTARatingArray.length;
      this.numberOfRatings = profile.user.avgRatingLength;
      setTimeout(() => {
        this.isLoading = false;
        }, 600);
      }
    });
  });
    window.scrollTo(0, 0);
  }

}
