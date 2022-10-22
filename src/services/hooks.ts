import {
  TypedUseSelectorHook,
  useSelector as useSelectorHook,
  useDispatch as useDispatchHook,
} from "react-redux";
import { RootState, AppDispatch, AppThunk } from "../utils/types";

export const useSelector: TypedUseSelectorHook<RootState> = useSelectorHook;
export const useDispatch: () => AppDispatch | AppThunk = useDispatchHook;
