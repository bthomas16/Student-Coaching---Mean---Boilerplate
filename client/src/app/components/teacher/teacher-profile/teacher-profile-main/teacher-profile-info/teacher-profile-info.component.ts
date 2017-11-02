import { Component, OnInit, AfterContentChecked, EventEmitter, ViewChild } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { AuthService } from '../../../../../services/auth.service';
import { ApiService } from '../../../../../services/api.service';

@Component({
  selector: 'app-teacher-profile-info',
  templateUrl: './teacher-profile-info.component.html',
  styleUrls: ['./teacher-profile-info.component.css']
})
export class TeacherProfileInfoComponent implements OnInit, AfterContentChecked  {
  kRating;
  pRating;
  taRating;

  infoForm;
  message;
  messageClass;
  id;
  fullname;
  capFullname;
  email;
  isStudent;
  isTeacher;
  county;
  yrsExperience;
  skill1 = "Driving";
  skill2 = "Approach Game";
  skill3 = "Putting";
  handicap;
  cost;
  profPic;
  viewTeacherID;
  ratingsList;
  text;

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


  awsBucket = 'https://s3.amazonaws.com/savvyappphotos/';

  @ViewChild("fileInput") fileInput;



  constructor(public authService: AuthService, public apiService: ApiService, private formBuilder: FormBuilder, private route: ActivatedRoute) {}

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

  ngAfterContentChecked(){
    this.canRate =  this.apiService.getRatingStatus();
  }

  infoSubmit() {
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
        let fileToUpload = fi.files[0];
        this.authService
            .uploadPhoto(fileToUpload)
            .subscribe(res => {
              console.log(res)
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
        if (!data.success) {
          this.messageClass = 'alert alert-danger';
          this.message = data.message;
          this.isEdit = true;
        } else {
          this.messageClass = 'alert alert-success';
          this.message = data.message;
          this.isEdit = false;
        }
      });
    }

  // onStartUpload(): void {
  //   const event: UploadInput = {
  //       type: 'uploadAll',
  //       url: this.server + "/authentication/avatar-upload/" + this.id,
  //       method: 'PUT',
  //       concurrency: 0
  //     };
  //     this.uploadInput.emit(event)
  //     this.isFileReady = false;
  //   }


  ngOnInit() {
    this.route.params.subscribe(params => {
    this.viewTeacherID = params['id'];
      if(this.viewTeacherID) {
      this.isParams = true;
         this.authService.getTeacherView(this.viewTeacherID).subscribe(viewTeacher => {
           this.id = viewTeacher.teacher._id;
           this.fullname = viewTeacher.teacher.fullname.toUpperCase();
           this.capFullname = this.fullname.charAt(0).toUpperCase() + this.fullname.slice(1);
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
           console.log(this.profPicName)
           this.profPic = this.awsBucket + this.profPicName;
          //  if ratings array is not 0, do this operation
           if(viewTeacher.teacher.ratings.length ) {
             this.yetRated = true;
            //  Loop through ratings array
           for(let rating of viewTeacher.teacher.ratings) {
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
              return true;
            });
         }
       });
      if(!this.viewTeacherID) {
      this.isParams = false;
      this.authService.getProfile()
      .subscribe(profile => {
        this.id = profile.user._id;
        this.fullname = profile.user.fullname.toUpperCase();
        this.capFullname = this.fullname.charAt(0).toUpperCase() + this.fullname.slice(1);
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
        console.log(this.profPicName)
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
