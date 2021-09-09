import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { AuthService } from '../auth.service';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap((action) => {
        return this.authService.login(action.credentials).pipe(
          map((res: any) => {
            if (res && res.user) {
              return AuthActions.loginSuccess(res);
            }
            return AuthActions.loginFailure(res);
          })
        );
      })
    )
  );

  $loginSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  $logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        switchMap(() =>
          this.authService.logout().pipe(
            catchError(() => of(null)),
            tap(() => {
              this.router.navigateByUrl('/auth');
            })
          )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
}
