import { Component, OnInit, Input, AfterContentChecked, EventEmitter, ViewChild, trigger, state, transition, style, animate } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { AuthService } from '../../../../../services/auth.service';
import { ApiService } from '../../../../../services/api.service';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css'],
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

export class StudentInfoComponent implements OnInit, AfterContentChecked  {


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
  canChangeStatus
  awsBucket = 'https://s3.amazonaws.com/savvyappphotos/';

  fullname;
  email;
  password;
  studentCounty;
  studentHandicap;
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
      this.studentCounty = event.target.value;
  }
    }

  getHandicap(event) {
    if(event.target.value) {
    this.studentHandicap = event.target.value;
  }
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
        studentCounty: this.studentCounty,
        studentHandicap: this.studentHandicap
      }
      console.log(info,'minfo')
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

  submitAdvancedSettings() {
    if(this.newPassword === this.newPasswordConfirm || this.newFullname == ''){
      this.passwordMatch = true;
    }
    let info = {
      fullname: this.newFullname,
      email: this.newEmail,
      password: this.newPassword
    }
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

  getUserInfo(){
    this.route.params.subscribe(params => {
    let viewTeacherID = params['id'];
      if(viewTeacherID) {
      this.isParams = true;
         this.authService.getTeacherView(viewTeacherID).subscribe(viewTeacher => {
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
      console.log(this.userObj)
      return true;
    });
  });
  }

  ngOnInit() {
    this.getUserInfo();
    window.scrollTo(0,0);
  }
}


// import { Component, OnInit, AfterContentChecked, EventEmitter, ViewChild } from '@angular/core';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router'
// import { AuthService } from '../../../../../services/auth.service';
// import { ApiService } from '../../../../../services/api.service';
//
// @Component({
//   selector: 'app-student-info',
//   templateUrl: './student-info.component.html',
//   styleUrls: ['./student-info.component.css']
// })
// export class StudentInfoComponent implements OnInit {
//
//   message;
//   messageClass;
//   id;
//   fullname;
//   email;
//   isStudent;
//   isTeacher;
//   isParams: boolean = false;
//   isEdit: boolean = false;
//   fileChangeName;
//   selectedFile;
//   profPicName;
//   profPic;
//   isLoading: boolean = true;
//   studentHandicap;
//   studentCounty;
//   golferType;
//
//     @ViewChild("fileInput") fileInput;
//
//   awsBucket = 'https://s3.amazonaws.com/savvyappphotos/';
//
// viewStudentId;
//
//     constructor(public authService: AuthService, public apiService: ApiService, private formBuilder: FormBuilder, private route: ActivatedRoute) {}
//
//   getProfPic() {
//     this.authService.getProfile()
//     .subscribe(profile => {
//       this.profPicName = profile.user.profPic;
//       this.profPic = this.awsBucket + this.profPicName;
//        });
//      }
//
//      getCounty(event) {
//        this.studentCounty = event.target.value;
//      }
//
//      getHandicap(event) {
//        this.studentHandicap = event.target.value;
//      }
//
//      getGolferType(event) {
//        this.golferType = event.target.value;
//      }
//
//      getFile(event) {
//       const fileToName = event.target.files[0];
//       this.fileChangeName = fileToName.name;
//      }
//
//      submitStudentProfileInfo(){
//        let fi = this.fileInput.nativeElement;
//        if (fi.files && fi.files[0]) {
//            let fileToUpload = fi.files[0];
//            this.authService
//                .uploadPhoto(fileToUpload)
//                .subscribe(res => {
//               });
//            }
//        let studentInfo = {
//          studentHandicap : this.studentHandicap,
//          studentCounty: this.studentCounty,
//          golferType: this.golferType
//        }
//        console.log(studentInfo)
//        this.authService.studentProfileInfo(studentInfo).subscribe(data => {
//          if (!data.success) {
//            this.messageClass = 'alert alert-danger';
//            this.message = data.message;
//            this.isEdit = true;
//          } else {
//            this.messageClass = 'alert alert-success';
//            this.message = data.message;
//            this.isEdit = false;
//          }
//        });
//        setTimeout(() => {
//          this.getNewProfPic();
//        }, 1400);
//      }
//
//      getNewProfPic() {
//        this.authService.getProfile()
//        .subscribe(profile => {
//          this.profPicName = profile.user.profPic;
//          this.profPic = this.awsBucket + this.profPicName;
//      });
//    }
//
//      ngOnInit() {
//        this.route.params.subscribe(params => {
//        this.viewStudentId = params['id'];
//          if(this.viewStudentId) {
//          this.isParams = true;
//             this.authService.getTeacherView(this.viewStudentId).subscribe(viewStudent => {
//               this.id = viewStudent.teacher._id;
//               this.fullname = viewStudent.teacher.fullname;
//               this.email =viewStudent.teacher.email;
//               this.isStudent =viewStudent.teacher.isStudent;
//               this.isTeacher =viewStudent.teacher.isTeacher;
//               this.profPicName = viewStudent.teacher.profPic;
//               this.studentCounty = viewStudent.teacher.studentCounty;
//               this.studentHandicap = viewStudent.teacher.studentHandicap;
//               this.golferType = viewStudent.teacher.golferType;
//               if(this.profPicName == undefined || null) {
//                 this.profPicName = 'blankProf.png'
//               }
//               this.profPic = this.awsBucket + this.profPicName;
//              //  if ratings array is not 0, do this operation
//               return true;
//               });
//             }
//           });
//          if(!this.viewStudentId) {
//          this.isParams = false;
//          this.authService.getProfile()
//          .subscribe(profile => {
//            this.id = profile.user._id;
//            this.fullname = profile.user.fullname;
//            this.email =profile.user.email;
//            this.isStudent =profile.user.isStudent;
//            this.isTeacher =profile.user.isTeacher;
//            this.studentCounty = profile.user.studentCounty;
//            this.studentHandicap = profile.user.studentHandicap;
//            this.golferType = profile.user.golferType;
//            this.profPicName = profile.user.profPic;
//            if(this.profPicName === undefined) {
//              this.profPicName = 'blankProf.png'
//            }
//            this.profPic = this.awsBucket + this.profPicName;
//          });
//          return true;
//        }
//     return false;
//   }
//  }
