import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-film.details',
  templateUrl: './film.details.component.html',
  styleUrls: ['./film.details.component.css']
})
export class FilmDetailsComponent implements OnInit {
  public film_id?: number;

  constructor(
    private route: ActivatedRoute
  ) {
    this.film_id = parseInt(this.route.snapshot.paramMap.get("film_id")!);
  }

  ngOnInit(): void {
  }

}
