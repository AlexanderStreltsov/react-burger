import { name } from "./actions";

export const getLoadImageStatus = (store) => store[name].isLoading;
