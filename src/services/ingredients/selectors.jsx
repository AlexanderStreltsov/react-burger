import { name } from "./actions";

export const getIngredients = (store) => store[name].ingredients;
export const getCurrentTab = (store) => store[name].currentTab;
export const getRequestStatus = (store) => store[name].isLoading;
