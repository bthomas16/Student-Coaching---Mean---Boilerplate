import { Component, OnInit, AfterContentChecked, EventEmitter, ViewChild } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { AuthService } from '../../../../services/auth.service';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-student-main',
  templateUrl: './student-main.component.html',
  styleUrls: ['./student-main.component.css']
})

export class StudentMainComponent implements OnInit {

  message;
  messageClass;
  id;
  isStudent;
  isTeacher;
  isParams: boolean = false;
  isEditSkills: boolean = false;
  maxSkills: boolean = false;
  skillValue: string = '';
  skillsToLearn: Array<any>;
  viewStudentId;

    constructor(public authService: AuthService, public apiService: ApiService, private formBuilder: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
    this.viewStudentId = params['id'];
      if(this.viewStudentId) {
      this.isParams = true;
         this.authService.getTeacherView(this.viewStudentId).subscribe(viewStudent => {
           this.id = viewStudent.teacher._id;
           this.skillsToLearn = viewStudent.student.skillsToLearn;

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
        this.isStudent =profile.user.isStudent;
        this.isTeacher =profile.user.isTeacher;
        this.skillsToLearn = profile.user.skillsToLearn;
        console.log(this.skillsToLearn)
      });
      return true;
    }
 return false;
  }

}
