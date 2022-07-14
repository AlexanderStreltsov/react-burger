export const RESET_INGREDIENT_MODAL = "RESET_INGREDIENT_MODAL";
export const SET_INGREDIENT_MODAL = "SET_INGREDIENT_MODAL";
export const LOAD_IMAGE = "LOAD_IMAGE";

export const setIngredientModal = (ingredient) => {
  return {
    type: SET_INGREDIENT_MODAL,
    payload: ingredient,
  };
};

export const loadImage = (status) => {
  return {
    type: LOAD_IMAGE,
    payload: status,
  };
};
