export const name = "DETAILS";

export const ActionTypes = {
  LOAD_IMAGE: `${name}/LOAD_IMAGE`,
};

export const loadImage = (status) => {
  return {
    type: ActionTypes.LOAD_IMAGE,
    payload: status,
  };
};
