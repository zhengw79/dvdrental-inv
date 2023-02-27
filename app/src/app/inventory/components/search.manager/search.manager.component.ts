import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StaffService } from 'src/app/services/staff.service';

@Component({
	selector: 'app-search-manager',
	templateUrl: './search.manager.component.html',
	styleUrls: ['./search.manager.component.css'],
	host: {
		"(window:onSelectManager)": "onSelectManager($event)"
	}
})
export class SearchManagerComponent implements OnInit {
	fg_search: FormGroup;

	@ViewChild("manager_tbl") manager_tbl?: ElementRef<HTMLTableElement>;
	@Output() evt_setManagerId: EventEmitter<number>;

	$: any;

	constructor(
		private staffService: StaffService
	) {
		this.fg_search = new FormGroup({
			search_txt: new FormControl("")
		});

		//@ts-ignore
		this.$ = window.jQuery;
		this.evt_setManagerId = new EventEmitter;
	}

	ngOnInit(): void {
		//@ts-ignore
		window["onSelectManager" as any] = this.onSelectManager.bind(this);
	}

	ngAfterViewInit() {}

	get search_txt() {
		return this.fg_search.get("search_txt");
	}

	onSelectManager(e: any) {
		const { target: { defaultValue }} = e;
		this.evt_setManagerId.emit(+defaultValue);
	}

	async onSubmit() {
		this.fg_search.markAllAsTouched();
		if (this.fg_search.invalid) {
			return;
		}

		const staffs = await this.staffService.retrieveStaffsByFLNameOrEmail(this.search_txt?.value);
		console.log(staffs);

		const manager_tbl_el = this.manager_tbl?.nativeElement;
		if (this.$.fn.DataTable.isDataTable(manager_tbl_el)) {
			this.$(manager_tbl_el).DataTable().clear();
			this.$(manager_tbl_el).DataTable().destroy();
		}

		this.$(manager_tbl_el).DataTable({
		  responsive: true,
		  searching: false,
		  paging: false,
		  bLengthChange: false,
		  info: false,
		  data: staffs,
			columns: [
				{
					title: "Select",
					data: "staff_id",
					render: (data:any) => `<input type="radio" class="form-control form-control-user form-control-checkbox" name="staff_id" value=${data} onClick="onSelectManager(event)"/>`
				},
				{
					title: "First name",
					data: "first_name"
				},
				{
					title: "Last name",
					data: "last_name"
				},
				{
					title: "Email",
					data: "email"
				}
			]
		});
	}
}
