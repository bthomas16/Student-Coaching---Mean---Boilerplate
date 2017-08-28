import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ApiService {

  options;
  // development server
  // server = "http://localhost:8080";
  // production server
  server = "";

  constructor(
    public authService: AuthService,
    private http: Http
  ) { }

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authService.authToken // Attach token
      })
    });
  }

getAllTeachers() {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.server + '/api/get-all-teachers', this.options).map(res => res.json());
  }
}
