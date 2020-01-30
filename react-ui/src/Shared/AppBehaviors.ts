export const logOut = () => {
  localStorage.setItem('isLoggedIn', 'false');
  localStorage.setItem('isAdmin', 'false');
  window.location.reload();
}

export const isLoggedIn = () => {
  const loggedIn = localStorage.getItem('isLoggedIn');
  if (!loggedIn) return false;
  return JSON.parse(loggedIn);
}

export const setLoggedIn = () => {
  localStorage.setItem('isLoggedIn', 'true');
}

export const setAdmin = () => {
  localStorage.setItem('isAdmin', 'true');
}

export const isAdmin = () => {
  return true;
  // const admin = localStorage.getItem('isAdmin');
  // if (!admin) return false;
  // return JSON.parse(admin);
}