import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';

import { UserRegisterComponent} from './components/user/user-register/user-register.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';

// import { TeacherRegisterComponent} from './components/teacher/teacher-register/teacher-register.component';
// import { TeacherLoginComponent } from './components/teacher/teacher-login/teacher-login.component';
// import { TeacherProfileComponent } from './components/teacher/teacher-profile/teacher-profile.component';

import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';


const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'register', component: UserRegisterComponent, canActivate: [NotAuthGuard] },
  // { path: 'teacher/register', component: TeacherRegisterComponent },
  { path: 'login', component: UserLoginComponent, canActivate: [NotAuthGuard] },
  // { path: 'teacher/login', component: TeacherLoginComponent, canActivate: [NotAuthGuard] },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  // { path: 'teacher/profile', component: TeacherProfileComponent, canActivate: [AuthGuard]},


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
