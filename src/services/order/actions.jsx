import { saveOrder } from "../../utils/api";

export const name = "ORDER";

export const ActionTypes = {
  CREATE_REQUEST: `${name}/CREATE_REQUEST`,
  CREATE_SUCCESS: `${name}/CREATE_SUCCESS`,
  CREATE_FAILED: `${name}/CREATE_FAILED`,
  RESET_MODAL: `${name}/RESET_MODAL`,
};

export const orderBurger = (order) => (dispatch) => {
  dispatch({
    type: ActionTypes.CREATE_REQUEST,
  });
  return saveOrder(order)
    .then((result) => {
      dispatch({
        type: ActionTypes.CREATE_SUCCESS,
        payload: result.order.number,
      });
    })
    .catch((err) => {
      dispatch({
        type: ActionTypes.CREATE_FAILED,
        payload: err,
      });
    });
};
