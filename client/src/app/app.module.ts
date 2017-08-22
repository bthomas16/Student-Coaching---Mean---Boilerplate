import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { StudentRegisterComponent } from './components/student/student-register/student-register.component';
import { StudentLoginComponent } from './components/student/student-login/student-login.component';
import { TeacherRegisterComponent } from './components/teacher/teacher-register/teacher-register.component';
import { TeacherLoginComponent } from './components/teacher/teacher-login/teacher-login.component';

import { StudentAuthService } from './services/student-auth.service';
import { TeacherAuthService } from './services/teacher-auth.service';
import { ApiService } from './services/api.service';

import { StudentProfileComponent } from './components/student/student-profile/student-profile.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { HeroComponent } from './components/home/main/hero/hero.component';
import { OptionsComponent } from './components/home/main/options/options.component';
import { FutureComponent } from './components/home/main/future/future.component';
import { TeachersListComponent } from './components/home/main/teachers-list/teachers-list.component';
import { BottomSignUpComponent } from './components/home/main/bottom-sign-up/bottom-sign-up.component';
import { FooterComponent } from './components/footer/footer.component';
import { TeacherProfileComponent } from './components/teacher/teacher-profile/teacher-profile.component';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    StudentRegisterComponent,
    StudentLoginComponent,
    TeacherRegisterComponent,
    TeacherLoginComponent,
    StudentProfileComponent,
    HeroComponent,
    OptionsComponent,
    FutureComponent,
    FilterPipe,
    TeachersListComponent,
    BottomSignUpComponent,
    FooterComponent,
    TeacherProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    FlashMessagesModule
  ],
  providers: [StudentAuthService, TeacherAuthService, ApiService, AuthGuard, NotAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
