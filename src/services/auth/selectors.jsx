import { name } from "./actions";

export const getUser = (store) => store[name].user;
export const getRegisterSendig = (store) => store[name].registerSending;
export const getResiterError = (store) => store[name].registerError;
