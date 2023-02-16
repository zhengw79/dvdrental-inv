import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-actor-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchFormModel: FormGroup;

  $: any

  constructor(
    private apollo: Apollo,
    private router: Router
  ) {
    this.searchFormModel = new FormGroup({
      searching_text: new FormControl("", [Validators.required])
    });
    // @ts-ignore
    this.$ = window.jQuery;
  }

  ngOnInit(): void {
  }

  get searching_text() {
    return this.searchFormModel.get("searching_text");
  }

  onSubmit() {
    const { searching_text } = this.searchFormModel.value;
    this.apollo.query({
      query: gql`
        query retrieveActorES($searching_text: String!) {
          retrieveActorES(searching_text: $searching_text) {
            actor_id first_name last_name film_languages film_categories film_titles
          }}`,
      variables: {
        searching_text
      }
    }).subscribe(({ data, errors }) => {
      if (errors && errors[0] && errors[0].message === "Unauthorized") {
        this.router.navigate(["/login"]);
      } else {
        if (this.$.fn.DataTable.isDataTable('#actorES_table')) {
          this.$("#actorES_table").DataTable().clear();
          this.$("#actorES_table").DataTable().destroy();
        }

        const { retrieveActorES } = data as any;

        this.$("#actorES_table").DataTable({
          responsive: true,
          data: retrieveActorES,
          searching: false,
          pagination: false,
          bLengthChange: false,
          columns: [
            {
              title: "Actor Id",
              data: "actor_id"
            },
            {
              title: "First Name",
              data: "first_name"
            },
            {
              title: "Last Name",
              data: "last_name"
            },
            {
              title: "",
              data: "actor_id",
              render: (data: any) => '<div class="btn-group"><a class="btn btn-success btn-sm" href="#/inventory/actor/' + data + '"><i class="fas fa-eye"></i></a><button class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></div>'
            }]
        });
      }
    });
  }
}
