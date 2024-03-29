import {
  registerUserReq,
  updateProfileReq,
  refreshTokenReq,
  getUserReq,
  forgotReq,
  resetReq,
  loginReq,
  logoutReq,
} from "../../utils/api";
import { setCookie } from "../../utils/utils";
import { IActionTypes } from "./types";
import {
  AppThunk,
  AppDispatch,
  ILoginForm,
  IRegistrationForm,
  IResetPasswordForm,
} from "../../utils/types";

export const name: "AUTH" = "AUTH";

export const ActionTypes: IActionTypes = {
  REGISTER_REQUEST: `${name}/REGISTER_REQUEST`,
  REGISTER_SUCCESS: `${name}/REGISTER_SUCCESS`,
  REGISTER_FAILED: `${name}/REGISTER_FAILED`,

  GET_USER_REQUEST: `${name}/GET_USER_REQUEST`,
  GET_USER_SUCCESS: `${name}/GET_USER_SUCCESS`,
  GET_USER_FAILED: `${name}/GET_USER_FAILED`,

  UPDATE_REQUEST: `${name}/UPDATE_REQUEST`,
  UPDATE_SUCCESS: `${name}/UPDATE_SUCCESS`,
  UPDATE_FAILED: `${name}/UPDATE_FAILED`,

  LOGIN_REQUEST: `${name}/LOGIN_REQUEST`,
  LOGIN_SUCCESS: `${name}/LOGIN_SUCCESS`,
  LOGIN_FAILED: `${name}/LOGIN_FAILED`,

  FORGOT_REQUEST: `${name}/FORGOT_REQUEST`,
  FORGOT_SUCCESS: `${name}/FORGOT_SUCCESS`,
  FORGOT_FAILED: `${name}/FORGOT_FAILED`,

  RESET_REQUEST: `${name}/RESET_REQUEST`,
  RESET_SUCCESS: `${name}/RESET_SUCCESS`,
  RESET_FAILED: `${name}/RESET_FAILED`,

  LOGOUT_REQUEST: `${name}/LOGOUT_REQUEST`,
  LOGOUT_SUCCESS: `${name}/LOGOUT_SUCCESS`,
  LOGOUT_FAILED: `${name}/LOGOUT_FAILED`,

  RESET_ERRORS: `${name}/RESET_ERRORS`,
};

export const registerUser: AppThunk =
  (form: IRegistrationForm) => (dispatch: AppDispatch) => {
    dispatch({ type: ActionTypes.REGISTER_REQUEST });

    return registerUserReq(form)
      .then((result) => {
        const authToken = result.accessToken.split("Bearer ")[1];
        setCookie("token", authToken, { path: "/" });
        localStorage.setItem("token", result.refreshToken);
        dispatch({
          type: ActionTypes.REGISTER_SUCCESS,
          payload: result.user,
        });
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.REGISTER_FAILED,
          payload: err.message,
        });
        return Promise.reject(err);
      });
  };

export const getUser: AppThunk = () => {
  return function getUserAction(dispatch: AppDispatch) {
    dispatch({ type: ActionTypes.GET_USER_REQUEST });
    getUserReq()
      .then((result) => {
        dispatch({
          type: ActionTypes.GET_USER_SUCCESS,
          payload: result.user,
        });
      })
      .catch((err) => {
        if (err.message === "jwt expired") {
          refreshTokenReq().then(() => getUserAction(dispatch));
        } else {
          dispatch({
            type: ActionTypes.GET_USER_FAILED,
            payload: err.message,
          });
        }
      });
  };
};

export const updateProfile: AppThunk = (form: IRegistrationForm) => {
  return function updateProfileAction(dispatch: AppDispatch) {
    dispatch({ type: ActionTypes.UPDATE_REQUEST });
    updateProfileReq(form)
      .then((result) => {
        dispatch({
          type: ActionTypes.UPDATE_SUCCESS,
          payload: result.user,
        });
      })
      .catch((err) => {
        if (err.message === "jwt expired") {
          refreshTokenReq().then(() => updateProfileAction(dispatch));
        } else {
          dispatch({
            type: ActionTypes.UPDATE_FAILED,
            payload: err.message,
          });
        }
      });
  };
};

export const forgotPassword: AppThunk =
  (email: string) => (dispatch: AppDispatch) => {
    dispatch({ type: ActionTypes.FORGOT_REQUEST });

    forgotReq(email)
      .then(() => {
        dispatch({ type: ActionTypes.FORGOT_SUCCESS });
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.FORGOT_FAILED,
          payload: err.message,
        });
      });
  };

export const resetPassword: AppThunk =
  (form: IResetPasswordForm) => (dispatch: AppDispatch) => {
    dispatch({ type: ActionTypes.RESET_REQUEST });

    resetReq(form)
      .then(() => {
        dispatch({ type: ActionTypes.RESET_SUCCESS });
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.RESET_FAILED,
          payload: err.message,
        });
      });
  };

export const loginUser: AppThunk =
  (form: ILoginForm) => (dispatch: AppDispatch) => {
    dispatch({ type: ActionTypes.LOGIN_REQUEST });

    loginReq(form)
      .then((result) => {
        const authToken = result.accessToken.split("Bearer ")[1];
        setCookie("token", authToken, { path: "/" });
        localStorage.setItem("token", result.refreshToken);
        dispatch({
          type: ActionTypes.LOGIN_SUCCESS,
          payload: result.user,
        });
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.LOGIN_FAILED,
          payload: err.message,
        });
      });
  };

export const logoutUser: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({ type: ActionTypes.LOGOUT_REQUEST });

  logoutReq()
    .then(() => {
      setCookie("token", "", { expires: -10, path: "/" });
      localStorage.removeItem("token");
      dispatch({ type: ActionTypes.LOGOUT_SUCCESS });
    })
    .catch((err) => {
      dispatch({
        type: ActionTypes.LOGOUT_FAILED,
        payload: err.message,
      });
    });
};
