import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { StudentRegisterComponent } from './components/student/student-register/student-register.component';
import { StudentLoginComponent } from './components/student/student-login/student-login.component';
import { TeacherRegisterComponent } from './components/teacher/teacher-register/teacher-register.component';
import { TeacherLoginComponent } from './components/teacher/teacher-login/teacher-login.component';

import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    StudentRegisterComponent,
    StudentLoginComponent,
    TeacherRegisterComponent,
    TeacherLoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
