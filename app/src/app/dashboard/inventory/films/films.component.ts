import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  //@ts-ignore
  private $ = window.jQuery;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    const bear_token = localStorage.getItem("access_token");
    const _csrf = localStorage.getItem("_csrf");
    const baseUrl = environment.apiUrl;

    this.$("#myTable").DataTable({
      responsive: true,
      processing: true,
      serverSide: true,
      searching: false,
      columnDefs: [
        {
          target: 0,
          data: "film_id",
          render: function (data: any, type: any, row: any, meta: any) {
            return `<a type="button" class="btn btn-primary btn-sm" href="#/inventory/film/${data}"><i class="fas fa-solid fa-eye"></i></a>`;
          }
        },
        { target: 1, data: "title" },
        {
          target: 2,
          data: "description",
          render: function (data: any, type: any, row: any, meta: any) {
            if (data.length > 50) {
              return data.substr(0, 150) + "...";
            } else {
              return data;
            }
          }
        },
        { target: 3, data: "category", sortable: false },
        { target: 4, data: "release_year" }
      ],
      ajax: {
        url: `${baseUrl}graphql`,
        type: "POST",
        contentType: "application/json",
        headers: {
          Authorization: `Bearer ${bear_token}`,
          "X-XSRF-TOKEN": _csrf
        },
        data: (d: any) => {
          const gql = `query retrieveFilmDatatableRowsPagination($pageOption: DatatablePaginationInput!){
            retrieveFilmDatatableRowsPagination(pageOption: $pageOption) {
              data {
                film_id
                title
                description
                length
                release_year
                category
              }
              totalCount
            }
          }`;
          const query = {
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
                "search": d.search.value ?? ""
              }
            }
          };
          return JSON.stringify(query);
        },
        "dataSrc": (json: any) => {
          //TODO: should check auth status and redirect if need.
          json.recordsTotal = json.data?.retrieveFilmDatatableRowsPagination?.totalCount;
          json.recordsFiltered = json.data?.retrieveFilmDatatableRowsPagination?.totalCount;
          return json.data?.retrieveFilmDatatableRowsPagination?.data;
        }
      }
    });
  }

}
