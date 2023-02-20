import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActorService } from '../../../../service/actor.service';
import { remove } from "lodash";

@Component({
  selector: 'app-new-film-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css'],
  host: { "(window:onSelectActor)": "onSelectActor($event)" }
})
export class ActorsComponent implements OnInit {
  @Input() film_id?: number;
  @ViewChild("actors_table") actors_table?: ElementRef<any>;

  fg_searchActors: FormGroup;
  fg_formModel: FormGroup = new FormGroup({
    actors: new FormArray([])
  });

  actors: any = [];

  // @ts-ignore
  $: any = window.jQuery;

  constructor(
    private actorService: ActorService
  ) {
    this.fg_searchActors = new FormGroup({
      searching_text: new FormControl("", [Validators.required])
    });
  }

  ngOnInit(): void {
    //@ts-ignore
    window["onSelectActor"] = this.onSelectActor.bind(this);

    console.log("receive film id::" + this.film_id);
  }

  getActorControls() {
    return (this.fg_formModel.get("actors") as FormArray).controls
  }

  addActor() {
    (this.fg_formModel.get("actors") as FormArray).push(new FormGroup({
      first_name: new FormControl("", [Validators.required]),
      last_name: new FormControl("", [Validators.required])
    }));
  }

  removeActor(index: number) {
    (this.fg_formModel.get("actors") as FormArray).removeAt(index);
  }

  /**
   * associate existed actor
   * @param actor_id
   */
  onSelectActor(event: any) {
    const { target: { checked, defaultValue } } = event;
    if (checked) {
      this.actors.push({ actor_id: defaultValue, first_name: "", last_name: "" });
    } else {
      remove(this.actors, (actor: any) => {
        return actor.actor_id === defaultValue;
      });
    }
  }

  async searchActors() {
    const { searching_text } = this.fg_searchActors.value;
    const data = await this.actorService.retrieveActorES(searching_text) as any;

    const { retrieveActorES } = data;
    const tableElem = this.actors_table?.nativeElement;
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
          data: "actor_id",
          render: (data: any) => `<input type="checkbox" name="actors" class="form-control form-control-user form-control-checkbox" value=${data} onClick="onSelectActor(event)"/>`
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

  saveActors() {
    this.fg_formModel.markAllAsTouched();

    if (!this.fg_formModel.valid) {
      return;
    }

    const { actors } = this.fg_formModel.value;
    const temp = this.actors.concat(actors.map((actor: any) => ({ actor_id: null, ...actor })));
    console.log(temp);

    // submit to portal
  }
}
