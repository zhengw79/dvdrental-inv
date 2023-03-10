import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory/inventory.component';
import { RouterModule } from '@angular/router';
import { InventoryRoutingModule } from './inventory-routing.module';
import { FilmsComponent } from './films/films.component';
import { SearchComponent as FilmSearchComponent } from './films/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilmDetailsComponent } from './film.details/film.details.component';
import { FilmActorComponent } from './film.details/film.actor/film.actor.component';
import { FilmInfoComponent } from './film.details/film.info/film.info.component';
import { NewFilmComponent } from './films/new.film/new.film.component';
import { InfoComponent } from './films/new.film/info/info.component';
import { ActorsComponent as NewFilmActorComponent } from './films/new.film/actors/actors.component';
import { ActorsComponent } from './actors/actors.component';
import { SearchComponent as ActorSearchComponent } from './actors/search/search.component';
import { ActorDetailsComponent } from './actor.details/actor.details.component';
import { ActorFilmCardComponent } from './actor.details/actor.film.card/actor.film.card.component';
import { StoresComponent } from './stores/stores.component';
import { StoreComponent } from './stores/store/store.component';
import { AddressComponent } from './components/address/address.component';
import { ManagerComponent } from './components/manager/manager.component';
import { NewCountryComponent } from './components/address/new.country/new.country.component';
import { SearchManagerComponent } from './components/search.manager/search.manager.component';
import { LayoutModule } from '../layout/layout.module';
import { ModalAddFilmInvComponent } from './components/modal.add.film.inv/modal.add.film.inv.component';
import { SearchStoreComponent } from './components/search.store/search.store.component';




@NgModule({
  declarations: [
    InventoryComponent,
    FilmsComponent,
    FilmSearchComponent,
    FilmDetailsComponent,
    FilmActorComponent,
    FilmInfoComponent,
    NewFilmComponent,
    NewFilmActorComponent,
    InfoComponent,
    ActorsComponent,
    ActorSearchComponent,
    ActorDetailsComponent,
    ActorFilmCardComponent,
    StoresComponent,
    StoreComponent,
    AddressComponent,
    ManagerComponent,
    NewCountryComponent,
    SearchManagerComponent,
    ModalAddFilmInvComponent,
    SearchStoreComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    InventoryRoutingModule,
    LayoutModule
  ],
  exports: []
})
export class InventoryModule { }
