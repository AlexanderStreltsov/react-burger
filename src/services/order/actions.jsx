import { saveOrder, refreshTokenReq } from "../../utils/api";

export const name = "ORDER";

export const ActionTypes = {
  CREATE_REQUEST: `${name}/CREATE_REQUEST`,
  CREATE_SUCCESS: `${name}/CREATE_SUCCESS`,
  CREATE_FAILED: `${name}/CREATE_FAILED`,
  RESET_MODAL: `${name}/RESET_MODAL`,
};

export const orderBurger = (ingredients) => {
  return function createBurgerOrder(dispatch) {
    dispatch({ type: ActionTypes.CREATE_REQUEST });

    return saveOrder(ingredients)
      .then((result) => {
        dispatch({
          type: ActionTypes.CREATE_SUCCESS,
          payload: result.order.number,
        });
      })
      .catch((err) => {
        if (err.message === "jwt expired") {
          refreshTokenReq().then(() => createBurgerOrder(dispatch));
        } else {
          dispatch({
            type: ActionTypes.CREATE_FAILED,
            payload: err.message,
          });
        }
      });
  };
};
