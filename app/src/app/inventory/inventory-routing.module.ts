import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';
import { FilmsComponent } from './films/films.component';
import { FilmDetailsComponent } from './film.details/film.details.component';
import { NewFilmComponent } from './films/new.film/new.film.component';
import { ActorsComponent } from './actors/actors.component';
import { ActorDetailsComponent } from './actor.details/actor.details.component';
import { StoresComponent } from './stores/stores.component';
import { StoreComponent } from './stores/store/store.component';

const routes: Routes = [
  {
    "path": "",
    "component": InventoryComponent,
    "children": [
      {
        "path": "film/create",
        "component": NewFilmComponent,
        "pathMatch": "full"
      },
      {
        "path": "film/update/:film_id",
        "component": NewFilmComponent
      },
      {
        "path": "film/view/:film_id",
        "component": FilmDetailsComponent
      },
      {
        "path": "film",
        "component": FilmsComponent
      },
      {
        "path": "actor",
        "component": ActorsComponent
      },
      {
        "path": "actor/:actor_id",
        "component": ActorDetailsComponent
      },
      {
        "path": "store",
        "component": StoresComponent
      },
      {
        "path": "store/create",
        "component": StoreComponent
      },
      {
        "path": "store/update/:store_id",
        "component": StoreComponent
      }
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
export class InventoryRoutingModule { }
