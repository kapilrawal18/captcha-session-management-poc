import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  profileList: any;
  contactDetailsList: any;
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = true;
  isShowing = false;
  showSubSubMenu: boolean = false;
  personalFlag: boolean = true;
  contactFlag:boolean = false;
  constructor(private service: AuthService,){

  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
  personalData(){
    this.personalFlag = true;
    this.contactFlag = false;
  }
  contactData(){
    this.personalFlag = false;
    this.contactFlag = true;
  }
  ngOnInit(){
      const personal = JSON.parse(sessionStorage.getItem('personalDetails') as any)
      this.service.userIdDetails(personal.id,personal.actionToken).subscribe((res:any)=> {
        this.profileList = res;
        
      })

  }
}

