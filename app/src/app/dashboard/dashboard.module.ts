import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { FilmsComponent } from './inventory/films/films.component';
import { InventoryComponent } from './inventory/inventory.component';
import { FilmDetailsComponent } from './inventory/film.details/film.details.component';
import { FilmInfoComponent } from './inventory/film.details/film.info/film.info.component';
import { FilmActorComponent } from './inventory/film.details/film.actor/film.actor.component';



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
    FilmActorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class DashboardModule { }
