import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';

import { UserRegisterComponent} from './components/user/user-register/user-register.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { ViewTeacherProfileComponent } from './components/user/view-teacher-profile/view-teacher-profile.component';

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
  { path: 'home', component: HomeComponent },
  { path: 'register', component: UserRegisterComponent, canActivate: [NotAuthGuard] },
  { path: 'login', component: UserLoginRedirectComponent, canActivate: [NotAuthGuard] },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  { path: 'profile/student', component: StudentProfileComponent, canActivate: [AuthGuard]},
  { path: 'profile/teacher', component: TeacherProfileComponent, canActivate: [AuthGuard]},
  { path: 'view-teacher-profile/:id', component: ViewTeacherProfileComponent, canActivate: [AuthGuard]},
  {path: 'company-info', component: CompanyInfoComponent},
  { path: '**', component: HomeComponent}

]


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }
