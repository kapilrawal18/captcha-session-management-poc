import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BlockCopyPasteDirective } from './service/block-text';
import { AuthService } from './service/auth.service';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { SessionTimeoutComponent } from './session-timeout/session-timeout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditAdminProfileComponent } from './edit-admin-profile/edit-admin-profile.component';
import { ViewAdminProfileComponent } from './view-admin-profile/view-admin-profile.component';
import {MatIconModule} from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    
    BlockCopyPasteDirective,
    ProfileDetailsComponent,
    SessionTimeoutComponent,
    DashboardComponent,
    EditAdminProfileComponent,
    ViewAdminProfileComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatTooltipModule,
    MatExpansionModule,
    ToastrModule.forRoot(),
    
  ],
  entryComponents: [SessionTimeoutComponent],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
