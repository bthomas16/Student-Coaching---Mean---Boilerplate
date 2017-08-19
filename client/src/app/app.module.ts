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
import { StudentProfileComponent } from './components/student/student-profile/student-profile.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    StudentRegisterComponent,
    StudentLoginComponent,
    TeacherRegisterComponent,
    TeacherLoginComponent,
    StudentProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    FlashMessagesModule
  ],
  providers: [AuthService, AuthGuard, NotAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
