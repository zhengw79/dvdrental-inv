import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { BLOCK_CSS } from 'src/app/constants';
import { ActorService } from 'src/app/services/actor.service';
import { XeditableService } from 'src/app/services/xeditable.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-actor.details',
  templateUrl: './actor.details.component.html',
  styleUrls: ['./actor.details.component.css']
})
export class ActorDetailsComponent implements OnInit {
  actor: any;
  actor_id: number;
  films: any;
  //@ts-ignore
  private $ = window.jQuery;

  constructor(
    private xeditableService: XeditableService,
    private actorService: ActorService,
    private route: ActivatedRoute
  ) {
    this.actor_id = parseInt(route.snapshot.paramMap.get("actor_id")!);
  }

  ngOnInit(): void {}

  async ngAfterViewInit() {
    this.$("#actor_info").block({
      message: null,
      css: BLOCK_CSS
    });

    const { films, actor } = await this.actorService.retrieveActorFilmCardsById(this.actor_id);

    this.$("#actor_info").unblock();

    this.actor = Object.assign({}, actor);
    this.films = films;

    const arr = [
      { field: "first_name", msg: "Please enter actor's first name." },
      { field: "last_name", msg: "Please enter actor's last name." }
    ];

    this.xeditableService.updateActorEditable(
      this.actor_id,
      (data: any) => {
        const { data: { updateActorEditable: { actor_id, first_name, last_name } } } = data;
        this.actor = Object.assign({}, this.actor, { first_name, last_name });
      });

    arr.forEach(el => {
      this.$(`#${el.field}`).editable({
        value: actor[el.field],
        validate: (value: any) => {
          if (this.$.trim(value) === "") {
            return el.msg;
          }
          return null;
        }
      });
    });
  }
}
