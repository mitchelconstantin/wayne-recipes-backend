import { IUser } from "./Types";

const getLocalStorage = (item: string) => {
  const result = localStorage.getItem(item);
  if (!result) return false;
  return JSON.parse(result);
};

export const logIn = (user: IUser) => {
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('isAdmin', user.isAdmin.toString());
  localStorage.setItem('isOwner', user.isOwner.toString());
};

export const logOut = () => {
  localStorage.setItem('isLoggedIn', 'false');
  localStorage.setItem('isAdmin', 'false');
  localStorage.setItem('isOwner', 'false');
  window.location.reload();
};
export const isLoggedIn = () => getLocalStorage('isLoggedIn');
export const isAdmin = () => getLocalStorage('isAdmin');
export const isOwner = () => getLocalStorage('isOwner');

