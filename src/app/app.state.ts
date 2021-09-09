import * as fromAuth from './auth/+state/auth.reducer';

import { localStorageSync } from 'ngrx-store-localstorage';
import { storeFreeze } from 'ngrx-store-freeze';

import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../environments/environment';

export interface AppState {
  [fromAuth.AUTH_FEATURE_KEY]?: fromAuth.State;
}

export function localStorageSyncReducer(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return localStorageSync({
    keys: [
      {
        [fromAuth.AUTH_FEATURE_KEY]: ['accessToken', 'isAuthenticated', 'user'],
      },
    ],
    rehydrate: true,
  })(reducer);
}

export const reducers: ActionReducerMap<AppState> = {};

export const metaReducers: Array<MetaReducer<AppState>> =
  !environment.production
    ? [localStorageSyncReducer, storeFreeze]
    : [localStorageSyncReducer];
