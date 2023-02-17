import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { VerifyEmailComponent } from './auth/verify.email/verify.email.component';
import { ActorDetailsComponent } from './dashboard/inventory/actor.details/actor.details.component';
import { ActorsComponent } from './dashboard/inventory/actors/actors.component';
import { FilmDetailsComponent } from './dashboard/inventory/film.details/film.details.component';
import { FilmsComponent } from './dashboard/inventory/films/films.component';
import { NewFilmComponent } from './dashboard/inventory/films/new.film/new.film.component';
import { InventoryComponent } from './dashboard/inventory/inventory.component';
import { MainComponent } from './dashboard/main/main.component';

const routes: Routes = [
  { path: "", component: AppComponent },
  { path: "login", component: LoginComponent },
  { path: "verify-email/:id", component: VerifyEmailComponent },
  { path: "register", component: RegisterComponent },
  { path: "main", component: MainComponent },
  {
    path: "inventory",
    component: InventoryComponent,
    children: [
      { path: "film", component: FilmsComponent },
      { path: "film/new", component: NewFilmComponent},
      { path: "film/:film_id", component: FilmDetailsComponent },
      { path: "actor", component: ActorsComponent },
      { path: "actor/:actor_id", component: ActorDetailsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: "reload" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
