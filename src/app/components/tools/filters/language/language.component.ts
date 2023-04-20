import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  form: FormGroup;
  title = "Выбор языка";

  constructor() {
    this._createForm();
  }

  ngOnInit(): void {
  }

  _createForm(): void {
    this.form = new FormGroup({
      language: new FormControl('ru-Ru')
    });
  }

  handleChange($event: Event) {
    console.log(this.form.getRawValue());
  }
}
