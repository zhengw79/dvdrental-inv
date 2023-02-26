import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StaffType } from 'src/app/services/dto/staff.type';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  @Input() manager_ety?: StaffType;
  fg_manager: FormGroup;

  constructor() {
    this.fg_manager = new FormGroup({
      first_name: new FormControl("", [Validators.required]),
      last_name: new FormControl("", [Validators.required]),
      email: new FormControl({ value: "", disabled: true }, [Validators.required])
    });
  }

  ngOnInit(): void { }

  ngAfterContentInit() {
    if (this.manager_ety) {
      const { first_name, last_name, email } = this.manager_ety;
      this.first_name?.setValue(first_name);
      this.last_name?.setValue(last_name);
      this.email?.setValue(email);
    }
  }

  get first_name() {
    return this.fg_manager.get("first_name");
  }

  get last_name() {
    return this.fg_manager.get("last_name");
  }

  get email() {
    return this.fg_manager.get("email");
  }

  onSubmit() { }

  onReset() {
    this.ngAfterContentInit();
  }

}
