import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { UserModel } from '../models/user.model';

export class FakeApiService implements InMemoryDbService {
  createDb(reqInfo?: RequestInfo) {
    const users: UserModel[] = [
      {
        id: 1,
        name: 'Tiago Guatierri',
        email: 'tiagovit@gmail.com',
        password: '123456',
        isActive: true,
      },
    ];

    return { users };
  }
}
