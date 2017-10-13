import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-teacher-profile-info',
  templateUrl: './teacher-profile-info.component.html',
  styleUrls: ['./teacher-profile-info.component.css']
})
export class TeacherProfileInfoComponent implements OnInit {
  kRating;
  pRating;
  taRating;

  infoForm;
  message;
  messageClass;
  id;
  fullname;
  email;
  isStudent;
  isTeacher;
  location;
  yrsExperience;
  skills;
  handicap;
  cost;
  profPic;
  viewTeacherID;
  ratingsList;
  text;

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

  avgKnowledgeRating: number;
  avgProfessionalismRating: number;
  avgTeachingAbilityRating: number;
  avgRating: number;
  numberOfRatings: number;
  yetRated: boolean = false;

  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  server = '';
  // server = 'http://localhost:8080';



  constructor(public authService: AuthService, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.location = '';
    this.createForm();
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>() || null; // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
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
    if(this.files.length === 1 ) {
      this.onStartUpload()
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
    })
  }


  onUploadOutput(output: UploadOutput): void {
    this.isFileReady = true;
      if (output.type === 'allAddedToQueue') {
        } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') {
          this.files.push(output.file);
        } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
          // update current data in files array for uploading file
          const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
          this.files[index] = output.file;
        } else if (output.type === 'removed') {
          // remove file from array when removed
          this.files = this.files.filter((file: UploadFile) => file !== output.file);
        } else if (output.type === 'dragOver') {
          this.dragOver = true;
        } else if (output.type === 'dragOut') {
          this.dragOver = false;
        } else if (output.type === 'drop') {
          this.dragOver = false;
        }
    }

  onStartUpload(): void {
    const event: UploadInput = {
        type: 'uploadAll',
        url: this.server + "/authentication/avatar-upload/" + this.id,
        method: 'PUT',
        concurrency: 0
      };
      this.uploadInput.emit(event)
      this.isFileReady = false;
    }


  ngOnInit() {
    this.route.params.subscribe(params => {
    this.viewTeacherID = params['id'];
      if(this.viewTeacherID) {
      this.isParams = true;
         this.authService.getTeacherView(this.viewTeacherID).subscribe(viewTeacher => {
           this.id = viewTeacher.teacher._id;
           this.fullname = viewTeacher.teacher.fullname.toUpperCase();
           this.email =viewTeacher.teacher.email;
           this.isStudent =viewTeacher.teacher.isStudent;
           this.isTeacher =viewTeacher.teacher.isTeacher;
           this.location =viewTeacher.teacher.location;
           this.yrsExperience =viewTeacher.teacher.yrsExperience;
           this.skills =viewTeacher.teacher.skills;
           this.handicap =viewTeacher.teacher.handicap;
           this.cost =viewTeacher.teacher.cost;
           this.profPic = viewTeacher.teacher.profPic;
           this.profPic = this.server + '/authentication/avatar-retrieve/' + this.id;
           console.log(this.profPic, 'ish;es')
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
        this.email =profile.user.email;
        this.isStudent =profile.user.isStudent;
        this.isTeacher =profile.user.isTeacher;
        this.location =profile.user.location;
        this.yrsExperience =profile.user.yrsExperience;
        this.skills =profile.user.skills;
        this.handicap =profile.user.handicap;
        this.cost =profile.user.cost;
        this.profPic = profile.user.profPic;
        this.profPic = this.server + '/authentication/avatar-retrieve/' + this.id;
        console.log(this.profPic, 'ish;es')
       //  if ratings array is not 0, do this operation
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
