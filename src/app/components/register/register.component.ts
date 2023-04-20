import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {Location} from "@angular/common";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {AuthService, StorageService} from "../../services";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnChanges {

  form: FormGroup;

  constructor(private _location: Location, private _authService: AuthService, private _router: Router, private _store: StorageService) {
    this._createForm();
  }

  _createForm(): void {
    this.form = new FormGroup({
      username: new FormControl(null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ])
    }, [this._checkPasswords]);
  }

  register($event: SubmitEvent): void {
    $event.preventDefault();
    const rawValue = this.form.getRawValue();
    delete rawValue.confirmPassword;
    this._authService.registerGuest(rawValue);
  }

  _checkPasswords(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password?.value === confirmPassword?.value ? null : {notSame: true};
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._store.registeredUser.subscribe(value => console.log(value));
  }

  handleClick() {
    this._location.back();
  }
}
