import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../service/auth.service';
import { ActiveToast, Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Renderer } from 'html2canvas/dist/types/render/renderer';
import html2canvas from 'html2canvas';
import { Renderer2 } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthService
  let toast: ToastrService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers:[AuthService, ToastrService, Renderer2],
      imports:[AppRoutingModule, HttpClientModule,RouterTestingModule, ToastrModule.forRoot(),
        MaterialModule, FormsModule, ReactiveFormsModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return the loginForm controls', () => {
    const controls = component?.f;
    expect(controls).toEqual(component.loginForm.controls);
  });
  // it('should handle asynchronous operation', fakeAsync(() => {
  //   // Mock the loginForm and set valid values
  //   component.loginForm.setValue({
  //     userName: 'validUsername',
  //     passWord: 'validPassword',
  //   });
  
  //   spyOn(component.toast, 'success').and.returnValue(of({})); // Assuming success returns an observable
  
  //   component.proceedLogin();
    
  //   spyOn(router, 'navigate');
  //   // Use tick to simulate the passage of time for asynchronous operations
  //   tick();
  
  //   expect(component.toast.success).toHaveBeenCalledWith('Success', 'Logged In Successfully');
  //    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  // expect(sessionStorage.getItem('username')).toEqual('validUsername');
  // }));
  // it('should handle asynchronous operation', fakeAsync(() => {
  //   // Mock the loginForm and set valid values
  //   component.loginForm.setValue({
  //     userName: 'validUsername',
  //     passWord: 'validPassword',
  //     getCaptchCode:'Aw12342',
  //     captcha:'Aw12342',
  //   });
  
  //   const mockActiveToast: ActiveToast<any> = {
  //     toastId: 0,
  //     title: '',
  //     message: '',
  //     portal: 'undefined'! as any,
  //     toastRef: undefined ! as any,
  //     onShown: undefined! as any,
  //     onHidden: undefined! as any,
  //     onTap: undefined! as any,
  //     onAction: undefined! as any
  //   };
  
  //   spyOn(component.toast, 'success').and.returnValue(mockActiveToast);
  //   spyOn(router, 'navigate');
  
  //   component.proceedLogin();
  
  //   // Use tick to simulate the passage of time for asynchronous operations
  //   tick();
  // fixture.detectChanges();
  //   expect(component.toast.success).toHaveBeenCalledWith('Success', 'Logged In Successfully');
  //   expect(router.navigate).toHaveBeenCalledWith(['/home']);
  //   expect(sessionStorage.getItem('username')).toEqual('validUsername');
  // }));
  // ...

// it('should handle asynchronous operation', fakeAsync(() => {
//   // Mock the loginForm and set valid values
//   component.loginForm.setValue({
//     userName: 'validUsername',
//     passWord: 'validPassword',
//     getCaptchCode:'Aw12342',
//     captcha:'Aw12342',
//   });

//   const mockActiveToast: ActiveToast<any> = {
//     toastId: 0,
//     title: '',
//     message: '',
//        portal: 'undefined'! as any,
//       toastRef: undefined ! as any,
//       onShown: undefined! as any,
//       onHidden: undefined! as any,
//       onTap: undefined! as any,
//       onAction: undefined! as any
//   };

//   spyOn(component.toast, 'success').and.returnValue(mockActiveToast);
//   // Spy on the success method
//   // const toastService = TestBed.inject(ToastrService);
//   // spyOn(toastService, 'success');
//   component.proceedLogin();
//   fixture.detectChanges();
//   // Use tick to simulate the passage of time for asynchronous operations
//   tick();

//   // Debugging: Log the actual values passed to the success method
//   // console.log(component.toast.success.calls.allArgs());
//   expect(component.toast.success).toHaveBeenCalledWith('Success', 'Logged In Successfully');

// }));

  it('should display warning toast if form is invalid', () => {
    // Mock the loginForm with invalid values
    component.loginForm.setValue({
      userName: '',
      passWord: '',
      getCaptchCode:'',
      captcha:'',
    });

    spyOn(component.toast, 'warning');
    component.proceedLogin();
    expect(component.toast.warning).toHaveBeenCalledWith('Please enter valid data');
  });
});
