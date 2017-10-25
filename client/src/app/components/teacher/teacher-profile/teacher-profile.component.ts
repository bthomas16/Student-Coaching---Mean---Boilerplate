import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {
  email;
  message;
  messageClass;
  userID;
  fullname;
  isStudent;
  isTeacher: boolean = true;
  profPic;
  processing: boolean = false;
  show: boolean = false;
  edit: boolean = false;
  currentUrl;
  teacherID;
  isEdit: boolean = false;
  videoForm;
  videoUrl;
  bioForm;
  bio;
  isBioEdit: boolean = false;
  maxExperiences: boolean = false;
  experienceValue;
  experiences;


  constructor(public authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
    this.createVideoForm();
    this.createBioForm();
  }


  createVideoForm(){
    this.videoForm = this.formBuilder.group({
      videoLink: ['']
    });
  }

  createBioForm() {
    this.bioForm = this.formBuilder.group({
      bio: ['']
    });
  }

  bioFormSubmit() {
    this.bio = this.bioForm.get('bio').value;
    const bio = {
      bio: this.bio
    }
    this.authService.onBioFormSubmit(bio).subscribe(data => {
      if(!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.show = true;
        this.isBioEdit = false;
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.show = false
        }, 1200);
      }
    });
  }

  videoSubmit() {
    let videoLink = this.videoForm.get('videoLink').value.trim();
    const video = {
      video: videoLink
    }
    this.authService.onVideoSubmit(video).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.show = true;
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.show = false
        }, 1200);
      }
    });
  }

  becomeTeacherRegister() {
    this.isTeacher = true;
    this.processing = true;
    const user = { isTeacher: this.isTeacher}
    this.authService.updateTeacher(user).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success'
        this.message = data.message
        setTimeout(() => {
          this.show = false;
        }, 1400)
      }
    })
  }

  isUserTheTeacher() {
    if(this.teacherID == this.userID) {
      return false
    } else {
      return true;
    }
  }

  getNewExperience(event){
    this.experienceValue = event.target.value;
  }

  addExperience() {
    this.experiences.push(this.experienceValue);
    if(this.experiences.length >= 5) {
      this.maxExperiences = true;
    }
    this.experienceSubmit();
    this.experienceValue = '';
  }

  experienceSubmit() {
    let experiences = this.experiences;
    console.log(experiences, 'data being submitted');
    this.authService.onExperienceSubmit(experiences).subscribe(data => {
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

  clearExperience() {
    this.experiences = [];
    this.maxExperiences = false;
  }

  ngOnInit() {
    this.authService.getProfile()
    .subscribe(profile => {
      this.userID = profile.user.id;
      this.fullname = profile.user.fullname.toUpperCase();
      this.email = profile.user.email;
      this.isTeacher = profile.user.isTeacher;
      this.isStudent = profile.user.isStudent;
      this.experiences = profile.user.experiences;
      if(this.experiences.length == 5) {
        this.maxExperiences = true;
      }
      this.videoUrl = profile.user.video;
      this.bio = profile.user.bio;
    });
    window.scrollTo(0, 0);
  }
}
