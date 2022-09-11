import {
  registerUserReq,
  updateProfileReq,
  refreshTokenReq,
  getUserReq,
  forgotReq,
} from "../../utils/api";
import { setCookie, getErrMsgForUser } from "../../utils/utils";

export const name = "AUTH";

export const ActionTypes = {
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

  LOGOUT: `${name}/LOGOUT`,
  RESET: `${name}/RESET`,
};

export const registerUser = (form) => (dispatch) => {
  dispatch({ type: ActionTypes.REGISTER_REQUEST });

  return registerUserReq(form)
    .then((result) => {
      const authToken = result.accessToken.split("Bearer ")[1];
      setCookie("token", authToken);
      localStorage.setItem("token", result.refreshToken);
      dispatch({
        type: ActionTypes.REGISTER_SUCCESS,
        payload: result.user,
      });
    })
    .catch((err) => {
      dispatch({
        type: ActionTypes.REGISTER_FAILED,
        payload: getErrMsgForUser(err) || err.message,
      });
      return Promise.reject(err);
    });
};

const refreshToken = () => {
  return refreshTokenReq().then((result) => {
    const authToken = result.accessToken.split("Bearer ")[1];
    setCookie("token", authToken);
    localStorage.setItem("token", result.refreshToken);
  });
};

export const getUser = () => {
  return function getUserAction(dispatch) {
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
          refreshToken().then(() => getUserAction(dispatch));
        }
        dispatch({
          type: ActionTypes.GET_USER_FAILED,
          payload: err.message,
        });
      });
  };
};

export const updateProfile = (form) => {
  return function updateProfileAction(dispatch) {
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
          refreshToken().then(() => updateProfileAction(dispatch));
        }
        dispatch({
          type: ActionTypes.UPDATE_FAILED,
          payload: getErrMsgForUser(err) || err.message,
        });
      });
  };
};

export const forgotPassword = (email) => (dispatch) => {
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
