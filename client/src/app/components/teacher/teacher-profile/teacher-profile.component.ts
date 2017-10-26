import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild("fileInput") fileInput;

  email;
  message;
  vidSubmitMessage
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
  videoFileName;
  profVideo;
  bioForm;
  bio;
  isBioEdit: boolean = false;
  maxExperiences: boolean = false;
  experienceValue;
  experiences;
  canSubmitVideo: boolean = false;
  showVidSubmitMessage: boolean = false;


  constructor(public authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
    this.createBioForm();
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
  getVidFile(event) {
    console.log('soupers')
    this.videoFileName = event.target.files[0];
    this.videoFileName = this.videoFileName.name;
    if(this.videoFileName) {
      this.canSubmitVideo = true;
    }
  }

  videoSubmit() {
    this.showVidSubmitMessage = true;
    let fi = this.fileInput.nativeElement;
    console.log(this.videoFileName ,'soupers2');
    if (fi.files && fi.files[0]) {
        let fileToUpload = fi.files[0];
        this.authService.uploadVideo(fileToUpload).subscribe(data => {
          if (!data.success) {
            this.messageClass = 'alert alert-danger';
            this.vidSubmitMessage = data.message;
            setTimeout(() => {
              this.showVidSubmitMessage = false;
            }, 1800);
            console.log(this.showVidSubmitMessage, 'ughh');
          } else {
            this.messageClass = 'alert alert-success'
            this.vidSubmitMessage = data.message;
            setTimeout(() => {
              this.showVidSubmitMessage = false;
            }, 1800);
            console.log(this.showVidSubmitMessage, 'ughhhhhh');
          }
        })
      }
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
      this.profVideo = profile.user.profVideo;
      this.bio = profile.user.bio;
    });
    window.scrollTo(0, 0);
  }
}
