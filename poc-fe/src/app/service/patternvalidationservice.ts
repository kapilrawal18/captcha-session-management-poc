import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
@Injectable({
    providedIn: 'root'
})
export class PatternValidatorsService {
    static patternValidators(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            // Your validation logic here
          
            // For example, checking if the control value is valid or not
            if (!control.value) {
              // Returning an object with an error message
              return null;
            }
            const valid = regex.test(control.value);
            // If the control value is valid, return null (no errors)
            return valid ? null : error;;
          };
        // return (control: AbstractControl): { [key:string]: any } => {
        //     if (!control.value) {
        //         // if control is empty return no error
        //         return null || '{}'
        //     }
        //     //test the value of the controil against the regexp suppled
        //     const valid = regex.test(control.value);
        //     const getValue = valid ? null : error;
        //  return JSON.parse(valid.toString());

        // }


    }
}