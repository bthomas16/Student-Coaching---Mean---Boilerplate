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
      state('out', style({transition: 'all .5s ease-in-out', opacity: 0 })),
      state('in', style({transition: 'all .5s ease-in-out', opacity: 1 })),
    ]),
    trigger('bounce', [
      state('in', style({ transform: 'translateY(30%)', transition: 'all .5s ease-in-out', opacity: 1 })),
      state('out', style({ transform: 'translateY(-30%)',transition: 'all .5s ease-in-out', opacity: 0, display: 'none' })),
      transition('* => *', animate(500))
    ])
  ]
})

export class TeacherProfileInfoComponent implements OnInit, AfterContentChecked  {

  @Input() fullname;
  kRating;
  pRating;
  taRating;
  slideState = 'out';
  regularEditSlideState = 'out';
  bounceState = 'out';
  regularEditBounceState = 'out';
  fadeInfo = 'in';
  slidePic = 'in';

  show: boolean = false;
  infoForm;
  message;
  messageClass;
  id;
  email;
  password;
  passwordConfirm;
  isStudent;
  isTeacher;
  county = '';
  yrsExperience  = '';
  skill1 = '';
  skill2 = '';
  skill3 = '';
  handicap = '';
  cost = '';
  profPic;
  viewTeacherID;
  ratingsList;
  text;
  isEditAdvancedSettings: boolean = false;

  canRate: boolean = false;
  isFileReady: boolean = false;

  tempkRatingsArray: Array<number> = [];
  temppRatingsArray: Array<number> = [];
  temptaRatingsArray: Array<number> = [];
  avgTotalRating: number;
  isParams: boolean = false;
  isEdit: boolean = false;
  isChecked1: boolean = false;
  isChecked2: boolean = false;
  isChecked3: boolean = false;
  isChecked4: boolean = false;
  isChecked5: boolean = false;
  mustUpload: boolean = false;

  avgKnowledgeRating: number;
  avgProfessionalismRating: number;
  avgTeachingAbilityRating: number;
  avgRating: number;
  numberOfRatings: number;
  yetRated: boolean = false;

  fileChangeName;
  selectedFile;
  photoForm;
  profPicName;
  passwordMatch: boolean = true;


  awsBucket = 'https://s3.amazonaws.com/savvyappphotos/';

  @ViewChild("fileInput") fileInput;

  constructor(public authService: AuthService, public apiService: ApiService, private formBuilder: FormBuilder, private route: ActivatedRoute) {}

  timer(time: number, property: any, val: any) {
    setTimeout(() => {
    return property = val;
    }, time)
  }

  timer1(time, func)   {
    setTimeout(() => {
      func();
    }, time)
  }

  getNewFullname(event) {
    this.fullname = event.target.value;
  }

  getNewEmail(event) {
    this.email = event.target.value;
  }

  getNewPassword(event) {
    this.password = event.target.value;
  }

  getNewPasswordConfirm(event) {
    this.passwordConfirm = event.target.value;
    if(this.passwordConfirm != this.password) {
      this.passwordMatch = false;
    }
  }

  getFile(event) {
   const fileToName = event.target.files[0];
   this.fileChangeName = fileToName.name;
  }

  getCounty(event) {
    this.county = event.target.value;
  }

  getExperience(event) {
    this.yrsExperience = event.target.value;
  }

  getSkill1(event) {
    this.skill1 = event.target.value;
  }

  getSkill2(event) {
    this.skill2 = event.target.value;
  }

  getSkill3(event) {
    this.skill3 = event.target.value;
  }

  getHandicap(event) {
    this.handicap = event.target.value;
  }

