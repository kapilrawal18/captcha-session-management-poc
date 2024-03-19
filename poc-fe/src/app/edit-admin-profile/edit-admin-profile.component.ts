import { Component, EventEmitter, Inject, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../service/auth.service';
import  moment  from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-admin-profile',
  templateUrl: './edit-admin-profile.component.html',
  styleUrls: ['./edit-admin-profile.component.css'],
 })
export class EditAdminProfileComponent implements OnInit {
  adminProfileForm: FormGroup;
  adminProfileContactForm:FormGroup;
  inputAdminData: any;
  editAdminData: any;
  countryList: any;
  DoBForm: boolean;
  stateList:any;
  cityList:any;
  panelOpenStateForPersonal:boolean = false;
  panelOpenStateForContact:boolean = false;
  public setCityValue:boolean = false;
  showDetailsForm: boolean;
  contactDetailsList: { id: any; adminProfileForm: any; contactDetails: any; };
  contactDetailsFlag: boolean;
  
  constructor(
    private closeAdminDialog: MatDialogRef<EditAdminProfileComponent>,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditAdminProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: AuthService, public toast: ToastrService,
  ) {
    this.adminProfileForm = this.formBuilder.group({
      fullName: [this.formBuilder.control(''),  Validators.required ],
      userName: [this.formBuilder.control(''), Validators.required],
      createdOn: [this.formBuilder.control(''), Validators.required],
      email: [this.formBuilder.control(''), Validators.required],
      dateOfBirth: [this.formBuilder.control('') , Validators.required],
      gender: [this.formBuilder.control('')],
      nationality: [this.formBuilder.control('')]
    });

    this.adminProfileContactForm = this.formBuilder.group ({
      addressLine1:this.formBuilder.control('',Validators.compose([Validators.required])),
      addressLine2:this.formBuilder.control('',Validators.compose([Validators.required])),
      dialCode:this.formBuilder.control('',Validators.compose([Validators.required])),
      phoneNumber:this.formBuilder.control('',Validators.compose([Validators.required])),
      country:this.formBuilder.control('',Validators.compose([Validators.required])),
      city:this.formBuilder.control('',Validators.compose([Validators.required])),
      state:this.formBuilder.control('',Validators.compose([Validators.required])),
      pinCode:this.formBuilder.control('',Validators.compose([Validators.required])),
    });
  
    if (data) {
      this.service.getCountryList().subscribe(value => {
        this.setCityValue = true;
        this.countryList = value;
        this.adminProfileForm.patchValue(data);
        if(data?.contactDetails?.country) {
          this.adminProfileContactForm.patchValue(data.contactDetails);
          this.onChangeCategory(data.contactDetails.country);
        }
      })
    }
   
  }
  
  ngOnInit(): void {}

  updateAdminUser(): void {
    if (this.adminProfileForm.valid) {
    const tok = JSON.parse(sessionStorage.getItem('personalDetails')!)
    this.service.updateUserDetails(this.data.id, this.getuserDataObj(), tok.actionToken)
    .subscribe(res => {
         res ;
      console.log('updated user data from edit component --->' , res);
        let valueId = {
        id: this.data.id,
        adminProfileForm: this.adminProfileForm.value,
        contactDetails: this.adminProfileContactForm.value
      }
      sessionStorage.setItem('ContactDetails', JSON.stringify(valueId));
      this.contactDetailsList = valueId;
      this.showDetailsForm = false;
      this.contactDetailsFlag = true;
      this.toast.success("", "User data updated successfully");
      this.dialogRef.close(valueId);
    }, (err) => {
      this.toast.error("", err.message); 
    })
  }
}

numberOnly(event:any): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;

}

onChangeCategory(value:any){
  const getCountryList = this.countryList.filter((data:any)=> data.name === value);
  this.adminProfileContactForm.controls['dialCode'].setValue(getCountryList[0].dial_code);
  this.service.getCountries().subscribe((val: any) => {
  val.data.filter((data:any)=> {
    if (data.name === value) {
      this.service.GetAllState(data.id).subscribe((res: any) => {
        if(res && res.data){
        this.stateList = res.data;
        //for call city list to pooulate city date
        if(this.setCityValue) {
          this.onChangeState(this.adminProfileContactForm.controls['state'].value);
          this.setCityValue = false;
        }
        }
                console.log(res)
              })
    }
  })

})

}

onChangeState(event:any){
  const getStateList = this.stateList.filter((data:any)=> data.name === event);
  if(getStateList && getStateList.length >0){
    this.service.getCities(getStateList[0].id).subscribe((res:any)=>{
      this.cityList = res.data;
    })
  }
}

getuserDataObj():object{
  const updatedData: object = {
    fullName: this.adminProfileForm.get('fullName')?.value,
    email: this.adminProfileForm.get('email')?.value,
    role:'ACCOUNT_HOLDER',
    dob: moment(this.adminProfileForm.get('dateOfBirth')?.value).format('DD/MM/YYYY'),
    gender: this.adminProfileForm.get('gender')?.value,
    nationality: this.adminProfileForm.get('nationality')?.value,
    countryCode: this.adminProfileContactForm.controls['dialCode'].value,
    phoneNumber: this.adminProfileContactForm.controls['phoneNumber'].value,
    address: {
      addressLine1: this.adminProfileContactForm.controls['addressLine1'].value,
      addressLine2: this.adminProfileContactForm.controls['addressLine2'].value,
      city: this.adminProfileContactForm.controls['city'].value,
      state: this.adminProfileContactForm.controls['state'].value,
      pinCode: this.adminProfileContactForm.controls['pinCode'].value,
      country: this.adminProfileContactForm.controls['country'].value
    }
  };
  console.log('user data updated --------->' , updatedData);
  return updatedData;
}

updateCalcs(event: any){
  var diff =(new Date().getTime() - this.adminProfileForm.value.dateOfBirth.getTime()) / 1000;
  diff /= (60 * 60 * 24);
  let age=Math.abs(Math.round(diff/365.25))

  if(age>=18){
    this.DoBForm=false   
    this.adminProfileForm.controls['dateOfBirth'].setErrors(null); 
       
  } else  { 
      this.DoBForm=true;
      this.adminProfileForm.controls['dateOfBirth'].setErrors({required: true}); 
  }
}
 
  closeAdminEditDialog() {
    this.closeAdminDialog.close();
  }

  public closeBtn():void {
    if(this.adminProfileForm.dirty || this.adminProfileContactForm.dirty) {
      if(confirm("Are yo sure want to close this? if yes, your data will not be saved")) {
        this.closeAdminEditDialog();
      }
    } else {
      this.closeAdminEditDialog();
    }
  }
}
