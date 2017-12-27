import { Component, OnInit, AfterContentChecked, EventEmitter, Input, ViewChild } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { AuthService } from '../../../../../services/auth.service';
import { ApiService } from '../../../../../services/api.service';

@Component({
  selector: 'app-student-skills',
  templateUrl: './student-skills.component.html',
  styleUrls: ['./student-skills.component.css']
})
export class StudentSkillsComponent implements OnInit {

  @Input() 'skillsToLearn': Array<any>;

    message;
    messageClass;
    id;
    isStudent;
    isTeacher;
    isParams: boolean = false;
    isEditSkills: boolean = false;
    maxSkills: boolean = false;
    skillValue: string = '';
    viewStudentId;

      constructor(public authService: AuthService, public apiService: ApiService, private formBuilder: FormBuilder, private route: ActivatedRoute) {}

      getNewSkill(event) {
        this.skillValue = event.target.value;
      }

      addSkill() {
        this.skillsToLearn.push(this.skillValue);
        if(this.skillsToLearn.length >= 4) {
          this.maxSkills = true;
        }
        // this.experienceSubmit();
        this.skillValue = '';
      }

      skillSubmit() {
        this.isEditSkills = !this.isEditSkills;
        this.authService.onSkillsToLearnSubmit(this.skillsToLearn).subscribe(data => {
          if (!data.success) {
            this.messageClass = 'alert alert-danger';
            this.message = data.message;
          } else {
            this.messageClass = 'alert alert-success';
            this.message = data.message;
          }
        })
      }
      deleteSkill() {
        this.skillsToLearn.pop()
      }

      resetSkills() {
        this.skillsToLearn = [];
        this.maxSkills = false;
      }

      cancelSkills() {
        this.isEditSkills = !this.isEditSkills;
        this.authService.getProfile()
        .subscribe(profile => {
          this.skillsToLearn = profile.user.skillsToLearn;
        });
      }

       ngOnInit() {
    }
   }
