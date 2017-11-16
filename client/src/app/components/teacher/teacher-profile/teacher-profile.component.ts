import { Component, OnInit, ViewChild, trigger, transition, style, animate } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-teacher-profile',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {
  @ViewChild("fileInput") fileInput;

  cookieValue = 'UNKNOWN';
  cookies: boolean = false;

  email;
  message;
  vidSubmitMessage
  messageClass;
  userID;
  fullname;
  isStudent;
  isTeacher: boolean = true;
  skill1;
  skill2;
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
  canChangeStatus: boolean = false;
  onlineStatus: string = 'OFFLINE';
  isOnline: boolean = false;
  profPicName;
  capFullname;

  isLoading: boolean = true;


  awsBucket = 'https://s3.amazonaws.com/savvyappphotos/';


  constructor(public authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private cookieService: CookieService) {
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
          } else {
            this.messageClass = 'alert alert-success';
            this.canSubmitVideo = false;
            this.vidSubmitMessage = data.message;
            setTimeout(() => {
              this.showVidSubmitMessage = false;
              this.canSubmitVideo = false;
            }, 1800);
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

  goOffline() {
    let status = {
      status: 'OFFLINE'
    }
    this.authService.onlineStatus(status).subscribe(data => {
      if(!data.success) {
        console.log('fail');
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }
      this.messageClass = 'alert alert-danger';
      this.message = data.message;
      this.onlineStatus = 'OFFLINE';
      this.isOnline = false;
      setTimeout(() => {
        this.closeStatusModal()
      }, 800);
    });
  }

  goOnline() {
    let status = {
      status: 'ONLINE'
    }
    this.authService.onlineStatus(status).subscribe(data => {
      if(!data.success) {
        console.log('fail');
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }
      this.messageClass = 'alert alert-success';
      this.message = data.message;
      this.onlineStatus = 'ONLINE';
      this.isOnline = true;
      setTimeout(() => {
        this.closeStatusModal()
      }, 800);
    });
  }

  checkCookies() {
      this.cookieValue = this.cookieService.get('Status');
      if(this.cookieValue == "Here, have some status based cookies!") {
        return true
      }
      setTimeout(() => {
        this.cookieService.set( 'Status', 'Here, have some status based cookies!' );
        return false
      },120000)
  }

  closeStatusModal() {
    this.cookies = true;
    this.cookieService.set( 'Status', 'Here, have some status based cookies!' );
    this.checkCookies();
  }

  ngOnInit() {

    this.authService.getProfile()
    .subscribe(profile => {
      this.userID = profile.user.id;
      this.fullname = profile.user.fullname;
      this.capFullname = this.fullname.charAt(0).toUpperCase() + this.fullname.slice(1);
      this.email = profile.user.email;
      this.profPicName = profile.user.profPic;
      if(this.profPicName == undefined) {
        this.profPicName = 'blankProf.png'
      }
      console.log(this.profPicName)
      this.profPic = this.awsBucket + this.profPicName;
      this.isTeacher = profile.user.isTeacher;
      this.isStudent = profile.user.isStudent;
      this.skill1 = profile.user.skill1;
      this.skill2 = profile.user.skill2;
      this.experiences = profile.user.experiences;
      this.onlineStatus = profile.user.onlineStatus;
      if(this.onlineStatus === 'ONLINE') {
        this.isOnline = true;
      }
      if(this.experiences.length == 5) {
        this.maxExperiences = true;
      }
      this.profVideo = profile.user.profVideo;
      this.bio = profile.user.bio;
      if((this.profPicName !== 'blankProf.png') && (this.skill1 && this.skill2 !== '') && (this.bio !== '') && this.experiences.length !== 0 || null) {
        this.canChangeStatus = true;
      }
    });
    this.checkCookies();
    setTimeout(() => {
      this.isLoading = false;
    }, 800);
    window.scrollTo(0, 0);
  }
}
