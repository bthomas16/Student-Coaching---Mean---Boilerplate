import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-teacher-ratings',
  templateUrl: './teacher-ratings.component.html',
  styleUrls: ['./teacher-ratings.component.css'],
})

export class TeacherRatingsComponent implements OnInit {
  kRatings: Array<number> = [];
  pRatings: Array<number> = [];
  taRatings: Array<number> = [];
  kRating: number;
  pRating: number;
  taRating: number;
  avgKnowledgeRating: number;
  avgProfessionalismRating: number;
  avgTeachingAbilityRating: number;
  processing: boolean = false;
  processing2: boolean = false;
  showKRating: boolean = false;
  showPRating: boolean = false;
  showTARating: boolean = false;
  sum: number = 0;
  okRate: boolean = false;
  ratedK: boolean = false;
  ratedP: boolean = false;
  ratedTA: boolean = false;
  message;
  messageClass;


  constructor(public authService: AuthService) {
  }

    canRate() {
      if(this.okRate === false) {
        setTimeout(() => {
          this.okRate = true;
          return true
        }, 200)
      } else {
        setTimeout(() => {
          this.ratedK = false;
          this.ratedP = false;
          this.ratedTA = false;
          this.okRate = false;
          return false
        }, 200)
      }
    }

    onKnowledgeRated(knowledgeRatedData: {knowledgeRating: number}) {
      this.kRating = knowledgeRatedData.knowledgeRating
      this.ratedK = true;
      console.log(this.kRating)
    }
    onProfessionalismRated(professionalismRatedData: {professionalismRating: number}) {
      this.pRating = professionalismRatedData.professionalismRating
      this.ratedP = true;
      console.log(this.pRating)
    }
    onTeachingAbilityRated(teachingAbilityRatedData: {teachingAbilityRating: number}) {
      this.taRating = teachingAbilityRatedData.teachingAbilityRating
      this.ratedTA = true;
      console.log(this.taRating)
    }


  rate() {
    this.processing = true;
    this.kRatings.push(this.kRating);
    this.pRatings.push(this.pRating);
    this.taRatings.push(this.taRating);
    const rated = {
      kRatingsArray: this.kRatings,
      pRatingsArray: this.pRatings,
      taRatingsArray: this.taRatings }
    this.authService.Rate(rated).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success'
        this.message = data.message
        this.getRating();
        this.processing = true;
        setTimeout(()=> {
          this.okRate = false;
        }, 1000);
      }
    });
  }

  getRating() {
    this.authService.onGetRating().subscribe(data => {
      this.kRatings = data.user.kRatingsArray;
      this.pRatings = data.user.pRatingsArray;
      this.taRatings = data.user.taRatingsArray;
      if(this.kRatings.length == 0 || this.pRatings.length == 0 || this.taRatings.length == 0) {
        return null;
      } else {
      this.avgKnowledgeRating = this.kRatings.reduce((a, b) => a + b)/this.kRatings.length;
      this.avgProfessionalismRating = this.pRatings.reduce((a, b) => a + b)/this.pRatings.length;
      this.avgTeachingAbilityRating = this.taRatings.reduce((a, b) => a + b)/this.taRatings.length;
      return true;
      }
    });
  }

  ngOnInit() {
    this.getRating();
  }


}
