import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-film-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {
  formModel: FormGroup = new FormGroup({
    first_name: new FormArray([new FormControl()]),
    // last_name: new FormArray([new FormControl()])
  })
  constructor() { }

  ngOnInit(): void {
  }

  getFirstNameControls() {
    return (this.formModel.get("first_name") as FormArray).controls;
  }
}
