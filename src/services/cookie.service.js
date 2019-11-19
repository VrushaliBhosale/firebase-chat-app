import * as Cookies from "js-cookie";

export const setSessionCookie = (name,value) => {
  Cookies.remove(name);
  Cookies.set(name, value, { expires: 14 });
};

export const getSessionCookie = (name) => {
  const sessionCookie = Cookies.get(name);

  if (sessionCookie === undefined) {
    return {};
  } else {
    return JSON.parse(sessionCookie);
  }
};
