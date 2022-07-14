import { getIngredients } from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const SWITCH_TAB = "SWITCH_TAB";

export const getIngredientsAction = () => (dispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });

  return getIngredients()
    .then((result) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        payload: result.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_INGREDIENTS_FAILED,
        payload: err,
      });
    });
};

export const setCurrentTab = (tab) => {
  return {
    type: SWITCH_TAB,
    payload: tab,
  };
};
