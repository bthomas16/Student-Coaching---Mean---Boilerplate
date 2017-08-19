import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';

import { StudentRegisterComponent} from './components/student/student-register/student-register.component';
import { StudentLoginComponent } from './components/student/student-login/student-login.component';
import { StudentProfileComponent } from './components/student/student-profile/student-profile.component';

import { TeacherRegisterComponent} from './components/teacher/teacher-register/teacher-register.component';
import { TeacherLoginComponent } from './components/teacher/teacher-login/teacher-login.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'student/register', component: StudentRegisterComponent },
  { path: 'teacher/register', component: TeacherRegisterComponent },
  { path: 'student/login', component: StudentLoginComponent },
  { path: 'teacher/login', component: TeacherLoginComponent },
  { path: 'student/profile', component: StudentProfileComponent},


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
