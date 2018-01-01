import { Component, OnInit, Input, AfterContentChecked, EventEmitter, ViewChild, trigger, state, transition, style, animate } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { AuthService } from '../../../../../services/auth.service';
import { ApiService } from '../../../../../services/api.service';

@Component({
  selector: 'app-teacher-profile-info',
  templateUrl: './teacher-profile-info.component.html',
  styleUrls: ['./teacher-profile-info.component.css'],
  animations: [
    trigger('slide', [
      state('in', style({ transform: 'translateX(0%)',transition: 'all .5s ease-in-out', opacity: 1 })),
      state('out', style({ transform: 'translateX(-10%)',transition: 'all .5s ease-in-out', opacity: 0, visibility: 'hidden', position: 'absolute' })),
    ]),
    trigger('fade', [
      state('out', style({transition: 'all .5s ease-in-out', opacity: 0, visibility: 'none' })),
      state('in', style({transition: 'all .5s ease-in-out', opacity: 1 })),
    ]),
    trigger('bounce', [
      state('in', style({ transform: 'translateY(30%)', transition: 'all .5s ease-in-out', opacity: 1 })),
      state('out', style({ transform: 'translateY(-30%)',transition: 'all .5s ease-in-out', opacity: 0, visibility: 'hidden' })),
      state('none', style({ display: 'none', visibility: 'hidden' })),
      transition('* => *', animate(500))
    ]),
  ]
})

export class TeacherProfileInfoComponent implements OnInit, AfterContentChecked  {


  slideState = 'out';
  regularEditSlideState = 'out';
  bounceState = 'none';
  regularEditBounceState = 'out';
  fadeInfo = 'in';
  slidePic = 'in';
  profPic;
  show: boolean = false;
  infoForm;
  message;
  messageClass;
  fileChangeName;
  isEditAdvancedSettings: boolean = false;
  canRate: boolean = false;
  isFileReady: boolean = false;
  isParams: boolean = false;
  isEdit: boolean = false;
  passwordMatch: boolean = false;
  canChangeStatus;
  showContactInfo: boolean = false;
  awsBucket = 'https://s3.amazonaws.com/savvyappphotos/';

  fullname;
  email;
  password;
  county;
  skill1;
  skill2;
  skill3;
  yrsExperience;
  handicap;
  cost;
  onlineStatus;
  profPicName;

  newFullname;
  newEmail;
  newPassword;
  newPasswordConfirm;

  userObj;

  @ViewChild("fileInput") fileInput;


  constructor(public authService: AuthService, public apiService: ApiService, private formBuilder: FormBuilder, private route: ActivatedRoute) {
  }

  getNewPasswordConfirm(event) {
    this.newPasswordConfirm = event.target.value;
    if(this.newPasswordConfirm === this.newPassword) {
      this.passwordMatch = true;
    }
  }

  getFile(event) {
   const fileToName = event.target.files[0];
   this.isFileReady = true;
   this.fileChangeName = fileToName.name;
  }

  getNewFullname(event) {
    if(event.target.value) {
      this.fullname = event.target.value;
    }
  }

  getNewEmail(event) {
    if(event.target.value) {
      this.email = event.target.value;
    }
  }

  getNewPassword(event) {
    if(event.target.value) {
      this.newPassword = event.target.value;
    }
  }

  getCounty(event) {
    if(event.target.value) {
      this.county = event.target.value;
  }
    }

  getExperience(event) {
    if(event.target.value) {
    this.yrsExperience = event.target.value
  }
}

  getSkill1(event) {
    if(event.target.value) {
    this.skill1 =  event.target.value;
  }
}

  getSkill2(event) {
    if(event.target.value) {
    this.skill2 = event.target.value;
  }
}

//   getSkill3(event) {
//     if(event.target.value) {
//     this.skill3 = event.target.value
//   }
// }

  getHandicap(event) {
    if(event.target.value) {
    this.handicap = event.target.value;
  }
}

  getCost(event) {
    if(event.target.value) {
    this.cost = event.target.value;
  }
}

  closeRating(){
    this.canRate = false;
    this.apiService.closeRating(this.canRate)

  }

  openRating(){
    this.canRate = true;
    this.apiService.openRating(this.canRate)
  }

  openEditProfileInfo() {
    this.isEdit = !this.isEdit;
    this.fadeInfo = 'out';
    this.slidePic = 'out';
    this.regularEditSlideState = 'in';
    this.regularEditBounceState = 'in';
  }

  closeEditProfileInfo() {
    this.regularEditSlideState = 'out';
    this.regularEditBounceState = 'out';
    setTimeout(() => {
      this.fadeInfo = 'in';
      this.slidePic = 'in';
    }, 501);
  }

