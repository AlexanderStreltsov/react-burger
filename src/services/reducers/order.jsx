import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  RESET_ORDER_MODAL,
} from "../actions/order";

const initialState = {
  order: null,
  isLoading: false,
  isFailed: false,
  isOpen: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.payload,
        isLoading: false,
        isFailed: false,
        isOpen: true,
      };
    }
    case CREATE_ORDER_FAILED: {
      return {
        ...state,
        isLoading: false,
        isFailed: true,
      };
    }
    case RESET_ORDER_MODAL: {
      return initialState;
    }
    default:
      return state;
  }
};
