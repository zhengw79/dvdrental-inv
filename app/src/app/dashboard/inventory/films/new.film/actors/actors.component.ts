import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormGroupName } from '@angular/forms';

@Component({
  selector: 'app-new-film-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {
  formModel: FormGroup = new FormGroup({
    actors: new FormArray([new FormGroup({
      first_name: new FormControl(),
      last_name: new FormControl()
    })])
  });

  constructor() { }

  ngOnInit(): void {
  }

  getActorControls() {
    return (this.formModel.get("actors") as FormArray).controls
  }

  getActors() {
    return this.formModel.get("actors") as FormArray;
  }

  addActor() {
    (this.formModel.get("actors") as FormArray).push(new FormGroup({
      first_name: new FormControl(),
      last_name: new FormControl()
    }));
  }

  removeActor(index: number) {
    console.log(index);
    (this.formModel.get("actors") as FormArray).removeAt(index);
  }
}
