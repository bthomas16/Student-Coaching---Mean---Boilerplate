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
  experienceForm;
  experience1;
  experience2;
  experience3;
  experience4;
  experience5;
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
    // this.createForm();
    this.createVideoForm();
    this.createBioForm();
  }

  // createForm(){
  //   this.experienceForm = this.formBuilder.group({
  //     experience1: ['', Validators.required],
  //     experience2: ['', Validators.required],
  //     experience3: ['', Validators.required],
  //     experience4: ['', Validators.required],
  //     experience5: ['', Validators.required]
  //   });
  // }

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

  canEdit() {
    this.experienceForm.reset();
    this.isEdit = false;
  }

  experienceSubmit() {
    // this.experience1 = this.experienceForm.get('experience1').value.trim(),
    // this.experience2 = this.experienceForm.get('experience2').value.trim(),
    // this.experience3 = this.experienceForm.get('experience3').value.trim(),
    // this.experience4 = this.experienceForm.get('experience4').value.trim(),
    // this.experience5 = this.experienceForm.get('experience5').value.trim()
    // this.isEdit = false;
    // const experience = {
    //   experience1: this.experience1,
    //   experience2: this.experience2,
    //   experience3: this.experience3,
    //   experience4: this.experience4,
    //   experience5: this.experience5
    // }
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
      // this.experiences = this.experiences.slice(0,5)
      if(this.experiences.length == 5) {
        this.maxExperiences = true;
      }
      // this.experience2 = profile.user.experience2;
      // this.experience3 = profile.user.experience3;
      // this.experience4 = profile.user.experience4;
      // this.experience5 = profile.user.experience5;
      this.videoUrl = profile.user.video;
      this.bio = profile.user.bio;
    });
    window.scrollTo(0, 0);
  }
}