  infoSubmit() {
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
        let fileToUpload = fi.files[0];
        this.authService
            .uploadPhoto(fileToUpload)
            .subscribe(res => {
           });
        }
        const info = {
        county: this.county,
        yrsExperience: this.yrsExperience,
        skill1: this.skill1,
        skill2: this.skill2,
        // skill3: this.skill3,
        handicap: this.handicap,
        cost: this.cost
      }
      console.log(info, 'dinfo')
      this.authService.onInfoSubmit(info).subscribe(data => {
        this.show = true;
        if (!data.success) {
          this.messageClass = 'alert alert-danger';
          this.message = data.message;
          setTimeout(() => {
            this.show = false;
          },750);
        } else {
          this.messageClass = 'alert alert-success';
          this.message = data.message;
          setTimeout(() => {
            this.show = false;
          },750);
          this.getUserInfo();
          this.closeEditProfileInfo()
        }
      });
      setTimeout(() => {
        this.getUserInfo();
      }, 1400)
    }

  openEditAdvancedSettings() {
    this.regularEditSlideState = 'out';
    this.regularEditBounceState = 'out';
    setTimeout(() => {
      this.isEditAdvancedSettings = true;
      this.slideState = 'in';
      this.bounceState = 'in';
    },501);
  }

  closeEditAdvancedSettings() {
    this.slideState = 'out';
    this.bounceState = 'out';
    setTimeout(() => {
      this.regularEditSlideState = 'in';
      this.regularEditBounceState = 'in';
      this.isEditAdvancedSettings = false;
    },501);
  }

changeContactShow() {
  this.showContactInfo = !this.showContactInfo;
  this.closeRating();
}


  submitAdvancedSettings() {
    if(this.newPassword === this.newPasswordConfirm || this.newFullname == ''){
      this.passwordMatch = true;
    }
    let info = {
      fullname: this.newFullname,
      email: this.newEmail,
      password: this.newPassword
    }
    console.log('winfo', info)
    this.authService.onInfoSubmit(info).subscribe(data => {
      this.show = true;
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        setTimeout(() => {
          this.show = false;
        },750);
      } else {
        this.slideState = 'out';
        this.bounceState = 'out';
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.show = false;
        },750);
        this.closeEditAdvancedSettings();
      }
    });
  }

  ngAfterContentChecked(){
    this.canRate =  this.apiService.getRatingStatus();
  }

  //   getNewProfPic() {
  //     this.authService.getProfile()
  //     .subscribe(profile => {
  //       this.profPic = this.awsBucket + profile.user.profPic;
  //       console.log(this.profPic, 'poopyers')
  //       if(!this.profPic) {
  //         this.profPic = this.awsBucket + 'blankProf.png'
  //       }
  //   });
  // }

  goOffline() {
    let status = {
      status: false
    }
    this.authService.onlineStatus(status).subscribe(data => {
      if(!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }
      this.messageClass = 'alert alert-danger';
      this.message = data.message;
      this.getUserInfo();
    });
  }

  goOnline() {
    let status = {
      status: true
    }
    this.authService.onlineStatus(status).subscribe(data => {
      if(!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }
      this.messageClass = 'alert alert-success';
      this.message = data.message;
      this.getUserInfo();
    });
  }

  getUserInfo(){
    this.route.params.subscribe(params => {
    let viewTeacherID = params['id'];
      if(viewTeacherID) {
      this.isParams = true;
         this.authService.getTeacherView(viewTeacherID).subscribe(viewTeacher => {
           console.log('teacher', viewTeacher.teacher)
           this.profPicName = viewTeacher.teacher.profPic;
           if(!this.profPicName) {
             this.profPicName = 'blankProf.png'
           }
           this.profPic = this.awsBucket + this.profPicName;
           this.userObj = viewTeacher.teacher;
          });
          return true;
        }
    this.authService.getProfile().subscribe(profile => {
      this.profPicName = profile.user.profPic;
      if(!this.profPicName) {
        this.profPicName = 'blankProf.png'
      }
      this.profPic = this.awsBucket + this.profPicName;
      if((this.profPicName !== 'blankProf.png') && (profile.user.skill1 && profile.user.skill2 != '') && (profile.user.bio != '') && profile.user.experiences.length !== 0 || null) {
        this.canChangeStatus = true;
      }
      this.userObj = profile.user;
      return true;
    });
  });
  }

  ngOnInit() {
    this.getUserInfo();
    window.scrollTo(0,0);
  }
}
