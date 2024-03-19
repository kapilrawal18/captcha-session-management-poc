import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { PatternValidatorsService } from '../service/patternvalidationservice';
import html2canvas from 'html2canvas';
import { ProfileDetailsComponent } from '../profile-details/profile-details.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IdleSessionTimeout } from "idle-session-timeout";
import { SessionTimeoutComponent } from '../session-timeout/session-timeout.component';
import { CommonService } from '../service/common.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
loginForm: FormGroup<any>;
getCaptchCode:any;
validationForCaptcha: any;
getUserList: any;
passwordValidation: any;
usernameValidation: any;
userNameList: any;
captchCode: string;
captchaUrl: any;
openedState: any = false;
btnsubmitDisabled = false;
// formDirective: FormGroupDirective;
session = new IdleSessionTimeout(2 * 60 * 1000);
@ViewChild('captchaImage', { static: true }) captchaImage!: ElementRef;
@ViewChild('formDirective') formDirective: NgForm;
matDialogRef: MatDialogRef<ProfileDetailsComponent, SessionTimeoutComponent>;
constructor(private builder: FormBuilder, private matDialog: MatDialog,
    public toast: ToastrService,
    private service: AuthService,
    private router:Router, private commonService: CommonService,
    private renderer: Renderer2){
      sessionStorage.clear();
      this.initializeForm();
      this.session.onTimeOut = () => {

      };
      this.session.onTimeLeftChange = (timeLeft) => {
          if (this.router.url.split('/')[1] !== 'login') {
            if (timeLeft <= 60000 && !this.openedState) {
              this.openedState = true;
              this.openSessiontimeout();
              this.commonService.updateTimer(timeLeft);
            }
          }
          
        } 
}
initializeForm(){
  this.loginForm = this.builder.group({
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    // userName: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(3)])),
    // passWord: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
   passWord: this.builder.control('', Validators.compose([Validators.required,  
    PatternValidatorsService.patternValidators(/\d/, {hasNumber:true}),
    PatternValidatorsService.patternValidators (/[A-Z]/, {hasCapitalCase:true}),
    PatternValidatorsService.patternValidators(/[a-z]/, {hasSmallCase:true}),
    PatternValidatorsService.patternValidators (/(?=.*[@$!%*#?&])/, {hasSpeacialCharacters:true}), 
    Validators.minLength(8),])),
    getCaptchCode: '',
    captcha: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(6)])),
  });
}
ngOnInit(){
  this.createCaptcha(6);
  this.session.start();
}
get f() { return this.loginForm.controls; }

