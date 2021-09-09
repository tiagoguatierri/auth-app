import { createAction, props } from '@ngrx/store';
import { AuthCredentials, AuthFailure, AuthSuccess } from './auth.models';

export const login = createAction(
  '[Auth/API] Login',
  props<{ credentials: AuthCredentials }>()
);

export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  props<AuthSuccess>()
);

export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  props<AuthFailure>()
);

export const logout = createAction('[Auth/API] Logout');
