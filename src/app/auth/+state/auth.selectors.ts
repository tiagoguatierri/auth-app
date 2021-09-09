import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, AUTH_FEATURE_KEY } from './auth.reducer';

// Lookup the 'Auth' feature state managed by NgRx
export const getAuthState = createFeatureSelector<State>(AUTH_FEATURE_KEY);

export const isAuthenticated = createSelector(
  getAuthState,
  (state) => state.isAuthenticated
);

export const loading = createSelector(getAuthState, (state) => state.loading);

export const getAccessToken = createSelector(
  getAuthState,
  (state) => state.accessToken
);

export const getErrorMessage = createSelector(
  getAuthState,
  (state) => state.errorMessage
);

export const getUserInStore = createSelector(
  getAuthState,
  (state) => state.user
);
