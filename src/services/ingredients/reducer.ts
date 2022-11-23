import { ActionTypes } from "./actions";
import { IIngredientsState, TIngredientsActions } from "./types";

const initialState: IIngredientsState = {
  ingredients: [],
  isLoading: true,
  error: null,
  currentTab: "bun",
};

export const ingredientsReducer = (
  state = initialState,
  action: TIngredientsActions
): IIngredientsState => {
  switch (action.type) {
    case ActionTypes.GET_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ActionTypes.GET_SUCCESS: {
      return {
        ...state,
        ingredients: action.payload,
        isLoading: false,
        error: null,
      };
    }
    case ActionTypes.GET_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case ActionTypes.SWITCH_TAB: {
      return {
        ...state,
        currentTab: action.payload,
      };
    }
    default:
      return state;
  }
};
