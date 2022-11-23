import { ActionTypes } from "./actions";
import { IOrderState, TOrderActions } from "./types";

const initialState: IOrderState = {
  order: null,
  isLoading: false,
  error: null,
  isOpen: false,
};

export const orderReducer = (
  state = initialState,
  action: TOrderActions
): IOrderState => {
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
        error: null,
        isOpen: true,
      };
    }
    case ActionTypes.CREATE_FAILED: {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    }
    case ActionTypes.RESET_MODAL: {
      return initialState;
    }
    default:
      return state;
  }
};
