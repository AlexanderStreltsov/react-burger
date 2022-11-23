import { name, ActionTypes } from "./actions";

export interface IActionTypes {
  readonly LOAD_IMAGE: `${typeof name}/LOAD_IMAGE`;
}

export interface ILoadImageAction {
  readonly type: typeof ActionTypes.LOAD_IMAGE;
  readonly payload: boolean;
}

export type TDetailsActions = ILoadImageAction;

export interface IDetailsState {
  isLoading: boolean;
}
