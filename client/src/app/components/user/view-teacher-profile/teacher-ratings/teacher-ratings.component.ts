import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ApiService } from '../../../../services/api.service';
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
  processing: boolean = false;
  sum: number = 0;
  canRate: boolean = false;
  ratedK: boolean = false;
  ratedP: boolean = false;
  ratedTA: boolean = false;
  text;
  message;
  messageClass;
  yetRated;
  id;
  fullname;
  email;
  location;
  beingRatedId;
  teacherFullname;


  constructor(public authService: AuthService, public apiService: ApiService, private route: ActivatedRoute) {
  }

    onKnowledgeRated(knowledgeRatedData: {knowledgeRating: number}) {
      this.kRating = knowledgeRatedData.knowledgeRating
      this.ratedK = true;
    }
    onProfessionalismRated(professionalismRatedData: {professionalismRating: number}) {
      this.pRating = professionalismRatedData.professionalismRating
      this.ratedP = true;
    }
    onTeachingAbilityRated(teachingAbilityRatedData: {teachingAbilityRating: number}) {
      this.taRating = teachingAbilityRatedData.teachingAbilityRating
      this.ratedTA = true;
    }

getText(event) {
  this.text = event.target.value
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
          this.closeRating();
        }, 1400);
      }
    });
  }

  closeRating(){
    this.canRate = false;
    this.apiService.closeRating(this.canRate)
  }

  // openRating(){
  //   this.canRate = true;
  //   this.apiService.openRating(this.canRate)
  // }
  //
  // ngAfterContentChecked(){
  //   return this.apiService.getRatingStatus();
  // }


  ngOnInit() {
    this.route.params.subscribe(params => {
    let viewTeacherID = params['id'];
       this.authService.getTeacherView(viewTeacherID).subscribe(viewTeacher => {
         this.teacherFullname = viewTeacher.teacher.fullname;
         this.teacherFullname = this.teacherFullname.charAt(0).toUpperCase() + this.teacherFullname.slice(1) 
         this.beingRatedId = viewTeacher.teacher._id
         });
     });
    this.authService.getProfile().subscribe(profile => {
      this.fullname = profile.user.fullname;

      this.email = profile.user.email;
    });
  }

}
