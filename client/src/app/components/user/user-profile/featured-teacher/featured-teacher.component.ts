import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';


@Component({
  selector: 'app-featured-teacher',
  templateUrl: './featured-teacher.component.html',
  styleUrls: ['./featured-teacher.component.css']
})
export class FeaturedTeacherComponent implements OnInit {
  featuredTeacherId;
  featuredFullname;
  featuredEmail;
  location;
  yrsExperience;
  id;
  skills;
  handicap;
  cost;
  profPic;
  allTeacher;
  bio: String = '';
  route: String;

  isEdit: boolean = false;
  isChecked1: boolean = false;
  isChecked2: boolean = false;
  isChecked3: boolean = false;
  isChecked4: boolean = false;
  isChecked5: boolean = false;

  avgKnowledgeRating: number;
  avgProfessionalismRating: number;
  avgTeachingAbilityRating: number;
  avgRating: number;
  numberOfRatings: number;
  yetRated: boolean = false;

  constructor(public authService: AuthService) {
   }

  ngOnInit() {
    this.authService.getFeaturedTeacher()
      .subscribe(featured => {
        this.allTeacher = featured.teacher[0];
        this.featuredTeacherId = featured.teacher._id;
        this.route = "../view-teacher-profile/" + this.featuredTeacherId;
        this.featuredFullname = featured.teacher.fullname.toUpperCase();
        this.featuredEmail = featured.teacher.email;
        this.location = featured.teacher.location;
        this.yrsExperience = featured.teacher.yrsExperience;
        this.skills = featured.teacher.skills;
        this.handicap = featured.teacher.handicap;
        this.cost = featured.teacher.cost;
        this.bio = featured.teacher.bio;
        if(featured.teacher.kRatingsArray.length == 0 || featured.teacher.pRatingsArray.length == 0 || featured.teacher.taRatingsArray.length == 0) {
          return null;
        } else {
        this.yetRated = true;
        this.avgKnowledgeRating = featured.teacher.kRatingsArray.reduce((a, b) => a + b)/featured.teacher.kRatingsArray.length;
        this.avgProfessionalismRating = featured.teacher.pRatingsArray.reduce((a, b) => a + b)/featured.teacher.pRatingsArray.length;
        this.avgTeachingAbilityRating = featured.teacher.taRatingsArray.reduce((a, b) => a + b)/featured.teacher.taRatingsArray.length;
        this.avgRating = (this.avgKnowledgeRating + this.avgProfessionalismRating + this.avgTeachingAbilityRating)/3;
        this.numberOfRatings = featured.teacher.kRatingsArray.length;
        if(this.avgRating >= 4.5) {
          this.isChecked5 = true;
        } else {
          if(this.avgRating >= 3.5) {
            this.isChecked4 = true;
          } else {
            if(this.avgRating >= 2.5) {
              this.isChecked3 = true;
            } else {
              if(this.avgRating >= 1.5) {
                this.isChecked2 = true;
              } else {
                if(this.avgRating >= 0.5) {
                  this.isChecked1 = true;
                }
              }
            }
          }
        }
      }
      });
    }

  }
