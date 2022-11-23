import { name } from "./actions";
import { RootState } from "../../utils/types";

export const getUser = (store: RootState) => store[name].user;
export const getRegisterStatus = (store: RootState) =>
  store[name].isRegisterLoading;
export const getRegisterError = (store: RootState) => store[name].registerError;
export const getUserStatus = (store: RootState) => store[name].isGetUserLoading;
export const getUserError = (store: RootState) => store[name].getUserError;
export const getUpdateStatus = (store: RootState) =>
  store[name].isUpdateLoading;
export const getUpdateError = (store: RootState) => store[name].updateError;
export const getForgotStatus = (store: RootState) =>
  store[name].isForgotLoading;
export const getForgotGeted = (store: RootState) => store[name].isForgotGeted;
export const getResetStatus = (store: RootState) => store[name].isResetLoading;
export const getResetError = (store: RootState) => store[name].resetError;
export const getResetSucceded = (store: RootState) =>
  store[name].isResetSucceded;
export const getLoginStatus = (store: RootState) => store[name].isLoginLoading;
export const getLoginError = (store: RootState) => store[name].loginError;
export const getLogoutStatus = (store: RootState) =>
  store[name].isLogoutLoading;
