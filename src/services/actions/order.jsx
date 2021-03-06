import { saveOrder } from "../../utils/api";

export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILED = "CREATE_ORDER_FAILED";
export const RESET_ORDER_MODAL = "RESET_ORDER_MODAL";

export const orderBurger = (order) => (dispatch) => {
  dispatch({
    type: CREATE_ORDER_REQUEST,
  });
  return saveOrder(order)
    .then((result) => {
      dispatch({
        type: CREATE_ORDER_SUCCESS,
        payload: result.order.number,
      });
    })
    .catch((err) => {
      dispatch({
        type: CREATE_ORDER_FAILED,
        payload: err,
      });
    });
};
