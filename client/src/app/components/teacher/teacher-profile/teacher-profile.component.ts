import { Component, OnInit, ViewChild, trigger, state, transition, style, animate } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css'],
  animations: [
    trigger('modalStatusFade', [
      state('none', style({visibility: 'hidden', opacity: 0})),
      state('fadeOut', style({visibility: 'hidden',transition: 'all .5s ease-in-out',
      opacity: 0
      })),
      state('fadeIn', style({visibility: 'visible', transition: 'all .5s ease-in-out',
      opacity: 1
      })),
      transition('fadeOut <=> *', animate(350)),
    ])
  ]
})
export class TeacherProfileComponent implements OnInit {
  @ViewChild("fileInput") fileInput;

  modalState = 'none';
  message;
  vidSubmitMessage
  messageClass;
  processing: boolean = false;
  show: boolean = false;
  edit: boolean = false;
  isBioEdit: boolean = false;
  maxExperiences: boolean = false;
  experienceValue;
  canSubmitVideo: boolean = false;
  showVidSubmitMessage: boolean = false;
  canChangeStatus: boolean = false;
  isOnlineString: String = 'Offline';
  profPicName;
  viewTeacherID;
  bioValue;
  currentUrl;
  videoFileName;
  isEdit: boolean = false;
  isEditExp: boolean = false;
  isParams: boolean = false;
  originalArray;
  onlineStatus;
  isTeacher: boolean = true;
  isStudent: boolean = false;
  awsBucket = 'https://s3.amazonaws.com/savvyappphotos/';


  userObj;




  constructor(public authService: AuthService, private router: Router, private route: ActivatedRoute, private cookieService: CookieService) {
  }


  getBioValue(value) {
      this.bioValue = value;
  }

  bioValueSubmit() {
    const bio = {
      bio: this.bioValue
    }
    this.authService.onBioFormSubmit(bio).subscribe(data => {
      if(!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.show = true;
        this.isEdit = false;
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.getUserInfo();
        setTimeout(() => {
          this.show = false
        }, 1200);
      }
    });
  }

  getVidFile(event) {
    this.videoFileName = event.target.files[0];
    this.videoFileName = this.videoFileName.name;
    if(this.videoFileName) {
      this.canSubmitVideo = true;
    }
  }

  videoSubmit() {
    this.showVidSubmitMessage = true;
    let fi = this.fileInput.nativeElement;
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

  getNewExperience(event){
    this.experienceValue = event.target.value;
  }

  addExperience() {
    this.userObj.experiences.push(this.experienceValue);
    if(this.userObj.experiences.length >= 5) {
      this.maxExperiences = true;
    }
    // this.experienceSubmit();
    this.experienceValue = '';
  }

  experienceSubmit() {
    this.isEditExp = !this.isEditExp;
    this.authService.onExperienceSubmit(this.userObj.experiences).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.getUserInfo();
      }
    })
  }
  
  deleteExperience() {
    const trying = this.originalArray;
    this.userObj.experiences.pop()
  }

  resetExperience() {
    this.userObj.experiences = [];
    this.maxExperiences = false;
  }

  cancelExp() {
    this.isEditExp = !this.isEditExp;
    this.getUserInfo();
  }

  goOffline() {
    this.isOnlineString = 'Offline';
    this.onlineStatus = false;
    let status = {
      status: this.onlineStatus
    }
    this.authService.onlineStatus(status).subscribe(data => {
      if(!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }
      this.messageClass = 'alert alert-danger';
      this.message = data.message;
      setTimeout(() => {
        this.closeStatusModal()
      }, 800);
    });
  }

  goOnline() {
    this.isOnlineString = 'Online';
    this.onlineStatus = true;
    let status = {
      status: this.onlineStatus
    }
    this.authService.onlineStatus(status).subscribe(data => {
      if(!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }
      this.messageClass = 'alert alert-success';
      this.message = data.message;
      setTimeout(() => {
        this.closeStatusModal()
      }, 800);
    });
  }

  // checkCookies() {
  //     this.cookieValue = this.cookieService.get('Status');
  //     if(this.cookieValue == "Here, have some status based cookies!") {
  //       return true
  //     }
  //     setTimeout(() => {
  //       this.cookieService.set( 'Status', 'Here, have some status based cookies!' );
  //       return false
  //     },120000)
  // }
  //
  closeStatusModal() {
    this.modalState = 'fadeOut';
  }

  getBio() {
    this.getUserInfo();
  }



  getUserInfo(){
    this.route.params.subscribe(params => {
    this.viewTeacherID = params['id'];
      });
      if(this.viewTeacherID) {
      this.isParams = true;
         this.authService.getTeacherView(this.viewTeacherID).subscribe(viewTeacher => {
           this.userObj = viewTeacher.teacher;
          });
          return this.userObj;
        }
    this.authService.getProfile().subscribe(profile => {

      this.userObj = profile.user;
      if((this.userObj.skill1 && this.userObj.bio && this.userObj.experiences && this.userObj.profPic) != null || undefined || '') {
        this.canChangeStatus = true;
      }
      console.log('yup', this.userObj)
      if(!this.isParams && this.userObj.isTeacher && !this.userObj.onlineStatus) {
      setTimeout(() => {
        this.modalState = 'fadeIn'
      },1500);
    }
    });
    return this.userObj;
  }

  ngOnInit() {
    this.getUserInfo();
    window.scrollTo(0, 0);
  }


}
