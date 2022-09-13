import { name } from "./actions";

export const getUser = (store) => store[name].user;
export const getRegisterStatus = (store) => store[name].isRegisterLoading;
export const getRegisterError = (store) => store[name].registerError;
export const getUserStatus = (store) => store[name].isGetUserLoading;
export const getUserError = (store) => store[name].getUserError;
export const getUpdateStatus = (store) => store[name].isUpdateLoading;
export const getUpdateError = (store) => store[name].updateError;
export const getForgotStatus = (store) => store[name].isForgotLoading;
export const getForgotGeted = (store) => store[name].isForgotGeted;
export const getResetStatus = (store) => store[name].isResetLoading;
export const getResetError = (store) => store[name].resetError;
export const getResetSucceded = (store) => store[name].isResetSucceded;
export const getLoginStatus = (store) => store[name].isLoginLoading;
export const getLoginError = (store) => store[name].loginError;
export const getLogoutStatus = (store) => store[name].isLogoutLoading;
