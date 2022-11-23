import { getCookie, setCookie } from "./utils";
import {
  IUser,
  ILoginForm,
  IRegistrationForm,
  IResetPasswordForm,
  IRefreshTokenResponse,
  IDefaulResponse,
  IIngredientsResponse,
  IOrderResponse,
} from "./types";

const apiUrl = "https://norma.nomoreparties.space/api";

const apiIngredients = apiUrl + "/ingredients";
const apiOrders = apiUrl + "/orders";

const apiAuth = apiUrl + "/auth";
const apiRegister = apiAuth + "/register";
const apiGetUser = apiAuth + "/user";
const apiLogin = apiAuth + "/login";
const apiUpdateProfile = apiAuth + "/user";
const apiLogout = apiAuth + "/logout";
const apiRefreshToken = apiAuth + "/token";

const apiForgotPassword = apiUrl + "/password-reset";
const apiResetPassword = apiForgotPassword + "/reset";

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((data) => Promise.reject(data));

export const getIngredients = () => {
  return fetch(apiIngredients, { method: "GET" }).then((res) =>
    checkResponse<IIngredientsResponse>(res)
  );
};

export const saveOrder = (ingredients: string[]) => {
  return fetch(apiOrders, {
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify(ingredients),
  }).then((res) => checkResponse<IOrderResponse>(res));
};

export const registerUserReq = (form: IRegistrationForm) => {
  return fetch(apiRegister, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  }).then((res) => checkResponse<IUser>(res));
};

export const getUserReq = () => {
  return fetch(apiGetUser, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
  }).then((res) => checkResponse<IUser>(res));
};

export const updateProfileReq = (form: IRegistrationForm) => {
  return fetch(apiUpdateProfile, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify(form),
  }).then((res) => checkResponse<IUser>(res));
};

export const refreshTokenReq = () => {
  return fetch(apiRefreshToken, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify({
      token: localStorage.getItem("token"),
    }),
  })
    .then((res) => checkResponse<IRefreshTokenResponse>(res))
    .then((res) => {
      const authToken = res.accessToken.split("Bearer ")[1];
      setCookie("token", authToken, { path: "/" });
      localStorage.setItem("token", res.refreshToken);
    });
};

export const forgotReq = (email: string) => {
  return fetch(apiForgotPassword, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  }).then((res) => checkResponse<IDefaulResponse>(res));
};

export const resetReq = (form: IResetPasswordForm) => {
  return fetch(apiResetPassword, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  }).then((res) => checkResponse<IDefaulResponse>(res));
};

export const loginReq = (form: ILoginForm) => {
  return fetch(apiLogin, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  }).then((res) => checkResponse<IUser>(res));
};

export const logoutReq = () => {
  return fetch(apiLogout, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("token"),
    }),
  }).then((res) => checkResponse<IDefaulResponse>(res));
};
