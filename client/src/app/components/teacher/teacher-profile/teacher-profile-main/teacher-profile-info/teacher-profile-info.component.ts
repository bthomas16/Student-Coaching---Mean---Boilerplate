import { Component, OnInit } from '@angular/core';
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
  userID;
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


  constructor(public authService: AuthService, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.location = '';
    this.createForm();
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

  canEdit() {
    this.infoForm.reset();
    this.isEdit = false;
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
    console.log('experience is:', info);
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

  // getProfPic() {
  //   this.authService.onGetProfPic().subscribe(img => {
  //     var image = new Image()
  //     image.src = img
  //     this.profPic = image.src
  //     console.log(this.profPic)
  //   })
  // }


  ngOnInit() {
    this.route.params.subscribe(params => {
    this.viewTeacherID = params['id'];
      if(this.viewTeacherID) {
      this.isParams = true;
         this.authService.getTeacherView(this.viewTeacherID).subscribe(viewTeacher => {
           this.userID = viewTeacher.teacher.id;
           this.fullname = viewTeacher.teacher.fullname.toUpperCase();
           this.email =viewTeacher.teacher.email;
           this.isStudent =viewTeacher.teacher.isStudent;
           this.isTeacher =viewTeacher.teacher.isTeacher;
           this.location =viewTeacher.teacher.location;
           this.yrsExperience =viewTeacher.teacher.yrsExperience;
           this.skills =viewTeacher.teacher.skills;
           this.handicap =viewTeacher.teacher.handicap;
           this.cost =viewTeacher.teacher.cost;
          //  if ratings array is not 0, do this operation
           if(viewTeacher.teacher.ratings.length !== null || 0 ) {
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
            });
         return true;
         }
       });
      if(!this.viewTeacherID) {
      this.isParams = false;
      this.authService.getProfile()
      .subscribe(profile => {
        this.userID = profile.user.id;
        this.fullname = profile.user.fullname.toUpperCase();
        this.email =profile.user.email;
        this.isStudent =profile.user.isStudent;
        this.isTeacher =profile.user.isTeacher;
        this.location =profile.user.location;
        this.yrsExperience =profile.user.yrsExperience;
        this.skills =profile.user.skills;
        this.handicap =profile.user.handicap;
        this.cost =profile.user.cost;
       //  if ratings array is not 0, do this operation
        if(profile.user.ratings.length !== null || 0 ) {
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
      return true;
  }
  return false
  }
}
