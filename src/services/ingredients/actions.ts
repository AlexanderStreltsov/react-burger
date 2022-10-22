import { getIngredients } from "../../utils/api";
import { IActionTypes, IGetSwitchTabAction } from "./types";
import { AppThunk, AppDispatch, TIngredientType } from "../../utils/types";

export const name: "INGREDIENTS" = "INGREDIENTS";

export const ActionTypes: IActionTypes = {
  GET_REQUEST: `${name}/GET_REQUEST`,
  GET_SUCCESS: `${name}/GET_SUCCESS`,
  GET_FAILED: `${name}/GET_FAILED`,
  SWITCH_TAB: `${name}/SWITCH_TAB`,
};

export const getIngredientsAction: AppThunk = () => (dispatch: AppDispatch) => {
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
        payload: err.message,
      });
    });
};

export const setCurrentTab = (tab: TIngredientType): IGetSwitchTabAction => {
  return {
    type: ActionTypes.SWITCH_TAB,
    payload: tab,
  };
};
