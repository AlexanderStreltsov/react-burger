import { name } from "./actions";

export const getUser = (store) => store[name].user;
export const getRegisterStatus = (store) => store[name].isRegisterLoading;
export const getRegisterError = (store) => store[name].registerError;
export const getUserStatus = (store) => store[name].isGetUserLoading;
export const getUserError = (store) => store[name].getUserError;
export const getUpdateStatus = (store) => store[name].isUpdateLoading;
export const getUpdateError = (store) => store[name].updateError;
