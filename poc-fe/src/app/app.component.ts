import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-login';
  dashboardflag = false;
  constructor( private router: Router,){
    const events = router.events.pipe(filter(event => event instanceof NavigationEnd));
    events.subscribe((e: any) => {
      console.log('e',e);
      let url = e.urlAfterRedirects.split('/')
      let issettings = url.includes('dashboard')
      if (issettings) {
       this.dashboardflag = true;
      }else {
        this.dashboardflag = false;
      }
    })
  }
}

