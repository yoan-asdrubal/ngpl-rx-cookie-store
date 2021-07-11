import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-skeleton-test',
  templateUrl: './ngpl-directives-test.component.html',
  styleUrls: ['./ngpl-directives-test.component.scss']
})
export class NgplDirectivesTestComponent implements OnInit {

  formGroup: FormGroup;
  disableControl = new FormControl();
  readOnlyControl = new FormControl();

  constructor(private _formB: FormBuilder) { }


  ngOnInit(): void {
    this.formGroup = this._formB.group({
      field1: [],
      field2: [],
      field3: [],
    });
  }

}
