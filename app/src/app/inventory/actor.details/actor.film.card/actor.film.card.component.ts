import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actor-film-card',
  templateUrl: './actor.film.card.component.html',
  styleUrls: ['./actor.film.card.component.css']
})
export class ActorFilmCardComponent implements OnInit {
  @Input() film: any;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  handleClickFilmDetail() {
    this.router.navigate([`/inventory/film/view/${this.film.film_id}`]);
  }
}
