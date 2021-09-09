import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  AuthCredentials,
  AuthFailure,
  AuthSuccess,
} from './+state/auth.models';
import { UserModel } from '../core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = '/api/users';

  constructor(private http: HttpClient) {}

  login({
    email,
    password,
  }: AuthCredentials): Observable<AuthSuccess | AuthFailure> {
    return this.http
      .get<UserModel[]>(`${this.url}/?email=${encodeURIComponent(email)}`)
      .pipe(
        map(([_user]) => {
          if (_user && _user.password === password) {
            const { password, ...user } = _user;
            return {
              accessToken: Array.from({ length: 32 })
                .map(() => Math.floor(Math.random() * 16).toString(16))
                .join(''),
              user,
            };
          }
          return {
            errorMessage: 'Nome de usuario ou senha invalidos',
          };
        })
      );
  }

  logout(): Observable<void> {
    return of();
  }
}
