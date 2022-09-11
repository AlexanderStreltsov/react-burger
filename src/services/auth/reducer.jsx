import { ActionTypes } from "./actions";

const initialState = {
  user: { name: "", email: "" },
  isRegisterLoading: false,
  registerError: false,
  isGetUserLoading: false,
  getUserError: false,
  isUpdateLoading: false,
  updateError: false,
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
        updateError: false,
      };
    }
    case ActionTypes.UPDATE_SUCCESS: {
      return {
        ...state,
        isUpdateLoading: false,
        updateError: false,
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
    case ActionTypes.RESET: {
      return {
        initialState,
      };
    }
    default:
      return state;
  }
};
