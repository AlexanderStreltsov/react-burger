import {
  SET_INGREDIENT_MODAL,
  RESET_INGREDIENT_MODAL,
  LOAD_IMAGE,
} from "../actions/ingredient-details";

const initialState = {
  ingredient: {},
  isOpen: false,
  isLoading: false,
};

export const ingredientDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENT_MODAL: {
      return {
        ...state,
        ingredient: action.payload,
        isOpen: true,
      };
    }
    case LOAD_IMAGE: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case RESET_INGREDIENT_MODAL: {
      return initialState;
    }
    default:
      return state;
  }
};
