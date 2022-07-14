export const RESET_INGREDIENT_MODAL = "RESET_INGREDIENT_MODAL";
export const SET_INGREDIENT_MODAL = "SET_INGREDIENT_MODAL";

export const setIngredientModal = (ingredient) => {
  return {
    type: SET_INGREDIENT_MODAL,
    payload: ingredient,
  };
};
