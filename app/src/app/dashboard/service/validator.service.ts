import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  filmNumberValidator(control: FormControl): ValidationErrors | null {
    const value = String(control.value) || '';
    const valid = !value || value.match(/[+-]?([0-9]*[.])?[0-9]+/);
    return valid ? null : { valid_number: true }
  }
}
