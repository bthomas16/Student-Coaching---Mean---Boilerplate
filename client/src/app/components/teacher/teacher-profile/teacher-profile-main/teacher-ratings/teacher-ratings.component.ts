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
  kRating: number;
  pRating: number;
  taRating: number;
  text;
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
  beingRatedId;


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

getText(event) {
  this.text = event.target.value
  // return this.text
}

  rate() {
    this.processing = true;
    const rated = {
      beingRatedId: this.beingRatedId,
      kRatings: this.kRating,
      pRatings: this.pRating,
      taRatings: this.taRating,
      text: this.text,
      author: this.fullname
    }
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
         this.teacherFullname = viewTeacher.teacher.fullname.toUpperCase();
         this.beingRatedId = viewTeacher.teacher._id
         });
     });
    this.authService.getProfile().subscribe(profile => {
      this.fullname = profile.user.fullname;
      this.email = profile.user.email;
    });
  }

}
