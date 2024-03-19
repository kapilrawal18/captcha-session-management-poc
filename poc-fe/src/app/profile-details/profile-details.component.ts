import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import moment from 'moment';
@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit{
  profileForm: FormGroup;
  countryList: any;
  showDetailsForm = true;
  DoBForm = false;
  profileList: any;
  triggerRect: ClientRect;
  stateList:any;
  cityList:any;
selectedTabIndex = 0;
selectedIndex=1;
tabIndexDisabled: boolean = false
contactDetailsList: any;
isDisabled:boolean = true;
  contactDetailsForms: FormGroup;
  contactDetailsFlag: boolean = false;
  @ViewChild('trigger') trigger: any;
  @ViewChild('inputNumber') inputNumber: any;
  constructor(private builder: FormBuilder,      private router:Router,   private service: AuthService,  private _mdr: MatDialogRef<ProfileDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.initialForm();
       
   
  }
  initialForm() {
    this.profileForm = this.builder.group({
      fullName: this.builder.control('', Validators.compose([Validators.required])),
      email: this.builder.control('', Validators.compose([Validators.required])),
      nationality: this.builder.control('', Validators.compose([Validators.required])),
      DOB: this.builder.control('', Validators.compose([Validators.required])),
      gender: this.builder.control('', Validators.compose([Validators.required])),
    });
    this.contactDetailsForms = this.builder.group({
      addressLine1:this.builder.control('',Validators.compose([Validators.required])),
      addressLine2:this.builder.control(''),
      dialCode:this.builder.control('',Validators.compose([Validators.required])),
      phoneNumber:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(10)])),
      state:this.builder.control('', Validators.compose([Validators.required])),
      city:this.builder.control('', Validators.compose([Validators.required])),
      country:this.builder.control('', Validators.compose([Validators.required])),
      pinCode:this.builder.control('', Validators.compose([Validators.required,Validators.minLength(5)]))
    })
  }
  ngOnInit(){
    const formData = this.data;
    this.profileForm.controls['fullName'].setValue(formData.fullName);
    this.profileForm.controls['email'].setValue(formData.email);
    this.profileForm.controls['DOB'].setValue(new Date(formData.DOB));
    this.profileForm.controls['gender'].setValue(formData.gender);
    this.profileForm.controls['nationality'].setValue(formData.nationality);
    this.service.getCountryList().subscribe(value=>{
      this.countryList = value
    })
    if(this.profileForm.valid){
      this.showDetailsForm = true;
      this.selectedTabIndex = 1;
    this.tabIndexDisabled = true;
    }
  }
  onChangeCategory(value:any){
    const getCountryList = this.countryList.filter((data:any)=> data.name === value);
    this.contactDetailsForms.controls['dialCode'].setValue(getCountryList[0].dial_code);
    this.contactDetailsForms.controls['state'].setValue(' ');
    this.contactDetailsForms.controls['state'].setErrors(null);
    this.contactDetailsForms.controls['city'].setValue(' ');
    this.contactDetailsForms.controls['city'].setErrors(null);
    this.service.getCountries().subscribe((val: any) => {
    val.data.filter((data:any)=> {
      if (data.name === value) {
        this.service.GetAllState(data.id).subscribe((res: any) => {
if(res && res.data){
  this.stateList = res.data;
}
          console.log(res)
        })
      }
    })

})

  }
  onChangedialCode (event: any){
    const getSelectedLIst = this.countryList.filter((t:any)=> t.dial_code === event);
    this.contactDetailsForms.controls['country'].setValue(getSelectedLIst[0].name);
    this.onChangeCategory(getSelectedLIst[0].name)
  }

  onChangeState(event: any) {
    const getStateList = this.stateList.filter((data: any) => data.name === event);
    if (getStateList && getStateList.length > 0) {
      this.service.getCities(getStateList[0].id).subscribe((res: any) => {
        this.cityList = res.data;
      })
    }

  }
  proceedUpdate(){
   if(this.profileForm.valid){
      const createObj: any = {
        id: this.data.id,
        dob: this.profileForm.value.DOB,
        gender: this.profileForm.value.gender,
        nationality: this.profileForm.value.nationality,
        fullname: this.data.fullName,
        username: this.data.userName,
        email: this.data.email,
        actionToken: this.data.actionToken
      }
      // const serializedForm = JSON.stringify(this.profileForm.value);
      sessionStorage.setItem('personalDetails', JSON.stringify(createObj));
      this.profileList = createObj;
      this.showDetailsForm = false;
    }
  }
  proceedContactUpdate(){
    if(this.contactDetailsForms.valid){
    const createobj = {
      userId:this.data.id,
    addressLine1:this.contactDetailsForms.value.addressLine1,
    addressLine2:this.contactDetailsForms.value.addressLine2,
    countryCode:this.contactDetailsForms.value.dialCode,
    state:this.contactDetailsForms.value.state,
    city:this.contactDetailsForms.value.city,
    country:this.contactDetailsForms.value.country,
    pinCode:this.contactDetailsForms.value.pinCode,
    phoneNumber:this.contactDetailsForms.value.phoneNumber,
  }
  sessionStorage.setItem('ContactDetails', JSON.stringify(createobj));
      this.contactDetailsList = createobj;
      this.showDetailsForm = false;
      this.contactDetailsFlag = true;

}
}
  selectSubmitBtn(){
    const createObj: any= {
      id: this.data.id,
      dob: moment(this.profileForm.value.DOB).format('DD/MM/YYYY'),
      gender:this.profileForm.value.gender,
      nationality:this.profileForm.value.nationality,
      fullname:this.data.fullName,
      username:this.data.userName,
      email:this.data.email
    }
    this.service.userPersonalDetails(createObj, this.data.actionToken).subscribe(res=>{
      this.showDetailsForm = true;
      this.selectedTabIndex = 1;
    this.tabIndexDisabled = true;
    })
 
  }

  selectContactSubmitBtn (){
    if(this.contactDetailsForms.valid){
      const createobj = {
        userId:this.data.id,
      addressLine1:this.contactDetailsForms.value.addressLine1,
      addressLine2:this.contactDetailsForms.value.addressLine2,
      countryCode:this.contactDetailsForms.value.dialCode,
      state:this.contactDetailsForms.value.state,
      city:this.contactDetailsForms.value.city,
      country:this.contactDetailsForms.value.country,
      pinCode:this.contactDetailsForms.value.pinCode,
      phoneNumber:this.contactDetailsForms.value.phoneNumber,
      }
    this.service.saveContactDetails(createobj, this.data.actionToken).subscribe((res: any)=>{
      this.router.navigate(['/dashboard']);
      this._mdr.close(true)
    })

  }
}
  closePopup(){
    this._mdr.close();
  }
  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  updateCalcs(event: any){
    var diff =(new Date().getTime() - this.profileForm.value.DOB.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    let age=Math.abs(Math.round(diff/365.25))

    if(age>=18){
      this.DoBForm=false   
      this.profileForm.controls['DOB'].setErrors(null); 
         
    } else  { 
        this.DoBForm=true;
        this.profileForm.controls['DOB'].setErrors({required: true}); 
    }
  }
  backToPopup() {
    this.showDetailsForm = true;
  }
  backToContactPopup(){
    this.showDetailsForm = true;
    this.selectedTabIndex = 1;
    this.tabIndexDisabled = true;
    this.contactDetailsFlag = false;
  }
  }

