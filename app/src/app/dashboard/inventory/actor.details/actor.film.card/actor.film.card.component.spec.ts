import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorFilmCardComponent } from './actor.film.card.component';

describe('ActorFilmCardComponent', () => {
  let component: ActorFilmCardComponent;
  let fixture: ComponentFixture<ActorFilmCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorFilmCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActorFilmCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
