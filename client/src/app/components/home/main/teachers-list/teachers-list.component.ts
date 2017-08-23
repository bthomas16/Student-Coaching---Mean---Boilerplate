//
// import { Component, OnInit } from '@angular/core';
// // import { AuthService } from '../../../../services/auth.service';
// import { ApiService } from '../../../../services/api.service';
//
// @Component({
//   selector: 'app-teachers-list',
//   templateUrl: './teachers-list.component.html',
//   styleUrls: ['./teachers-list.component.css']
// })
// export class TeachersListComponent implements OnInit {
//   private teachersList;
//
//   constructor(private apiService: ApiService) {
//    }
//
//   getAllTeachers() {
//   // Function to GET all blogs from database
//   this.apiService.getAllTeachers().subscribe(data => {
//     this.teachersList = data.teachers; // Assign array to use in HTML
//   });
// }
//
//   ngOnInit() {
//     this.getAllTeachers();
//   }
//
// }
//
