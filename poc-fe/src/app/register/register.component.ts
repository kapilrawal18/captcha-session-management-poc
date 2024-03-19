import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { PatternValidatorsService } from '../service/patternvalidationservice';
import html2canvas from 'html2canvas';
import { ProfileDetailsComponent } from '../profile-details/profile-details.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  getCaptchCode: any;
  validationForCaptcha: any;
  getRegistrationList: any = [];
  captchCode: string;
  captchaUrl: any;

  @ViewChild('captchaImage', { static: true }) captchaImage!: ElementRef;
  constructor(private builder: FormBuilder,
    private toast: ToastrService,
    private service: AuthService,
    private router: Router, 
    private renderer: Renderer2) {
      this.initializeForm();
  }
  initializeForm(){
    this.registerForm = this.builder.group({
      fullName: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(3)])),
      userName: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(3)])),
      passWord: this.builder.control('', Validators.compose([Validators.required,  
        PatternValidatorsService.patternValidators(/\d/, {hasNumber:true}),
        PatternValidatorsService.patternValidators (/[A-Z]/, {hasCapitalCase:true}),
        PatternValidatorsService.patternValidators(/[a-z]/, {hasSmallCase:true}),
        PatternValidatorsService.patternValidators (/(?=.*[@$!%*#?&])/, {hasSpeacialCharacters:true}), 
        Validators.minLength(8),])),
      email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
      captcha: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(6)])),
    });
  }
  ngOnInit() {

    this.createCaptcha(6);
  }

  get f() { return this.registerForm.controls; }
  proceedRegisteration() {
 
    if (this.registerForm.valid) {
      const serializedForm = JSON.stringify(this.registerForm.value);
      sessionStorage.setItem('myForm', serializedForm);
    
      const createobj = {
        username: this.registerForm.value.userName,
        password: this.registerForm.value.passWord,
        email: this.registerForm.value.email,
        fullName:this.registerForm.value.fullName
      }
      this.service.SaveUser(createobj).subscribe(res => {
        if(res){
          this.toast.success("", "Registered Successfully");
          this.router.navigate(['/login']);
        }
      }, (err) => {
        this.toast.error("", err.message); 
      })
    }
    else {
      this.toast.warning("Please enter valid data");
    }
  }
 
  getCaptchCodeValue(e: any) {
    if (this.captchCode === e.target.value) {
      if (e.target.value.length > 5) {
        this.validationForCaptcha = false;
        this.registerForm.setValue({ status: 'VALID' });
      }

    } else {
      if (e.target.value.length > 5) {
        this.validationForCaptcha = true;
        this.registerForm.setErrors({ errors: true });
      }
    }
  }
  refreshCode() {
    this.createCaptcha(6);
    this.registerForm.controls['captcha'].setValue('');
    this.registerForm.controls['captcha'].markAsPristine();
    this.registerForm.controls['captcha'].markAsUntouched();
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

