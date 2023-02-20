import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new.film',
  templateUrl: './new.film.component.html',
  styleUrls: ['./new.film.component.css']
})
export class NewFilmComponent implements OnInit {
  film_id?: number;
  constructor(
    private _route: ActivatedRoute
  ) {
    this.film_id = _route.snapshot.params["film_id"];
  }

  ngOnInit(): void {
  }

  setFilmIdHandler(id: number) {
    this.film_id = id;
    console.log(id);
  }
}
