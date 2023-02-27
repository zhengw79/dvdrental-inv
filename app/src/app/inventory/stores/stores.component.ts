import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import IMask from 'imask';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {
  @ViewChild("tbl_stores") tbl_stores?: ElementRef<HTMLTableElement>;

  //@ts-ignore
  $: any = window.jQuery;

  masked = IMask.createMask({
    mask: "(000)000-0000"
  });

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    const bearer_token = localStorage.getItem("access_token");
    const baseUrl = environment.apiUrl;

    const tbl_stores_elem = this.tbl_stores?.nativeElement;
    this.$(tbl_stores_elem).DataTable({
      responsive: true,
      processing: true,
      serverSide: true,
      searching: false,
      columnDefs: [
        {
          target: 0,
          data: "store_id",
          title: "Store Id",
          render: function (data: any) {
            return `<a type="button" class="btn btn-primary btn-sm" href='#/inventory/store/update/${data}'><i class="fas fa-pencil-alt"></i></a>`
          }
        },
        { target: 1, data: "manager", title: "Manager" },
        { target: 2, data: "address", title: "Address" },
        { target: 3, data: "country", title: "Country" },
        {
          target: 4, data: "phone", title: "Phone",
          render: (data: any) => {
            return this.masked.resolve(data);
          }
        }
      ],
      ajax: {
        url: `${baseUrl}graphql`,
        type: "post",
        contentType: "application/json",
        headers: {
          authorization: `Bearer ${bearer_token}`
        },
        data: (d: any) => {
          let gql = `query retrieveStoreDatatableRowsPagination($pageOption: DatatablePaginationInput!){
            retrieveStoreDatatableRowsPagination(pageOption: $pageOption) {
              data { store_id manager address country phone }
              totalCount}}`;
          let query = {
            "operationName": null,
            "query": gql,
            "variables": {
              "pageOption": {
                "paginate": {
                  "page": (d.start / d.length),
                  "limit": d.length
                },
                "sort": [{
                  "field": d.columns[d.order[0].column].data,
                  "order": d.order[0].dir.toUpperCase()
                }],
                "search": ""
              }
            }
          };
          return JSON.stringify(query);
        },
        "dataSrc": (json: any) => {
          json.recordsTotal = json.data?.retrieveStoreDatatableRowsPagination?.totalCount;
          json.recordsFiltered = json.data?.retrieveStoreDatatableRowsPagination.totalCount;
          return json.data?.retrieveStoreDatatableRowsPagination?.data;
        }
      }
    });
  }
}
