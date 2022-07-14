export const ADD_INGREDIENT_CONSTRUCTOR = "ADD_INGREDIENT_CONSTRUCTOR";
export const DELETE_INGREDIENT_CONSTRUCTOR = "DELETE_INGREDIENT_CONSTRUCTOR";
export const RESET_CONSTRUCTOR = "RESET_CONSTRUCTOR";

export const addConstructor = (ingredient) => {
  return {
    type: ADD_INGREDIENT_CONSTRUCTOR,
    payload: ingredient.ingredient,
  };
};

export const deleteConstructor = (index) => {
  return {
    type: DELETE_INGREDIENT_CONSTRUCTOR,
    payload: index,
  };
};
