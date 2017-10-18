import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-future',
  templateUrl: './future.component.html',
  styleUrls: ['./future.component.css']
})
export class FutureComponent implements OnInit {
  email;
  skillToLearn;
  message;
  messageClass;
  processing: boolean = false;
  canShowMessage: boolean = false;



  constructor(private apiService: ApiService) { }

  getEmail(event) {
    this.email = event.target.value;
    console.log(this.email)
  }

  getTextArea(event) {
    this.skillToLearn = event.target.value;
    console.log(this.skillToLearn)
  }

  wantToLearnSubmit() {
    this.processing = true;
    let learner = {
      email: this.email,
      skillToLearn: this.skillToLearn
    }
    this.apiService.wantToLearn(learner).subscribe(data => {
    if (!data.success) {
      this.canShowMessage = true;
      this.messageClass = 'alert alert-danger';
      this.message = data.message;
      console.log(this.message)
      setTimeout(() => {
        this.processing = false;
        this.canShowMessage = false;
      }, 1400)
      this.canShowMessage = false;
    } else {
      this.canShowMessage = true;
      this.messageClass = 'alert alert-success';
      this.message = data.message;
      console.log(this.message)
      setTimeout(() => {
        this.processing = false;
        this.canShowMessage = false;
      }, 1400)
    }
  });
  }


  ngOnInit() {
  }

}
