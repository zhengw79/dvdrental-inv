import { Component, Input, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-film-info',
  templateUrl: './film.info.component.html',
  styleUrls: ['./film.info.component.css']
})
export class FilmInfoComponent implements OnInit {
  @Input() film_id?: number;
  constructor(
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.apollo.query({
      query: gql`
      query {
        retrieveFilmById(film_id: ${this.film_id}) {
          film_id,
          title
        }
      }`
    }).subscribe(({ data, error}) => {
      console.log(data);
    });
  }
}
