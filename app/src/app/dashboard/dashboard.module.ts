import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { FilmsComponent } from './inventory/films/films.component';
import { InventoryComponent } from './inventory/inventory.component';
import { FilmDetailsComponent } from './inventory/film.details/film.details.component';
import { FilmInfoComponent } from './inventory/film.details/film.info/film.info.component';
import { FilmActorComponent } from './inventory/film.details/film.actor/film.actor.component';
import { ActorsComponent } from './inventory/actors/actors.component';
import { ActorDetailsComponent } from './inventory/actor.details/actor.details.component';
import { ActorFilmCardComponent } from './inventory/actor.details/actor.film.card/actor.film.card.component';
import { SearchComponent as FilmSearchComponent } from './inventory/films/search/search.component';
import { SearchComponent as ActorSearchComponent } from './inventory/actors/search/search.component';
import { NewFilmComponent } from './inventory/films/new.film/new.film.component';
import { InfoComponent as NewInfoComponent } from './inventory/films/new.film/info/info.component';
import { ActorsComponent as NewFilmActorComponent } from './inventory/films/new.film/actors/actors.component';
import { ActorService } from './service/actor.service';
import { FilmService } from './service/film.service';
import { ValidatorService } from './service/validator.service';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    MainComponent,
    LayoutComponent,
    SidebarComponent,
    TopbarComponent,
    FooterComponent,
    FilmsComponent,
    InventoryComponent,
    FilmDetailsComponent,
    FilmInfoComponent,
    FilmActorComponent,
    ActorsComponent,
    ActorDetailsComponent,
    ActorFilmCardComponent,
    FilmSearchComponent,
    ActorSearchComponent,
    NewFilmComponent,
    NewInfoComponent,
    NewFilmActorComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [ActorService, FilmService, ValidatorService]
})
export class DashboardModule { }
