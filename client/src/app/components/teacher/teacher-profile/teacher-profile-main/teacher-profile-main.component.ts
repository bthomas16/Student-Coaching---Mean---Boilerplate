import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-teacher-profile-main',
  templateUrl: './teacher-profile-main.component.html',
  styleUrls: ['./teacher-profile-main.component.css']
})
export class TeacherProfileMainComponent implements OnInit {
  constructor(){}

  ngOnInit() {
 }
}
