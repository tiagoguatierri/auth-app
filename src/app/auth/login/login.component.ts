import * as AuthActions from '../+state/auth.actions';
import * as AuthSelectors from '../+state/auth.selectors';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { AppState } from 'src/app/app.state';

import Swal from 'sweetalert2';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  year!: number;

  loading$!: Observable<boolean>;

  constructor(private actions$: Actions, private store: Store<AppState>) {}

  get f() {
    return this.form.controls;
  }

  private init(): void {
    this.form = new FormGroup({
      email: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      password: new FormControl('', Validators.required),
    });

    this.year = new Date().getFullYear();
    this.loading$ = this.store.pipe(select(AuthSelectors.loading));
  }

  private handleStoreActions(): void {
    // Login success
    this.actions$
      .pipe(ofType(AuthActions.loginSuccess), untilDestroyed(this))
      .subscribe();

    // Login failure
    this.actions$
      .pipe(
        ofType(AuthActions.loginFailure),
        untilDestroyed(this),
        map((actions) => actions.errorMessage)
      )
      .subscribe((errorMessage) => {
        Swal.fire('Algo deu errado!', errorMessage, 'error');
      });
  }

  getValidationClasses(key: string): Record<string, boolean | undefined> {
    const control = this.form.get(key);
    return {
      'is-valid': control?.valid && (control.touched || control.dirty),
      'is-invalid': control?.invalid && (control.touched || control.dirty),
    };
  }

  submit(): void {
    // Se o formulário for invalid marca os campos como tocado
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { value } = this.form;

    // Dispara a ação de login
    this.store.dispatch(AuthActions.login({ credentials: value }));
  }

  ngOnInit(): void {
    this.init();
    this.handleStoreActions();
  }
}
