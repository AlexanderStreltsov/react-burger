import { name } from "./actions";
import { RootState } from "../../utils/types";

export const getLoadImageStatus = (store: RootState) => store[name].isLoading;
