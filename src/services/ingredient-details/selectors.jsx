import { name } from "./actions";

export const getIngredient = (store) => store[name].ingredient;
export const getLoadImageStatus = (store) => store[name].isLoading;
export const getDetailModalStatus = (store) => store[name].isOpen;
