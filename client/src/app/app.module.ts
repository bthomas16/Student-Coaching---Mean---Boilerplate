import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { ShufflePipe } from 'ngx-pipes/src/app/pipes/array/shuffle';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';

import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';

import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { StudentProfileComponent } from './components/student/student-profile/student-profile.component';
import { TeacherProfileComponent } from './components/teacher/teacher-profile/teacher-profile.component';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { StudentAuthGuard } from './guards/student-auth.guard'
import { TeacherAuthGuard } from './guards/teacher-auth.guard'
import { NotAuthGuard } from './guards/notAuth.guard';
import { HeroComponent } from './components/home/main/hero/hero.component';
import { OptionsComponent } from './components/home/main/options/options.component';
import { TeachersListComponent } from './components/home/main/teachers-list/teachers-list.component';
import { FutureComponent } from './components/home/main/future/future.component';
import { BottomSignUpComponent } from './components/home/main/bottom-sign-up/bottom-sign-up.component';
import { FooterComponent } from './components/footer/footer.component';

import { FilterPipe } from './pipes/filter.pipe';
import { ChooseComponent } from './components/user/user-profile/choose/choose.component';
import { TeacherProfileMainComponent } from './components/teacher/teacher-profile/teacher-profile-main/teacher-profile-main.component';
import { TeacherProfileScheduleComponent } from './components/teacher/teacher-profile/teacher-profile-main/teacher-profile-schedule/teacher-profile-schedule.component';
import { TeacherProfileInfoComponent } from './components/teacher/teacher-profile/teacher-profile-main/teacher-profile-info/teacher-profile-info.component';
import { TeacherReviewsComponent } from './components/teacher/teacher-profile/teacher-profile-main/teacher-reviews/teacher-reviews.component';
import { TeacherRatingsComponent } from './components/user/view-teacher-profile/teacher-ratings/teacher-ratings.component';

import { CookieService } from 'ngx-cookie-service';
import { ProfessionalismComponent } from './components/user/view-teacher-profile/teacher-ratings/professionalism/professionalism.component';
import { KnowledgeComponent } from './components/user/view-teacher-profile/teacher-ratings/knowledge/knowledge.component';
import { TeachingAbilityComponent } from './components/user/view-teacher-profile/teacher-ratings/teaching-ability/teaching-ability.component';
import { ViewTeacherProfileComponent } from './components/user/view-teacher-profile/view-teacher-profile.component';
import { TeacherSkillsComponent } from './components/teacher/teacher-profile/teacher-profile-main/teacher-skills/teacher-skills.component';

// import { Ng2UploaderModule } from 'ng2-uploader';
import { NgUploaderModule } from 'ngx-uploader';
import { FeaturedTeacherComponent } from './components/user/user-profile/featured-teacher/featured-teacher.component';
import { UserLoginRedirectComponent } from './components/user/user-login/user-login-redirect/user-login-redirect.component';
import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { ContactComponent } from './components/company-info/contact/contact.component';
import { AboutComponent } from './components/company-info/about/about.component';
import { ShortenPipe } from './pipes/shorten.pipe';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UserRegisterComponent,
    UserLoginComponent,
    UserProfileComponent,
    HeroComponent,
    OptionsComponent,
    TeachersListComponent,
    FutureComponent,
    FilterPipe,
    ShufflePipe,
    BottomSignUpComponent,
    FooterComponent,
    ChooseComponent,
    StudentProfileComponent,
    TeacherProfileComponent,
    TeacherProfileMainComponent,
    TeacherProfileScheduleComponent,
    TeacherProfileInfoComponent,
    TeacherReviewsComponent,
    TeacherRatingsComponent,
    ProfessionalismComponent,
    KnowledgeComponent,
    TeachingAbilityComponent,
    ViewTeacherProfileComponent,
    TeacherSkillsComponent,
    FeaturedTeacherComponent,
    UserLoginRedirectComponent,
    CompanyInfoComponent,
    ContactComponent,
    AboutComponent,
    ShortenPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    FlashMessagesModule,
    NgUploaderModule
  ],
  providers: [AuthService, ApiService, AuthGuard, StudentAuthGuard, TeacherAuthGuard, NotAuthGuard, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
