import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';

import { UserRegisterComponent} from './components/user/user-register/user-register.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { ViewTeacherProfileComponent } from './components/user/view-teacher-profile/view-teacher-profile.component';
import { ViewStudentProfileComponent } from './components/user/view-student-profile/view-student-profile.component';

import { StudentProfileComponent } from './components/student/student-profile/student-profile.component';
import { TeacherProfileComponent } from './components/teacher/teacher-profile/teacher-profile.component';
import { UserLoginRedirectComponent } from './components/user/user-login/user-login-redirect/user-login-redirect.component';
import { CompanyInfoComponent } from './components/company-info/company-info.component';

import { AuthGuard } from './guards/auth.guard';
import { StudentAuthGuard } from './guards/student-auth.guard';
import { TeacherAuthGuard } from './guards/teacher-auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, canActivate: [NotAuthGuard], data: {state: 'home'}},
  { path: 'register', component: UserRegisterComponent, canActivate: [NotAuthGuard] },
  { path: 'login', component: UserLoginRedirectComponent, canActivate: [NotAuthGuard] },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard], data: {state: 'profile'}},
  { path: 'profile/student', component: StudentProfileComponent, canActivate: [AuthGuard], data: {state: 'studentProfile'}},
  { path: 'profile/teacher', component: TeacherProfileComponent, canActivate: [AuthGuard], data: {state: 'teacherProfile'}},
  { path: 'view-teacher-profile/:id', component: ViewTeacherProfileComponent, canActivate: [AuthGuard], data: {state: 'viewTeacher'}},
  { path: 'view-student-profile/:id', component: ViewStudentProfileComponent, canActivate: [AuthGuard], data: {state: 'viewStudent'}},
  {path: 'company-info', component: CompanyInfoComponent, data: {state: 'companyInfo'}},
  { path: '**', component: HomeComponent}

]


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes, {
    useHash: true
  })
],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule {}
