import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditAdminProfileComponent } from '../edit-admin-profile/edit-admin-profile.component';
import { ViewAdminProfileComponent } from '../view-admin-profile/view-admin-profile.component';
import moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = ['demo-id', 'demo-fullName', 'demo-username', 'demo-createdAt','demo-email',  'demo-updatedOn' ,'actions'];
  commonServiceSubscription: Subscription;
  selectedUser: any;
  actionToken: any;
  showDetailsForm = true;
  openEditDialog: boolean = false;

  constructor(private service: AuthService, public editDialog: MatDialog) {
    this.commonServiceSubscription = this.service.getMessage.subscribe(res => {
      if (res) {
        this.selectedUser = res;
      }
    });
  }

  ngOnInit(): void {
    this.getTableData();
  }

  getTableData() {
    const getList: any = sessionStorage.getItem('personalDetails');   
    const parseList = JSON.parse(getList);
    this.service.GetAllUser(parseList.actionToken).subscribe(res => {
      let accholder:any = res;
      accholder = accholder.filter((item: { role: string; }) => {
        return item.role === 'ACCOUNT_HOLDER';
      })
      this.dataSource = accholder;
    })
  }

  openViewDialogForAdmin(code: any) { 
    const dialogRef = this.editDialog.open(ViewAdminProfileComponent, {
      width: '50%',
      data: {
        fullName: code.fullName,
        userName: code.username,
        createdOn: code.createdAt,
        updatedOn: code.updatedAt,
        email: code.email,
        nationality: code.nationality,
        gender: code.gender,
        dob: moment(code.dob).format('DD/MM/YYYY'),
        phoneNumber: code.phoneNumber,
        address:code.address
      }
    })
    this.getTableData();
  }

  openEditDialogForAdmin(code: any): void {
    if(code?.address) {
      code.address.dialCode = code.countryCode;
      code.address.phoneNumber = code.phoneNumber;
    }
    const dialogRef = this.editDialog.open(EditAdminProfileComponent, {
      width: '50%',
      data: {
        fullName: code.fullName,
        userName: code.username,
        createdOn: code.createdAt,
        updatedOn: code.updatedOn,
        email: code.email,
        password: code.password,
        id: code.id,
        gender: code.gender,
        nationality: code.nationality,
        dateOfBirth:moment(code.dob).toDate(),
        contactDetails: code.address ? code.address : {}
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dataSource.forEach((element: any)=> {
          if(element.id === result.id){
            element.username = result.adminProfileForm.userName;
            element.fullName = result.adminProfileForm.fullName;
            element.createdAt = result.adminProfileForm.createdOn;
            element.updatedOn = result.adminProfileForm.updatedOn;
            element.email = result.adminProfileForm.email;
            element.gender = result.adminProfileForm.gender;
            element.dob = result.adminProfileForm.dateOfBirth;
            element.nationality = result.adminProfileForm.nationality;
            element.phoneNumber = result.contactDetails.phoneNumber;
            element.countryCode = result.contactDetails.dialCode;
            element.address = result.contactDetails;
          }
      });
      }
    })
  }



  // editAdminDetails(code: any , title: any){
  // let adminEditModel =   this.adminRoleDialog.open(EditAdminProfileComponent, {
  //     width: '50%' ,
  //     enterAnimationDuration: '100ms',
  //     exitAnimationDuration: '100ms', 
  //     data:{
  //       title: title,
  //       code: code
  //     }
  //   })
  //   adminEditModel.afterClosed().subscribe( item =>{
  //     console.log(item);
  //   })

  //   // console.log(element);

  // }

  //  isOrioninc(email: any): boolean {
  //   let isOrionInc = false;
  //   let index = email.indexOf("@");
  //   let mySlice = (email.slice(index)).toLowerCase();
  //   if (mySlice === '@orioninc.com') {
  //     isOrionInc = true;
  //   } else {
  //     isOrionInc = false;
  //   }
  //   return isOrionInc;
  // }

  ngOnDestroy(): void {
    this.commonServiceSubscription.unsubscribe();
  }
}


