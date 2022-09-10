import { ActionTypes } from "./actions";

const initialState = {
  user: null,
  registerSending: false,
  registerError: null,
  loginSending: false,
  loginError: null,
  tokenUpdate: false,
  tokenUpdateError: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REGISTER_SEND: {
      return {
        ...state,
        registerSending: true,
        registerError: false,
      };
    }
    case ActionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        registerSending: false,
        registerError: false,
        user: action.payload,
        tokenUpdate: true,
      };
    }
    case ActionTypes.REGISTER_FAILED: {
      return {
        ...state,
        registerSending: false,
        registerError: action.payload,
      };
    }
    case ActionTypes.RESET: {
      return {
        initialState,
      };
    }
    default:
      return state;
  }
};
