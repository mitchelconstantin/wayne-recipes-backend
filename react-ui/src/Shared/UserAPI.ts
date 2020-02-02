import { IUser } from './Types';

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
    return res;
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
