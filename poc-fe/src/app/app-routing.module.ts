import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:'',component:LoginComponent },
  {path:'home',component:HomeComponent,  canActivate:[AuthGuard] },
  {path:'register',component:RegisterComponent },
  {path:'login',component:LoginComponent },
  {path:'dashboard',component:DashboardComponent,  canActivate:[AuthGuard] },
  {path: '**' , redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
