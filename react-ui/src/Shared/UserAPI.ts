import { IUser } from './Types';
import SnackbarService from './SnackbarService';

export class UserAPI {
  static loginToServer = async (user: IUser) => {
    const res = await fetch('/api/login/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user })
    });
    return res;
  };

  static createUser = async (user: IUser) => {
    const res = await fetch('/api/users/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user })
    });
    if (res.status === 400)
      SnackbarService.error('that user already exists, please try logging in');
    if (res.status === 200) {
      SnackbarService.success(
        'user created, now login with that username and password'
      );
    }
    return;
  };

  static getAllUsers = async (): Promise<IUser[]> => {
    const res = await fetch(`/api/users`);
    const json = await res.json();
    console.log('here are all users, json', json);
    return json;
  };

  static updateUsers = async (users: IUser[]) => {
    console.log('patching to users');
    const res = await fetch('/api/users/', {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ users })
    });
    const json = await res.json();
    return json;
  };
}
