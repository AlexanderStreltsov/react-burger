import { v4 as uuid } from "uuid";

export const ADD_INGREDIENT_CONSTRUCTOR = "ADD_INGREDIENT_CONSTRUCTOR";
export const DELETE_INGREDIENT_CONSTRUCTOR = "DELETE_INGREDIENT_CONSTRUCTOR";
export const SORT_INGREDIENT_CONSTRUCTOR = "SORT_INGREDIENT_CONSTRUCTOR";
export const RESET_CONSTRUCTOR = "RESET_CONSTRUCTOR";

export const addConstructor = (ingredient) => {
  return {
    type: ADD_INGREDIENT_CONSTRUCTOR,
    payload: {
      ...ingredient.ingredient,
      id: uuid(),
    },
  };
};

export const deleteConstructor = (index) => {
  return {
    type: DELETE_INGREDIENT_CONSTRUCTOR,
    payload: index,
  };
};

export const sortConstructor = (indexFrom, indexTo) => {
  return {
    type: SORT_INGREDIENT_CONSTRUCTOR,
    payload: {
      to: indexTo,
      from: indexFrom,
    },
  };
};
