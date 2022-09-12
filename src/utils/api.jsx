import { getCookie } from "./utils";

const apiUrl = "https://norma.nomoreparties.space/api";

const apiIngredients = apiUrl + "/ingredients";
const apiOrders = apiUrl + "/orders";

const apiAuth = apiUrl + "/auth";
const apiRegister = apiAuth + "/register";
const apiGetUser = apiAuth + "/user";
const apiLogin = apiAuth + "/login";
const apiUpdateProfile = apiAuth + "/user";
const apiRefreshToken = apiAuth + "/token";

const apiForgotPassword = apiUrl + "/password-reset";
const apiResetPassword = apiForgotPassword + "/reset";

const checkResponse = (res) =>
  res.ok ? res.json() : res.json().then((data) => Promise.reject(data));

export const getIngredients = () => {
  return fetch(apiIngredients, { method: "GET" }).then((res) =>
    checkResponse(res)
  );
};

export const saveOrder = (ingredients) => {
  return fetch(apiOrders, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  }).then((res) => checkResponse(res));
};

const request = {
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  redirect: "follow",
  referrerPolicy: "no-referrer",
};

export const registerUserReq = (form) => {
  return fetch(apiRegister, {
    method: "POST",
    ...request,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  }).then((res) => checkResponse(res));
};

export const getUserReq = () => {
  return fetch(apiGetUser, {
    method: "GET",
    ...request,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
  }).then((res) => checkResponse(res));
};

export const updateProfileReq = (form) => {
  return fetch(apiUpdateProfile, {
    method: "PATCH",
    ...request,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify(form),
  }).then((res) => checkResponse(res));
};

export const refreshTokenReq = () => {
  return fetch(apiRefreshToken, {
    method: "POST",
    ...request,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify({
      token: localStorage.getItem("token"),
    }),
  }).then((res) => checkResponse(res));
};

export const forgotReq = (email) => {
  return fetch(apiForgotPassword, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  }).then((res) => checkResponse(res));
};

export const resetReq = (form) => {
  return fetch(apiResetPassword, {
    method: "POST",
    ...request,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  }).then((res) => checkResponse(res));
};

export const loginReq = (form) => {
  return fetch(apiLogin, {
    method: "POST",
    ...request,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  }).then((res) => checkResponse(res));
};
