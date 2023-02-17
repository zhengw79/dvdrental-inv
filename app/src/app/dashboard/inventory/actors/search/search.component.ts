import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActorService } from '../../../service/actor.service';

@Component({
  selector: 'app-actor-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchFormModel: FormGroup;

  $: any

  constructor(
    private actorService: ActorService,
    private router: Router
  ) {
    this.searchFormModel = new FormGroup({
      searching_text: new FormControl("", [Validators.required])
    });
    // @ts-ignore
    this.$ = window.jQuery;
  }

  ngOnInit(): void {}

  get searching_text() {
    return this.searchFormModel.get("searching_text");
  }

  async onSubmit() {
    const { searching_text } = this.searchFormModel.value;
    const data = await this.actorService.retrieveActorES(searching_text) as any;

    if (this.$.fn.DataTable.isDataTable('#actorES_table')) {
      this.$("#actorES_table").DataTable().clear();
      this.$("#actorES_table").DataTable().destroy();
    }

    const { retrieveActorES } = data as any;

    this.$("#actorES_table").DataTable({
      responsive: true,
      data: retrieveActorES,
      searching: false,
      paging: false,
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
}
