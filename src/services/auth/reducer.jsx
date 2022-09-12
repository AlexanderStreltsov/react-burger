import { ActionTypes } from "./actions";

const initialState = {
  user: { name: "", email: "" },
  isRegisterLoading: false,
  registerError: null,
  isGetUserLoading: false,
  getUserError: null,
  isUpdateLoading: false,
  updateError: null,
  isForgotLoading: false,
  forgotError: null,
  isForgotGeted: false,
  resetError: null,
  isResetLoading: false,
  isResetSucceded: false,
  loginError: null,
  isLoginLoading: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REGISTER_REQUEST: {
      return {
        ...state,
        isRegisterLoading: true,
        registerError: null,
      };
    }
    case ActionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        isRegisterLoading: false,
        registerError: null,
        user: action.payload,
      };
    }
    case ActionTypes.REGISTER_FAILED: {
      return {
        ...state,
        isRegisterLoading: false,
        registerError: action.payload,
      };
    }
    case ActionTypes.LOGIN_REQUEST: {
      return {
        ...state,
        isLoginLoading: true,
        loginError: null,
      };
    }
    case ActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isLoginLoading: false,
        loginError: null,
        user: action.payload,
      };
    }
    case ActionTypes.LOGIN_FAILED: {
      return {
        ...state,
        isLoginLoading: false,
        loginError: action.payload,
      };
    }
    case ActionTypes.GET_USER_REQUEST: {
      return {
        ...state,
        isGetUserLoading: true,
        getUserError: null,
      };
    }
    case ActionTypes.GET_USER_SUCCESS: {
      return {
        ...state,
        isGetUserLoading: false,
        getUserError: null,
        user: action.payload,
      };
    }
    case ActionTypes.GET_USER_FAILED: {
      return {
        ...state,
        isGetUserLoading: false,
        getUserError: action.payload,
      };
    }
    case ActionTypes.UPDATE_REQUEST: {
      return {
        ...state,
        isUpdateLoading: true,
        updateError: null,
      };
    }
    case ActionTypes.UPDATE_SUCCESS: {
      return {
        ...state,
        isUpdateLoading: false,
        updateError: null,
        user: action.payload,
      };
    }
    case ActionTypes.UPDATE_FAILED: {
      return {
        ...state,
        isUpdateLoading: false,
        updateError: action.payload,
      };
    }
    case ActionTypes.FORGOT_REQUEST: {
      return {
        ...state,
        isForgotLoading: true,
        forgotError: false,
      };
    }
    case ActionTypes.FORGOT_SUCCESS: {
      return {
        ...state,
        isForgotLoading: false,
        forgotError: null,
        isForgotGeted: true,
      };
    }
    case ActionTypes.FORGOT_FAILED: {
      return {
        ...state,
        isForgotLoading: false,
        forgotError: action.payload,
      };
    }
    case ActionTypes.RESET_REQUEST: {
      return {
        ...state,
        isResetLoading: true,
        resetError: false,
      };
    }
    case ActionTypes.RESET_SUCCESS: {
      return {
        ...state,
        isResetLoading: false,
        resetError: null,
        isResetSucceded: true,
      };
    }
    case ActionTypes.RESET_FAILED: {
      return {
        ...state,
        isResetLoading: false,
        resetError: action.payload,
      };
    }
    case ActionTypes.RESET_ERRORS: {
      return {
        ...state,
        registerError: null,
        getUserError: null,
        updateError: null,
        forgotError: null,
        resetError: null,
        loginError: null,
      };
    }
    default:
      return state;
  }
};
