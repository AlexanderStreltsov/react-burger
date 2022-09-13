import { name } from "./actions";

export const getOrderRequestStatus = (store) => store[name].isLoading;
export const getOrderModalStatus = (store) => store[name].isOpen;
export const getOrder = (store) => store[name].order;
