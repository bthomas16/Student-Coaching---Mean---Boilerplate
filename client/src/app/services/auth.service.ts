import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  server = "http://localhost:8080";
  authToken;
  student;
  options;

  constructor(private http: Http) { }

  createStudentAuthenticationHeaders(){
    // load token from loadStudentToken()
    this.loadStudentToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'student-authorization': this.authToken
      })
    });
  }

  loadStudentToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

registerStudent(student) {
  return this.http.post(this.server + '/authentication/student/register', student).map(res => res.json());
  }

checkStudentEmail(email) {
  return this.http.get(this.server + '/authentication/student/register/check-email/' + email).map(res => res.json());
  }

  studentLogin(student) {
    return this.http.post(this.server + '/authentication/student/login', student).map(res => res.json());
    }

  studentLogout(){
    this.authToken = null;
    this.student = null;
    localStorage.clear();

    }

  storeStudentData(token, student) {
    localStorage.setItem('token', token);
    localStorage.setItem('student', JSON.stringify(student));
    this.authToken = token;
    this.student = student
    }

    getStudentProfile() {
      this.createStudentAuthenticationHeaders();
      return this.http.get(this.server + '/authentication/student/profile', this.options).map(res => res.json());
    }

    loggedIn() {
      return tokenNotExpired();
    }

  }
