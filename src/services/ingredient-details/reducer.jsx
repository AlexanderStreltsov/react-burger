import { ActionTypes } from "./actions";

const initialState = {
  ingredient: {},
  isOpen: false,
  isLoading: false,
};

export const ingredientDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_MODAL: {
      return {
        ...state,
        ingredient: action.payload,
        isOpen: true,
      };
    }
    case ActionTypes.LOAD_IMAGE: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case ActionTypes.RESET_MODAL: {
      return initialState;
    }
    default:
      return state;
  }
};
