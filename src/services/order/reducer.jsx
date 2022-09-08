import { ActionTypes } from "./actions";

const initialState = {
  order: null,
  isLoading: false,
  isFailed: false,
  isOpen: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ActionTypes.CREATE_SUCCESS: {
      return {
        ...state,
        order: action.payload,
        isLoading: false,
        isFailed: false,
        isOpen: true,
      };
    }
    case ActionTypes.CREATE_FAILED: {
      return {
        ...state,
        isLoading: false,
        isFailed: true,
      };
    }
    case ActionTypes.RESET_MODAL: {
      return initialState;
    }
    default:
      return state;
  }
};