  getCost(event) {
    this.cost= event.target.value;
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
        skill3: this.skill3,
        handicap: this.handicap,
        cost: this.cost
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
          this.messageClass = 'alert alert-success';
          this.message = data.message;
          setTimeout(() => {
            this.show = false;
          },750);
          this.closeEditProfileInfo()
        }
      });
      setTimeout(() => {
        this.getNewProfPic();
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
    if(this.password != this.passwordConfirm){
      return false;
    }
    let info = {
      fullname: this.fullname,
      email: this.email,
      password: this.password
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

    getNewProfPic() {
      this.authService.getProfile()
      .subscribe(profile => {
        this.profPicName = profile.user.profPic;
        this.profPic = this.awsBucket + this.profPicName;
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
    this.viewTeacherID = params['id'];
      if(this.viewTeacherID) {
      this.isParams = true;
         this.authService.getTeacherView(this.viewTeacherID).subscribe(viewTeacher => {
           this.id = viewTeacher.teacher._id;
          //  this.fullname = viewTeacher.teacher.fullname;
           this.email =viewTeacher.teacher.email;
           this.isStudent =viewTeacher.teacher.isStudent;
           this.isTeacher =viewTeacher.teacher.isTeacher;
           this.county =viewTeacher.teacher.county;
           this.yrsExperience =viewTeacher.teacher.yrsExperience;
           this.skill1 = viewTeacher.teacher.skill1;
           this.skill2 = viewTeacher.teacher.skill2;
           this.skill3 = viewTeacher.teacher.skill3;
           this.handicap = viewTeacher.teacher.handicap;
           this.cost =viewTeacher.teacher.cost;
           this.profPicName = viewTeacher.teacher.profPic;
           if(this.profPicName == undefined || null) {
             this.profPicName = 'blankProf.png'
           }
           this.profPic = this.awsBucket + this.profPicName;
          //  if ratings array is not 0, do this operation
           if(viewTeacher.teacher.ratings.length ) {
             this.yetRated = true;
             this.avgRating = viewTeacher.teacher.avgRatingNumber;
             this.numberOfRatings = viewTeacher.teacher.avgRatingArray.length;
              }
              return true;
            });
         }
       });
      if(!this.viewTeacherID) {
      this.isParams = false;
      this.authService.getProfile()
      .subscribe(profile => {
        this.id = profile.user._id;
        // this.fullname = profile.user.fullname;
        this.email =profile.user.email;
        this.isStudent =profile.user.isStudent;
        this.isTeacher =profile.user.isTeacher;
        this.county =profile.user.county;
        this.yrsExperience =profile.user.yrsExperience;
        this.skill1 = profile.user.skill1;
        this.skill2 = profile.user.skill2;
        this.skill3 = profile.user.skill3;
        this.handicap = profile.user.handicap;
        this.cost = profile.user.cost;
        this.profPicName = profile.user.profPic;
        if(this.profPicName === undefined) {
          this.profPicName = 'blankProf.png'
        }
        this.profPic = this.awsBucket + this.profPicName;
        if(profile.user.ratings.length) {
          this.yetRated = true;
         //  Loop through ratings array
        for(let rating of profile.user.ratings) {
          this.tempkRatingsArray.push(rating.kRatings)
          this.temppRatingsArray.push(rating.pRatings)
          this.temptaRatingsArray.push(rating.taRatings)
       }
       // get averages of all individual arrays
        let avgkRating = (this.tempkRatingsArray.reduce((a, b) => a + b))/this.tempkRatingsArray.length;
        let avgpRating = (this.temppRatingsArray.reduce((a, b) => a + b))/this.temppRatingsArray.length;
        let avgtaRating = (this.tempkRatingsArray.reduce((a, b) => a + b))/this.tempkRatingsArray.length;
       //  get number of ratings
        this.numberOfRatings = this.tempkRatingsArray.length;
        //  get total array average
        this.avgTotalRating = (avgkRating + avgpRating + avgtaRating)/3;
       //  set star states based on total average array value
        if(this.avgTotalRating >= 4.5) {
               this.isChecked5 = true;
             } else {
                if(this.avgTotalRating >= 3.5) {
                  this.isChecked4 = true;
                } else {
                  if(this.avgTotalRating >= 2.5) {
                    this.isChecked3 = true;
                  } else {
                    if(this.avgTotalRating >= 1.5) {
                      this.isChecked2 = true;
                    } else {
                      if(this.avgTotalRating >= 0.5) {
                        this.isChecked1 = true;
                      }
                    }
                  }
                }
              }
           }
         });
    }
  }
}
