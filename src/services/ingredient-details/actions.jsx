export const name = "DETAILS";

export const ActionTypes = {
  RESET_MODAL: `${name}/RESET_MODAL`,
  LOAD_IMAGE: `${name}/LOAD_IMAGE`,
};

export const loadImage = (status) => {
  return {
    type: ActionTypes.LOAD_IMAGE,
    payload: status,
  };
};
