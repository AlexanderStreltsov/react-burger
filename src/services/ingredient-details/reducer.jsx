import { ActionTypes } from "./actions";

const initialState = {
  isLoading: false,
};

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_IMAGE: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    default:
      return state;
  }
};
