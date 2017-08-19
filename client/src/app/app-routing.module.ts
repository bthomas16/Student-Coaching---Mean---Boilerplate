import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';

import { StudentRegisterComponent} from './components/student/student-register/student-register.component';
import { StudentLoginComponent } from './components/student/student-login/student-login.component';
import { StudentProfileComponent } from './components/student/student-profile/student-profile.component';

import { TeacherRegisterComponent} from './components/teacher/teacher-register/teacher-register.component';
import { TeacherLoginComponent } from './components/teacher/teacher-login/teacher-login.component';
import { TeacherProfileComponent } from './components/teacher/teacher-profile/teacher-profile.component';

import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';


const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'student/register', component: StudentRegisterComponent, canActivate: [NotAuthGuard] },
  { path: 'teacher/register', component: TeacherRegisterComponent },
  { path: 'student/login', component: StudentLoginComponent, canActivate: [NotAuthGuard] },
  { path: 'teacher/login', component: TeacherLoginComponent, canActivate: [NotAuthGuard] },
  { path: 'student/profile', component: StudentProfileComponent, canActivate: [AuthGuard]},
  { path: 'teacher/profile', component: TeacherProfileComponent, canActivate: [AuthGuard]},


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
