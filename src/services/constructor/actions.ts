import { v4 as uuid } from "uuid";
import { IActionTypes, IAddAction, IDeleteAction, ISortAction } from "./types";
import { IIngredient } from "../../utils/types";

export const name: "CONSTRUCTOR" = "CONSTRUCTOR";

export const ActionTypes: IActionTypes = {
  ADD: `${name}/ADD`,
  DELETE: `${name}/DELETE`,
  SORT: `${name}/SORT`,
  RESET: `${name}/RESET`,
};

export const addConstructor = (ingredient: {
  ingredient: IIngredient;
}): IAddAction => {
  return {
    type: ActionTypes.ADD,
    payload: {
      ...ingredient.ingredient,
      id: uuid(),
    },
  };
};

export const deleteConstructor = (index: number): IDeleteAction => {
  return {
    type: ActionTypes.DELETE,
    payload: index,
  };
};

export const sortConstructor = (
  indexFrom: number,
  indexTo: number
): ISortAction => {
  return {
    type: ActionTypes.SORT,
    payload: {
      to: indexTo,
      from: indexFrom,
    },
  };
};
