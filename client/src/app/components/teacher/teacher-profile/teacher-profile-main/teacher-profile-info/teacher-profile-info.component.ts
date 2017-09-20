import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-teacher-profile-info',
  templateUrl: './teacher-profile-info.component.html',
  styleUrls: ['./teacher-profile-info.component.css']
})
export class TeacherProfileInfoComponent implements OnInit {
  infoForm;
  message;
  messageClass;
  userID;
  fullname;
  email;
  isStudent;
  isTeacher;
  location;
  yrsExperience;
  skills;
  handicap;
  cost;
  isEdit: boolean = false;

  avgKnowledgeRating: number;
  avgProfessionalismRating: number;
  avgTeachingAbilityRating: number;
  avgRating: number;
  numberOfRatings: number;
  yetRated: boolean = false;


  constructor(public authService: AuthService, private formBuilder: FormBuilder) {
    this.location = '';
    this.createForm();
  }


  createForm(){
    this.infoForm = this.formBuilder.group({
      location: ['', Validators.required],
      yrsExperience: ['', Validators.required],
      skills: ['', Validators.required],
      handicap: ['', Validators.required],
      cost: ['', Validators.required]
    });
  }

  canEdit() {
    this.infoForm.reset();
    this.isEdit = false;
  }

  infoSubmit() {
    this.location = this.infoForm.get('location').value.trim(),
    this.yrsExperience = this.infoForm.get('yrsExperience').value,
    this.skills = this.infoForm.get('skills').value.trim(),
    this.handicap = this.infoForm.get('handicap').value,
    this.cost = this.infoForm.get('cost').value
    const info = {
      location: this.location,
      yrsExperience: this.yrsExperience,
      skills: this.skills,
      handicap: this.handicap,
      cost: this.cost
    }
    console.log('experience is:', info);
    this.authService.onInfoSubmit(info).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.isEdit = true;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.isEdit = false;
      }
    })
  }




  ngOnInit() {
    this.authService.getProfile()
    .subscribe(profile => {
      this.userID = profile.user.id;
      this.fullname = profile.user.fullname.toUpperCase();
      this.email = profile.user.email;
      this.isStudent = profile.user.isStudent;
      this.isTeacher = profile.user.isTeacher;
      this.location = profile.user.location;
      this.yrsExperience = profile.user.yrsExperience;
      this.skills = profile.user.skills;
      this.handicap = profile.user.handicap;
      this.cost = profile.user.cost;
      if(profile.user.kRatingsArray.length == 0 || profile.user.pRatingsArray.length == 0 || profile.user.taRatingsArray.length == 0) {
        return null;
      } else {
      this.yetRated = true;
      this.avgKnowledgeRating = profile.user.kRatingsArray.reduce((a, b) => a + b)/profile.user.kRatingsArray.length;
      this.avgProfessionalismRating = profile.user.pRatingsArray.reduce((a, b) => a + b)/profile.user.pRatingsArray.length;
      this.avgTeachingAbilityRating = profile.user.taRatingsArray.reduce((a, b) => a + b)/profile.user.taRatingsArray.length;
      this.avgRating = (this.avgKnowledgeRating + this.avgProfessionalismRating + this.avgTeachingAbilityRating)/3;
      this.numberOfRatings = profile.user.kRatingsArray.length;
      }
    });
  }
}
