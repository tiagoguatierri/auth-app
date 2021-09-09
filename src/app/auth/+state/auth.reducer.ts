import { Action, createReducer, on } from '@ngrx/store';
import { loginSuccess, loginFailure, logout, login } from './auth.actions';
import { User } from './auth.models';

export interface State {
  accessToken: string | undefined;
  errorMessage: string | undefined;
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
}

export const initialState: State = {
  accessToken: undefined,
  errorMessage: undefined,
  isAuthenticated: false,
  loading: false,
  user: null,
};

const authReducer = createReducer(
  initialState,
  on(login, () => ({ ...initialState, loading: true })),
  on(loginSuccess, (state, { accessToken, user }) => ({
    accessToken,
    user,
    errorMessage: undefined,
    isAuthenticated: true,
    loading: false,
  })),
  on(loginFailure, (state, { errorMessage }) => ({
    ...initialState,
    errorMessage,
  })),
  on(logout, () => initialState)
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}

export const AUTH_FEATURE_KEY = 'auth';
