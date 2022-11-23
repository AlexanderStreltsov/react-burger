import { name } from "./actions";
import { RootState } from "../../utils/types";

export const getIngredients = (store: RootState) => store[name].ingredients;
export const getCurrentTab = (store: RootState) => store[name].currentTab;
export const getRequestStatus = (store: RootState) => store[name].isLoading;
