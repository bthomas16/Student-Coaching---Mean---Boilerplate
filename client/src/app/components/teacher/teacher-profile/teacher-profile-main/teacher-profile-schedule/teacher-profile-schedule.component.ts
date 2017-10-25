import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../../services/api.service';

@Component({
  selector: 'app-teacher-profile-schedule',
  templateUrl: './teacher-profile-schedule.component.html',
  styleUrls: ['./teacher-profile-schedule.component.css']
})
export class TeacherProfileScheduleComponent implements OnInit {
  message;
  messageClass;
  monM: boolean = false;
  monA: boolean = false;
  monE: boolean = false;
  tueM: boolean = false;
  tueA: boolean = false;
  tueE: boolean = false;
  wedM: boolean = false;
  wedA: boolean = false;
  wedE: boolean = false;
  thuM: boolean = false;
  thuA: boolean = false;
  thuE: boolean = false;
  friM: boolean = false;
  friA: boolean = false;
  friE: boolean = false;
  satM: boolean = false;
  satA: boolean = false;
  satE: boolean = false;
  sunM: boolean = false;
  sunA: boolean = false;
  sunE: boolean = false;
  processing: boolean = false;
  show: boolean = false;
  isParams: boolean = false;
  canRate;

  viewTeacherID;

  constructor(public authService: AuthService, private route: ActivatedRoute, public apiService: ApiService) { }

  closeRating(){
    this.canRate = false;
    this.apiService.closeRating(this.canRate)
  }


onSchedule() {
  this.show = true;
  this.processing = true;
  const schedule = {
    monM: this.monM,
    monA: this.monA,
    monE: this.monE,
    tueM: this.tueM,
    tueA: this.tueA,
    tueE: this.tueE,
    wedM: this.wedM,
    wedA: this.wedA,
    wedE: this.wedE,
    thuM: this.thuM,
    thuA: this.thuA,
    thuE: this.thuE,
    friM: this.friM,
    friA: this.friA,
    friE: this.friE,
    satM: this.satM,
    satA: this.satA,
    satE: this.satE,
    sunM: this.sunM,
    sunA: this.sunA,
    sunE: this.sunE
  }
  this.authService.updateSchedule(schedule).subscribe(data => {
    if (!data.success) {
      this.messageClass = 'alert alert-danger';
      this.message = data.message;
      this.processing= false;
    } else {
      this.messageClass = 'alert alert-success'
      this.message = data.message
      setTimeout(() => {
        this.processing = false;
        this.show = false;
      }, 1800);
    }
  })
}

  ngOnInit() {
    this.route.params.subscribe(params => {
    this.viewTeacherID = params['id'];
      if(this.viewTeacherID) {
      this.isParams = true;
    this.authService.getTeacherView(this.viewTeacherID).subscribe(viewTeacher => {
      this.monM = viewTeacher.teacher.monM;
      this.monA = viewTeacher.teacher.monA;
      this.monE = viewTeacher.teacher.monE;
      this.tueM = viewTeacher.teacher.tueM;
      this.tueA = viewTeacher.teacher.tueA;
      this.tueE = viewTeacher.teacher.tueE;
      this.wedM = viewTeacher.teacher.wedM;
      this.wedA = viewTeacher.teacher.wedA;
      this.wedE = viewTeacher.teacher.wedE;
      this.thuM = viewTeacher.teacher.thuM;
      this.thuA = viewTeacher.teacher.thuA;
      this.thuE = viewTeacher.teacher.thuE;
      this.friM = viewTeacher.teacher.friM;
      this.friA = viewTeacher.teacher.friA;
      this.friE = viewTeacher.teacher.friE;
      this.satM = viewTeacher.teacher.satM;
      this.satA = viewTeacher.teacher.satA;
      this.satE = viewTeacher.teacher.satE;
      this.sunM = viewTeacher.teacher.sunM;
      this.sunA = viewTeacher.teacher.sunA;
      this.sunE = viewTeacher.teacher.sunE;
    })
  } else {
    if(!this.viewTeacherID) {
      this.isParams = false;
      this.authService.getProfile().subscribe(schedule => {
        this.monM = schedule.user.monM;
        this.monA = schedule.user.monA;
        this.monE = schedule.user.monE;
        this.tueM = schedule.user.tueM;
        this.tueA = schedule.user.tueA;
        this.tueE = schedule.user.tueE;
        this.wedM = schedule.user.wedM;
        this.wedA = schedule.user.wedA;
        this.wedE = schedule.user.wedE;
        this.thuM = schedule.user.thuM;
        this.thuA = schedule.user.thuA;
        this.thuE = schedule.user.thuE;
        this.friM = schedule.user.friM;
        this.friA = schedule.user.friA;
        this.friE = schedule.user.friE;
        this.satM = schedule.user.satM;
        this.satA = schedule.user.satA;
        this.satE = schedule.user.satE;
        this.sunM = schedule.user.sunM;
        this.sunA = schedule.user.sunA;
        this.sunE = schedule.user.sunE;
      });
    }
  }
});
}

}
