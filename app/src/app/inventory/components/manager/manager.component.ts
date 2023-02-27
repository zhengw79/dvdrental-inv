import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BLOCK_CSS } from 'src/app/constants';
import { StaffType } from '../../../services/dto/staff.type';
import { StaffService } from '../../../services/staff.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  @Input() manager_ety?: StaffType;
  @Output() evt_reloadStaff: EventEmitter<any>;
  @ViewChild("card_manager_el") card_manager_el?: ElementRef<HTMLDivElement>;

  fg_manager: FormGroup;

  // @ts-ignore
  $: any = window.jQuery;

  constructor(
    private staffService: StaffService
  ) {
    this.fg_manager = new FormGroup({
      staff_id: new FormControl(""),
      first_name: new FormControl("", [Validators.required]),
      last_name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email])
    });

    this.evt_reloadStaff = new EventEmitter;
  }

  ngOnInit(): void { }

  ngAfterContentInit() {
    if (this.manager_ety) {
      const { staff_id, first_name, last_name, email } = this.manager_ety;
      this.staff_id?.setValue(staff_id);
      this.first_name?.setValue(first_name);
      this.last_name?.setValue(last_name);
      this.email?.setValue(email);
      this.email?.disable();
    }
  }

  get staff_id() {
    return this.fg_manager.get("staff_id");
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

  async onSubmit() {
    this.fg_manager.markAllAsTouched();
    if (!this.fg_manager.valid) {
      return;
    }

    this.$(this.card_manager_el?.nativeElement).block({
      message: null,
      css: BLOCK_CSS
    });
    await this.staffService.editStaff(this.fg_manager.value);
    this.$(this.card_manager_el?.nativeElement).unblock();

    this.evt_reloadStaff.emit();
  }

  onReset() {
    this.ngAfterContentInit();
  }

}