export const name = "DETAILS";

export const ActionTypes = {
  SET_MODAL: `${name}/SET_MODAL`,
  RESET_MODAL: `${name}/RESET_MODAL`,
  LOAD_IMAGE: `${name}/LOAD_IMAGE`,
};

export const setIngredientModal = (ingredient) => {
  return {
    type: ActionTypes.SET_MODAL,
    payload: ingredient,
  };
};

export const loadImage = (status) => {
  return {
    type: ActionTypes.LOAD_IMAGE,
    payload: status,
  };
};
