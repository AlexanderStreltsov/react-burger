import { getIngredients } from "../../utils/api";

export const name = "INGREDIENTS";

export const ActionTypes = {
  GET_REQUEST: `${name}/GET_REQUEST`,
  GET_SUCCESS: `${name}/GET_SUCCESS`,
  GET_FAILED: `${name}/GET_FAILED`,
  SWITCH_TAB: `${name}/SWITCH_TAB`,
};

export const getIngredientsAction = () => (dispatch) => {
  dispatch({ type: ActionTypes.GET_REQUEST });

  return getIngredients()
    .then((result) => {
      dispatch({
        type: ActionTypes.GET_SUCCESS,
        payload: result.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ActionTypes.GET_FAILED,
        payload: err,
      });
    });
};

export const setCurrentTab = (tab) => {
  return {
    type: ActionTypes.SWITCH_TAB,
    payload: tab,
  };
};
