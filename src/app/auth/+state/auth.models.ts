import { UserModel } from '../../core/models/user.model';

export type User = Omit<UserModel, 'password'>;

export type AuthCredentials = {
  email: string;
  password: string;
};

export type AuthSuccess = {
  accessToken: string;
  user: User;
};

export type AuthFailure = {
  errorMessage: string;
};
