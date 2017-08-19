import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class TeacherAuthService {
  server = "http://localhost:8080";
  authToken;
  teacher;
  options;

  constructor(private http: Http) { }

  createTeacherAuthenticationHeaders(){
    // load token from loadTeacherToken()
    this.loadTeacherToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'teacher-authorization': this.authToken
      })
    });
  }

  loadTeacherToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

registerTeacher(teacher) {
  return this.http.post(this.server + '/teacher-authentication/teacher/register', teacher).map(res => res.json());
  }

checkTeacherEmail(email) {
  return this.http.get(this.server + '/teacher-authentication/teacher/register/check-email/' + email).map(res => res.json());
  }

  teacherLogin(teacher) {
    return this.http.post(this.server + '/teacher-authentication/teacher/login', teacher).map(res => res.json());
    }

  teacherLogout(){
    this.authToken = null;
    this.teacher = null;
    localStorage.clear();

    }

  storeTeacherData(token, teacher) {
    localStorage.setItem('token', token);
    localStorage.setItem('teacher', JSON.stringify(teacher));
    this.authToken = token;
    this.teacher = teacher
    }

    getTeacherProfile() {
      this.createTeacherAuthenticationHeaders();
      return this.http.get(this.server + '/teacher-authentication/teacher/profile', this.options).map(res => res.json());
    }

    loggedInTeacher() {
      return tokenNotExpired();
    }

  }
