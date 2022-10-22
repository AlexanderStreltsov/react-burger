import { name, ActionTypes } from "./actions";
import { IIngredient, TIngredientType } from "../../utils/types";

export interface IActionTypes {
  readonly GET_REQUEST: `${typeof name}/GET_REQUEST`;
  readonly GET_SUCCESS: `${typeof name}/GET_SUCCESS`;
  readonly GET_FAILED: `${typeof name}/GET_FAILED`;
  readonly SWITCH_TAB: `${typeof name}/SWITCH_TAB`;
}

interface IGetRequestAction {
  readonly type: typeof ActionTypes.GET_REQUEST;
}

interface IGetSuccessAction {
  readonly type: typeof ActionTypes.GET_SUCCESS;
  readonly payload: IIngredient[];
}

interface IGetFailedAction {
  readonly type: typeof ActionTypes.GET_FAILED;
  readonly payload: string;
}

export interface IGetSwitchTabAction {
  readonly type: typeof ActionTypes.SWITCH_TAB;
  payload: TIngredientType;
}

export type TIngredientsActions =
  | IGetRequestAction
  | IGetSuccessAction
  | IGetFailedAction
  | IGetSwitchTabAction;

export interface IIngredientsState {
  ingredients: IIngredient[];
  isLoading: boolean;
  error: string | null;
  currentTab: TIngredientType;
}
