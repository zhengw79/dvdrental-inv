import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableService } from '../../../app/services/datatable.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  host: {
    "(window:onSelectCustomer)": "onSelectCustomer($event)"
  }
})
export class CustomersComponent implements OnInit {

  @ViewChild("customer_tbl") customer_tbl?: ElementRef<HTMLTableElement>;

  $: any;

  constructor(
    private datatableService: DatatableService,
    private router: Router,
    private ngZone: NgZone
  ) {
    //@ts-ignore
    this.$ = window.jQuery;
  }

  ngOnInit(): void {
    // @ts-ignore
    window["onSelectCustomer" as any] = this.onSelectCustomer.bind(this);
  }

  ngAfterViewInit() {
    const dt_option = this.datatableService.initCustomersDatatable();

    dt_option.columnDefs = [
      {
        target: 0,
        data: "customer_id",
        title: "Id",
        render: (data: any) => {
          return `<button type='button' class='btn btn-primary btn-sm' onClick="onSelectCustomer(${data})"><i class="fas fa-eye"></i></button>`;
        }
      },
      {
        target: 1,
        data: "first_name",
        title: "Customer Name",
        render: (data: any, _: any, row: any) => {
          return `${data} ${row.last_name}`;
        }
      },
      {
        target: 2,
        data: "email",
        title: "Email"
      },
      {
        target: 3,
        data: "address",
        title: "Address"
      },
      {
        target: 4,
        data: "store_id",
        title: "Store Id"
      }
    ];
    this.$(this.customer_tbl?.nativeElement).DataTable(
      dt_option
    );
  }

  onSelectCustomer(customer_id: number) {
    this.ngZone.run(() => this.router.navigate([`/order/customer/${customer_id}`]));
  }
}
