import { name } from "./actions";
import { RootState } from "../../utils/types";

export const getOrderRequestStatus = (store: RootState) =>
  store[name].isLoading;
export const getOrderModalStatus = (store: RootState) => store[name].isOpen;
export const getOrder = (store: RootState) => store[name].order;
