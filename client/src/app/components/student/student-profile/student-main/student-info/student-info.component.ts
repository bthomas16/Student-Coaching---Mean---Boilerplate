import { Component, OnInit, AfterContentChecked, EventEmitter, ViewChild } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { AuthService } from '../../../../../services/auth.service';
import { ApiService } from '../../../../../services/api.service';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {

  message;
  messageClass;
  id;
  fullname;
  email;
  isStudent;
  isTeacher;
  isParams: boolean = false;
  isEdit: boolean = false;
  fileChangeName;
  selectedFile;
  profPicName;
  profPic;
  isLoading: boolean = true;
  studentHandicap;
  studentCounty;
  golferType;

    @ViewChild("fileInput") fileInput;

  awsBucket = 'https://s3.amazonaws.com/savvyappphotos/';

viewStudentId;

    constructor(public authService: AuthService, public apiService: ApiService, private formBuilder: FormBuilder, private route: ActivatedRoute) {}

  getProfPic() {
    this.authService.getProfile()
    .subscribe(profile => {
      this.profPicName = profile.user.profPic;
      this.profPic = this.awsBucket + this.profPicName;
       });
     }

     getCounty(event) {
       this.studentCounty = event.target.value;
     }

     getHandicap(event) {
       this.studentHandicap = event.target.value;
     }

     getGolferType(event) {
       this.golferType = event.target.value;
     }

     getFile(event) {
      const fileToName = event.target.files[0];
      this.fileChangeName = fileToName.name;
     }

     submitStudentProfileInfo(){
       let fi = this.fileInput.nativeElement;
       if (fi.files && fi.files[0]) {
           let fileToUpload = fi.files[0];
           this.authService
               .uploadPhoto(fileToUpload)
               .subscribe(res => {
              });
           }
       let studentInfo = {
         studentHandicap : this.studentHandicap,
         studentCounty: this.studentCounty,
         golferType: this.golferType
       }
       console.log(studentInfo)
       this.authService.studentProfileInfo(studentInfo).subscribe(data => {
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
       setTimeout(() => {
         this.getNewProfPic();
       }, 1400);
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
       this.viewStudentId = params['id'];
         if(this.viewStudentId) {
         this.isParams = true;
            this.authService.getTeacherView(this.viewStudentId).subscribe(viewStudent => {
              this.id = viewStudent.teacher._id;
              this.fullname = viewStudent.teacher.fullname;
              this.email =viewStudent.teacher.email;
              this.isStudent =viewStudent.teacher.isStudent;
              this.isTeacher =viewStudent.teacher.isTeacher;
              this.profPicName = viewStudent.teacher.profPic;
              this.studentCounty = viewStudent.teacher.studentCounty;
              this.studentHandicap = viewStudent.teacher.studentHandicap;
              this.golferType = viewStudent.teacher.golferType;
              if(this.profPicName == undefined || null) {
                this.profPicName = 'blankProf.png'
              }
              this.profPic = this.awsBucket + this.profPicName;
             //  if ratings array is not 0, do this operation
              return true;
              });
            }
          });
         if(!this.viewStudentId) {
         this.isParams = false;
         this.authService.getProfile()
         .subscribe(profile => {
           this.id = profile.user._id;
           this.fullname = profile.user.fullname;
           this.email =profile.user.email;
           this.isStudent =profile.user.isStudent;
           this.isTeacher =profile.user.isTeacher;
           this.studentCounty = profile.user.studentCounty;
           this.studentHandicap = profile.user.studentHandicap;
           this.golferType = profile.user.golferType;
           this.profPicName = profile.user.profPic;
           if(this.profPicName === undefined) {
             this.profPicName = 'blankProf.png'
           }
           this.profPic = this.awsBucket + this.profPicName;
         });
         return true;
       }
    return false;
  }
 }
