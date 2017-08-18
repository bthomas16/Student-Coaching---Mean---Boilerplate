import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  server = "http://localhost:8080";

  constructor(private http: Http) { }

registerStudent(student) {
  return this.http.post(this.server + '/authentication/student/register', student).map(res => res.json());
  }

checkEmail(email) {
  return this.http.get(this.server + '/authentication/student/register/check-email/' + email).map(res => res.json());
  }

}
