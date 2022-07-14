import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SWITCH_TAB,
} from "../actions/ingredients";

const initialState = {
  ingredients: [],
  isLoading: false,
  isFailed: false,
  currentTab: "bun",
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.payload,
        isLoading: false,
        isFailed: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        isLoading: false,
        isFailed: true,
      };
    }
    case SWITCH_TAB: {
      return {
        ...state,
        currentTab: action.payload,
      };
    }
    default:
      return state;
  }
};
