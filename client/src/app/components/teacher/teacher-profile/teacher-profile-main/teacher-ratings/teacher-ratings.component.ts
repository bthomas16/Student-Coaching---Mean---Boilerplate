import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
import { ActivatedRoute } from '@angular/router'
import { NgForm } from '@angular/forms';

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
  yetRated;
  id;
  fullname;
  email;
  location;


  teacherFullname;


  constructor(public authService: AuthService, private route: ActivatedRoute) {
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
        this.processing = false;
        setTimeout(()=> {
          this.okRate = false;
        }, 1400);
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
    let viewTeacherID = params['id'];
       this.authService.getTeacherView(viewTeacherID).subscribe(viewTeacher => {
        //  this.userID = viewTeacher.teacher.id;
         this.teacherFullname = viewTeacher.teacher.fullname.toUpperCase();
          //  this.email =viewTeacher.teacher.email;
          //  this.isStudent =viewTeacher.teacher.isStudent;
          //  this.isTeacher =viewTeacher.teacher.isTeacher;
          //  this.location =viewTeacher.teacher.location;
          //  this.yrsExperience =viewTeacher.teacher.yrsExperience;
          //  this.skills =viewTeacher.teacher.skills;
          //  this.handicap =viewTeacher.teacher.handicap;
          //  this.cost =viewTeacher.teacher.cost;
          //  if(viewTeacher.teacher.kRatingsArray.length == 0 ||viewTeacher.teacher.pRatingsArray.length == 0 ||viewTeacher.teacher.taRatingsArray.length == 0) {
          //    return null;
          //  } else {
          //    this.yetRated = true;
          //    this.avgKnowledgeRating =viewTeacher.teacher.kRatingsArray.reduce((a, b) => a + b)/viewTeacher.teacher.kRatingsArray.length;
          //    this.avgProfessionalismRating =viewTeacher.teacher.pRatingsArray.reduce((a, b) => a + b)/viewTeacher.teacher.pRatingsArray.length;
          //    this.avgTeachingAbilityRating =viewTeacher.teacher.taRatingsArray.reduce((a, b) => a + b)/viewTeacher.teacher.taRatingsArray.length;
          //    this.avgRating = (this.avgKnowledgeRating + this.avgProfessionalismRating + this.avgTeachingAbilityRating)/3;
          //    this.numberOfRatings =viewTeacher.teacher.kRatingsArray.length;
          //    if(this.avgRating >= 4.5) {
          //      this.isChecked5 = true;
          //    } else {
          //      if(this.avgRating >= 3.5) {
          //        this.isChecked4 = true;
          //      } else {
          //        if(this.avgRating >= 2.5) {
          //          this.isChecked3 = true;
          //        } else {
          //          if(this.avgRating >= 1.5) {
          //            this.isChecked2 = true;
          //          } else {
          //            if(this.avgRating >= 0.5) {
          //              this.isChecked1 = true;
          //            }
          //          }
          //        }
          //      }
          //    }
          //  }
           return true
         });
     });
    this.authService.getProfile().subscribe(profile => {
      this.fullname = profile.user.fullname.toUpperCase();
      this.email = profile.user.email;
    });
  }


}
