import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActorService } from '../../../../services/actor.service';
import { remove } from "lodash";
import { FilmService } from '../../../../services/film.service';
import { BLOCK_CSS } from 'src/app/constants';

@Component({
  selector: 'app-new-film-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css'],
  host: {
    "(window:onSelectActor)": "onSelectActor($event)",
    "(window:onDeleteActor)": "onDeleteActor($event)"
  }
})
export class ActorsComponent implements OnInit {
  @Input() film_id?: number;
  @ViewChild("actorEs_table") actorEs_table?: ElementRef<any>;
  @ViewChild("actors_table") actors_table?: ElementRef<any>;
  @ViewChild("film_actor_card_el") film_actor_card_el?: ElementRef<any>;

  fg_searchActors: FormGroup;
  fg_formModel: FormGroup = new FormGroup({
    actors: new FormArray([])
  });

  actors: any = [];

  // @ts-ignore
  $: any = window.jQuery;

  constructor(
    private actorService: ActorService,
    private filmService: FilmService
  ) {
    this.fg_searchActors = new FormGroup({
      searching_text: new FormControl("", [Validators.required])
    });
  }

  ngOnInit(): void {
    //@ts-ignore
    window["onSelectActor" as any] = this.onSelectActor.bind(this);
    //@ts-ignore
    window["onDeleteActor" as any] = this.onDeleteActor.bind(this);

    //**--------------|| RESET PAGE ||----------------*//
    const tableElem = this.actorEs_table?.nativeElement;
    if (this.$.fn.DataTable.isDataTable(tableElem)) {
      this.$(tableElem).DataTable().destroy();
      this.$(tableElem).empty();
    }
    this.fg_searchActors.get("searching_text")?.reset();
    (this.fg_formModel.get("actors") as FormArray).clear();
    //**-------------|| RESET SEARCHING END ||---------------*//
  }

  async ngAfterViewInit() {
    this.$(this.film_actor_card_el?.nativeElement).block({
      message: null,
      css: BLOCK_CSS
    });
    const { retrieveActorsByFilmId } = await this.actorService.retrieveActorsByFilmId(this.film_id!);
    this.$(this.film_actor_card_el?.nativeElement).unblock();

    const actors_tbl = this.actors_table?.nativeElement;

    if (this.$.fn.DataTable.isDataTable(actors_tbl)) {
      this.$(actors_tbl).DataTable().clear();
      this.$(actors_tbl).DataTable().destroy();
    }
    this.$(actors_tbl).DataTable({
      data: retrieveActorsByFilmId,
      responsive: true,
      searching: false,
      paging: false,
      bLengthChange: false,
      info: false,
      columns: [
        {
          title: "Delete",
          data: "actor_id",
          render: (data: any) => `<button class="btn btn-danger btn-circle btn-sm" onClick="onDeleteActor(${data})"><i class="fas fa-times"></i></button>`
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
    });
  }

  getActorControls() {
    return (this.fg_formModel.get("actors") as FormArray).controls;
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
      this.actors.push({ actor_id: +defaultValue, first_name: "", last_name: "" });
    } else {
      remove(this.actors, (actor: any) => {
        return actor.actor_id === defaultValue;
      });
    }
  }

  async onDeleteActor(actor_id: number) {
    await this.actorService.removeFilmActor(+this.film_id!, +actor_id);
    this.ngAfterViewInit();
  }

  async searchActors() {
    const { searching_text } = this.fg_searchActors.value;
    const data = await this.actorService.retrieveActorES(searching_text) as any;

    const { retrieveActorES } = data;
    const tableElem = this.actorEs_table?.nativeElement;
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

  async saveActors() {
    this.fg_formModel.markAllAsTouched();

    if (!this.fg_formModel.valid) {
      return;
    }

    const { actors } = this.fg_formModel.value;
    const temp = this.actors.concat(actors.map((actor: any) => ({ actor_id: null, ...actor })));

    this.$(this.film_actor_card_el?.nativeElement).block({
      message: null,
      css: BLOCK_CSS
    });

    await this.filmService.addFilmActors({
      film_id: +this.film_id!,
      actors: temp
    });
    this.$(this.film_actor_card_el?.nativeElement).unblock();

    this.ngOnInit();
    this.ngAfterViewInit();
  }
}
