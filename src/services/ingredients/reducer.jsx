import { ActionTypes } from "./actions";

const initialState = {
  ingredients: [],
  isLoading: true,
  isFailed: false,
  currentTab: "bun",
};

export const ingredientsReducer = (state = initialState, action) => {
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
        isFailed: false,
      };
    }
    case ActionTypes.GET_FAILED: {
      return {
        ...state,
        isLoading: false,
        isFailed: true,
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