OpenModal(form: any) {
  this.session.dispose();
  this.matDialogRef = this.matDialog.open(ProfileDetailsComponent, {
   data: form,
    disableClose: true,
    width: '60%',
    height: '89%',
    panelClass: 'commonMapping',
    backdropClass: 'popupBackDrop',
    autoFocus: false,
   
  });

  this.matDialogRef.afterClosed().subscribe(res => {
    if(!res){
      this.session.reset();
    }else {
      this.session.start();
    }
    // if ((res == true)) {
     // this.name = "";
    // }
  });
}
  proceedLogin(){
    if (this.loginForm.valid) {

      const createobj:any = {
        email:this.loginForm.value.email,
        password:this.loginForm.value.passWord,
      }
      this.service.userLogin(createobj).subscribe((res: any) => {
        if (res.statusCode == 200) {
          if(res.data.token){
            createobj.actionToken = res?.data?.token;
            createobj.id = res?.data?.user?.id;
            createobj.fullName =res?.data?.user?.fullName;
            createobj.email = res?.data?.user?.email;
            createobj.role = res?.data?.user?.role,
            createobj.DOB = res?.data?.user?.dob,
            createobj.gender = res?.data?.user?.gender,
            createobj.active = res?.data?.user?.active,
            createobj.nationality = res?.data?.user?.nationality
          }
          delete createobj.password;
          sessionStorage.setItem('personalDetails', JSON.stringify(createobj));
      
          const getEmailValue = this.loginForm.value.email.split('@');
          if (getEmailValue[1].includes('orioninc.com')) {
          this.router.navigate(['/home']);

          } else if(res.data.user.active) {
            this.router.navigate(['/dashboard']);

          } else {
            this.OpenModal(createobj);
          }
          this.session.start();
          this.getTheValidation();
          this.toast.success("", "Logged In Successfully");
        } else {
          this.toast.error("", res.statusMessage); 
        }
       
      }, (err) => {
        this.toast.error("", err.message); 
      })
    }
    else {
      this.toast.warning("Please enter valid data");
    }
  }
  getTheValidation(){
    this.loginForm.reset();
   
    this.formDirective.resetForm();
    this.createCaptcha(6);
  }
   // Method to handle session timeout - open dialog
   openSessiontimeout() {
 const matDialogRef = this.matDialog.open(SessionTimeoutComponent, {
      disableClose: true,
      panelClass: 'createCasePopup',
      autoFocus: false,
      width: '400px',
      height: '50%',
      backdropClass: 'popupSearchBackDrop',
    });

    matDialogRef.afterClosed().subscribe(res => {
      if ((res == true)) {
       // this.name = "";
      }
    });
  }
  // checkPassword(event: any) {
  //   if (event && this.userNameList.length >0) {
  //     const list = this.userNameList?.filter((t: any) => t.password == event.target.value);
  //     if (list.length === 0) {
  //       this.passwordValidation = true;
  //       this.loginForm.controls['passWord'].setValue('');
  //     } else {
  //       this.passwordValidation = false;
  //     }
  //   }
  // }
  // checkUserName(event: any) {
  //   if (event && this.getUserList.length >0) {
  //     const list = this.getUserList.filter((t: any) => t.email == event.target.value);
  //     this.userNameList = list;
  //     if (list.length === 0) {
  //       this.usernameValidation = true;
  //       this.loginForm.controls['email'].setValue('');
  //     } else {
  //       this.usernameValidation = false;
  //     }
  //   }
  // }
  getCaptchCodeValue(e:any){
    if(this.captchCode === e.target.value){
      if(e.target.value.length >5){
        this.validationForCaptcha = false;
        this.loginForm.setValue({status:'VALID'});
      
      }

    }else {
      if(e.target.value.length >5){
        this.validationForCaptcha = true;
        this.loginForm.setErrors({errors:true});
        }
        

    }
  }
  refreshCode(){
    this.createCaptcha(6);
    this.loginForm.controls['captcha'].setValue('');
    this.loginForm.controls['captcha'].markAsPristine();
    this.loginForm.controls['captcha'].markAsUntouched();
    this.validationForCaptcha = false;

  }
  createCaptcha(size: any) {
    //Generate Captcha Code
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    this.captchCode = '';
    do {
      this.captchCode += characters.charAt(Math.floor(Math.random() * characters.length));
      size--;
    } while (size != 0);

    //Create captcha element
    const captchaTextSpan = this.renderer.createElement('span');
    const captchaText = this.renderer.createText(this.captchCode);
    this.renderer.appendChild(captchaTextSpan, captchaText);

    const lineSpan = this.renderer.createElement('span');
    this.renderer.setAttribute(lineSpan, 'id', 'line');

    //Appending to captcha container
    this.renderer.appendChild(this.captchaImage.nativeElement, captchaTextSpan);
    this.renderer.appendChild(this.captchaImage.nativeElement, lineSpan);

    //Converting html to image
    html2canvas(this.captchaImage.nativeElement).then((canvas) => {
      this.captchaUrl = canvas.toDataURL('image/png');
      //Removed captcha elment from DOM tree
      this.renderer.removeChild(this.captchaImage.nativeElement, captchaTextSpan);
      this.renderer.removeChild(this.captchaImage.nativeElement, lineSpan);
    });
  }
}
