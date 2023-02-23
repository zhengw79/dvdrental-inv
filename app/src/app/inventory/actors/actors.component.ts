import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {
  actors: any[] = [];
  //@ts-ignore
  private $ = window.jQuery;
  private dataTableOption = {
    responsive: true,
    processing: true,
    serverSide: true,
    searching: false,
    columnDefs: [
      { target: 0, data: "actor_id" },
      { target: 1, data: "first_name" },
      { target: 2, data: "last_name" },
      {
        target: -1, data: "actor_id",
        render: (data: any) => '<div class="btn-group"><a class="btn btn-success btn-sm" href="#/inventory/actor/' + data + '"><i class="fas fa-eye"></i></a><button class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></div>'
      }
    ]
  };

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    const bear_token = localStorage.getItem("access_token");
    const baseUrl = environment.apiUrl;

    this.$("#actorTable").DataTable(
      Object.assign({}, this.dataTableOption, {
        ajax: {
          url: `${baseUrl}graphql`,
          type: "POST",
          contentType: "application/json",
          headers: {
            authorization: `bearer ${bear_token}`
          },
          statusCode: {
            401: () => {
              this.router.navigate(["/login"]);
            }
          },
          data: (d: any) => {
            const gql = `query retrieveActorDatatablePagination($pageOption: DatatablePaginationInput!){
              retrieveActorDatatablePagination(pageOption: $pageOption) {
                data {actor_id first_name last_name}
                totalCount
              }
            }`;
            const query = {
              operationName: null,
              query: gql,
              variables: {
                pageOption: {
                  paginate: {
                    page: d.start / d.length,
                    limit: d.length
                  },
                  sort: [{
                    field: d.columns[d.order[0].column].data,
                    order: d.order[0].dir.toUpperCase()
                  }],
                  search: d.search.value ?? ""
                }
              }
            };
            return JSON.stringify(query);
          },
          dataSrc: (json: any) => {
            const { data, errors } = json;
            if (errors && errors[0] && errors[0].message === "Unauthorized") {
              this.router.navigate(["/login"]);
            } else {
              const { retrieveActorDatatablePagination } = data;
              json.recordsTotal = retrieveActorDatatablePagination.totalCount;
              json.recordsFiltered = retrieveActorDatatablePagination.totalCount;
              return retrieveActorDatatablePagination.data;
            }
          }
        }
      }));
  }
}
