import { name, ActionTypes } from "./actions";

export interface IActionTypes {
  readonly CREATE_REQUEST: `${typeof name}/CREATE_REQUEST`;
  readonly CREATE_SUCCESS: `${typeof name}/CREATE_SUCCESS`;
  readonly CREATE_FAILED: `${typeof name}/CREATE_FAILED`;
  readonly RESET_MODAL: `${typeof name}/RESET_MODAL`;
}

interface ICreateRequestAction {
  readonly type: typeof ActionTypes.CREATE_REQUEST;
}

interface ICreateSuccessAction {
  readonly type: typeof ActionTypes.CREATE_SUCCESS;
  readonly payload: number;
}

interface ICreateFailedAction {
  readonly type: typeof ActionTypes.CREATE_FAILED;
  readonly payload: string;
}

interface ICreateResetModalAction {
  readonly type: typeof ActionTypes.RESET_MODAL;
}

export type TOrderActions =
  | ICreateRequestAction
  | ICreateSuccessAction
  | ICreateFailedAction
  | ICreateResetModalAction;

export interface IOrderState {
  order: number | null;
  isLoading: boolean;
  error: string | null;
  isOpen: boolean;
}
