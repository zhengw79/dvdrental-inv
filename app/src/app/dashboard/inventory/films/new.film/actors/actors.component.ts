import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActorService } from '../../../../service/actor.service';

@Component({
  selector: 'app-new-film-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {
  fg_searchActors: FormGroup;
  formModel: FormGroup = new FormGroup({
    actors: new FormArray([])
  });

  @ViewChild("actors_table") actors_table?: ElementRef<any>;
  // @ts-ignore
  $: any = window.jQuery;

  constructor(private actorService: ActorService) {
    this.fg_searchActors = new FormGroup({
      searching_text: new FormControl("", [Validators.required])
    });
  }

  ngOnInit(): void { }

  getActorControls() {
    return (this.formModel.get("actors") as FormArray).controls
  }

  addActor() {
    (this.formModel.get("actors") as FormArray).push(new FormGroup({
      first_name: new FormControl(),
      last_name: new FormControl()
    }));
  }

  removeActor(index: number) {
    (this.formModel.get("actors") as FormArray).removeAt(index);
  }

  async searchActors() {
    const { searching_text } = this.fg_searchActors.value;
    const data = await this.actorService.retrieveActorES(searching_text) as any;

    const { retrieveActorES } = data;
    const tableElem = this.actors_table?.nativeElement;
    console.log(tableElem);
    if (this.$.fn.DataTable.isDataTable(tableElem)) {
      this.$(tableElem).DataTable().clear();
      this.$(tableElem).DataTable().destroy();
    }
    this.$(tableElem).DataTable({
      responsive: true,
      searching: false,
      paging: false,
      bLengthChange: false,
      info: false,
      data: retrieveActorES,
      columns: [
        {
          title: "Select",
          data: "actor_id"
        },
        {
          title: "First name",
          data: "first_name"
        },
        {
          title: "Last name",
          data: "last_name"
        }
      ]
    })
  }
}
