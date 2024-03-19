import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { CommonService } from '../service/common.service';
export class sessionTimeout {
  title='Are you still there?';
  subTitle: 'Your session will expire soon! For your security, you will be logged out in …';
  warning:'Do you want to stay logged in?';
  logout:'Logout Now';
  staySignIn: 'Stay Logged In';
};
@Component({
  selector: 'app-session-timeout',
  templateUrl: './session-timeout.component.html',
  styleUrls: ['./session-timeout.component.css']
})
export class SessionTimeoutComponent {
  sessionTimeoutData :sessionTimeout;
  // buttons = BUTTONS;
  minutes: any;
  seconds: any;
  interval: any;
  routerPage: string;
  updatedTimerValueSubscription: Subscription;
  constructor(public dialogRef: MatDialogRef<SessionTimeoutComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,
    private commonService: CommonService,
    private readonly router: Router,
    // private readonly keycloakService: KeycloakService,
    ) {
      const events = router.events.pipe(filter(event => event instanceof NavigationEnd));
      events.subscribe((e: any) => {
        console.log('e',e);
        let url = e.urlAfterRedirects.split('/');
        this.routerPage = url;
        // let issettings = url.includes('dashboard')
      })
    this.updatedTimerValueSubscription = this.commonService.updatedTimerValue.subscribe(duration => {
      if (this.router.url.split('/')[1] !== 'logout') {
        if (duration <= 60000) {
          this.interval = setInterval(() => {
            let sec;
            sec = Math.floor((duration / 1000) % 60),
              this.minutes = Math.floor((duration / (1000 * 60)) % 60),
              this.seconds = (sec < 10) ? "0" + sec : sec;
            if (duration >= 1000) {
              duration -= 1000;
            }
            if ((this.minutes === 0 || this.minutes < 0 )&& (sec === 0 || sec < 0)) {
              this.sessionLogout();
              clearInterval(this.interval);
            }
          }, 1000)
        }
      }
    })
  }

  ngOnInit(): void {
  }
  stayinLoginPage(){
   const path= this.router.url.split('/')[1]
    this.router.navigate([path]);
    this.dialogRef.close(true);
    clearInterval(this.interval);
  }
  ngOnDestroy(): void {
    if (this.updatedTimerValueSubscription) {
      this.updatedTimerValueSubscription.unsubscribe();
    }
  }

  closePopup() {
    this.router.navigate(['/login']);
    this.dialog.closeAll();
    clearInterval(this.interval);
  }

  logout(): void {
    // this.commonService.saveRTEValues(true);
    sessionStorage.clear();
    this.closePopup();
    localStorage.removeItem('isSessionExpired');
    // this.keycloakService.logout(environment.clientBaseUrl);
  }
  sessionLogout(): void {
    // this.commonService.saveRTEValues(true);
    sessionStorage.clear();
    localStorage.setItem('isSessionExpired', 'Y');
    this.dialog.closeAll();
    this.router.navigateByUrl('/login');
  }
}
