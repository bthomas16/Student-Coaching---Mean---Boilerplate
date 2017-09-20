import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
    // development server
  server = "http://localhost:8080/";
    // production server
  // server = ""
  authToken;
  user;
  options;
  studentLoggedIn;

  constructor(private http: Http) { }

  createAuthenticationHeaders(){
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authToken
      })
    });
  }

  loadToken() {
    const token = localStorage.getItem('token');
    return this.authToken = token;
  }

Register(user) {
  return this.http.post(this.server + 'authentication/register', user).map(res => res.json());
  }

  Email(emailSubscriber) {
    return this.http.post(this.server + 'api/email-subscriber', emailSubscriber).map(res => res.json());
    }

checkEmail(email) {
  return this.http.get(this.server + 'authentication/register/check-email/' + email).map(res => res.json());
  }

  checkEmailSubscriber(emailSubscriber) {
    return this.http.get(this.server + 'api/check-subscriber-email/' + emailSubscriber).map(res => res.json());
    }

  Login(user) {
    return this.http.post(this.server + 'authentication/login', user).map(res => res.json());
    }

  Logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    }

  storeData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user
    }

    getProfile() {
      this.createAuthenticationHeaders();
      return this.http.get(this.server + 'authentication/profile', this.options).map(res => res.json());
    }

    teacherCheck() {
      this.createAuthenticationHeaders();
      return this.http.get(this.server + 'authentication/profile/is-student', this.options).map(res => res.json());
    }

    loggedIn() {
      return tokenNotExpired();
    }

    updateStudent(user) {
        this.createAuthenticationHeaders();
        return this.http.put(this.server + 'authentication/become-student', user, this.options).map(res =>
          res.json())
      }

      updateTeacher(user) {
          this.createAuthenticationHeaders();
          return this.http.put(this.server + 'authentication/become-teacher', user, this.options).map(res =>
            res.json())
        }

      updateSchedule(schedule) {
          this.createAuthenticationHeaders();
          return this.http.put(this.server + 'authentication/update-schedule', schedule, this.options).map(res =>
            res.json())
        }

        onExperienceSubmit(experience) {
          this.createAuthenticationHeaders();
          console.log(experience);
          return this.http.put(this.server + 'authentication/experience', experience, this.options).map(res => res.json());
        }

        onInfoSubmit(info) {
          this.createAuthenticationHeaders();
          console.log(info);
          return this.http.put(this.server + 'authentication/info', info, this.options).map(res => res.json());
        }

        Rate(rated) {
            this.createAuthenticationHeaders();
            console.log(rated);
            return this.http.put(this.server + 'authentication/teacher-rating', rated, this.options).map(res =>
              res.json())
          }

          onGetRating() {
            this.createAuthenticationHeaders();
            return this.http.get(this.server + 'authentication/teacher-rating', this.options).map(res => res.json());
          }

          getSchedule() {
            this.createAuthenticationHeaders();
            return this.http.get(this.server + 'authentication/get-schedule', this.options).map(res => res.json());
          }

          studentCheck() {
            this.createAuthenticationHeaders();
            return this.http.get(this.server + 'authentication/profile/is-student', this.options).map(res => res.json());
          }


          isStudent():any {
            this.createAuthenticationHeaders();
            return this.studentCheck().subscribe(profile => {
              if (profile) {
               profile = true
               }
               profile = false
           })
          }

          isTeacher():any {
           this.createAuthenticationHeaders();
           return this.teacherCheck().subscribe(profile => {
              if (profile) {
                profile = true
              }
              profile = false
            })
           }

           getTeacherView(id) {
             this.createAuthenticationHeaders();
             return this.http.get(this.server + 'authentication/view-teacher-profile/' + id, this.options).map(res =>
               res.json());
           }

          //  startUpload(event) {
          //    this.createAuthenticationHeaders();
          //    console.log('service:', event);
          //    return this.http.post(this.server + 'authentication/avatar-upload', event, this.options).map(res =>
          //      res.json());
          //  }

}
