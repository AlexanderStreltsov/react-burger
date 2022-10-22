import { name, ActionTypes } from "./actions";
import { IIngredientWithId } from "../../utils/types";

export interface IActionTypes {
  readonly ADD: `${typeof name}/ADD`;
  readonly DELETE: `${typeof name}/DELETE`;
  readonly SORT: `${typeof name}/SORT`;
  readonly RESET: `${typeof name}/RESET`;
}

export interface IAddAction {
  readonly type: typeof ActionTypes.ADD;
  readonly payload: IIngredientWithId;
}

export interface IDeleteAction {
  readonly type: typeof ActionTypes.DELETE;
  payload: number;
}

export interface ISortAction {
  readonly type: typeof ActionTypes.SORT;
  payload: {
    to: number;
    from: number;
  };
}

interface IResetAction {
  readonly type: typeof ActionTypes.RESET;
}

export type TConstructorActions =
  | IAddAction
  | IDeleteAction
  | ISortAction
  | IResetAction;

export interface IConstructorState {
  bun: null | IIngredientWithId;
  ingredients: IIngredientWithId[];
}
