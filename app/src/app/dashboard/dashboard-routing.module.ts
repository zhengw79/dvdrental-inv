import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewFilmComponent } from './inventory/films/new.film/new.film.component';
import { FilmDetailsComponent } from './inventory/film.details/film.details.component';
import { FilmsComponent } from './inventory/films/films.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ActorsComponent } from './inventory/actors/actors.component';
import { ActorDetailsComponent } from './inventory/actor.details/actor.details.component';

const routes: Routes = [
  {
    "path": "",
    "component": InventoryComponent,
    "children": [
      {
        "path": "film/create",
        "component": NewFilmComponent,
        "pathMatch": "full",
      },
      { "path": "film/update/:film_id", "component": NewFilmComponent },
      {
        "path": "film/view/:film_id",
        "component": FilmDetailsComponent
      },
      { "path": "film", "component": FilmsComponent },
      { "path": "actor", "component": ActorsComponent },
      { "path": "actor/:actor_id", "component": ActorDetailsComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardRoutingModule { }
