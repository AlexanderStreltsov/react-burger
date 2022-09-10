import { register } from "../../utils/api";
import { setCookie } from "../../utils/utils";

export const name = "AUTH";

export const ActionTypes = {
  SET_USER: `${name}/SET_USER`,
  LOGOUT: `${name}/LOGOUT`,
  REGISTER_SEND: `${name}/REGISTER_SEND`,
  REGISTER_SUCCESS: `${name}/REGISTER_SUCCESS`,
  REGISTER_FAILED: `${name}/REGISTER_FAILED`,
  LOGIN_SEND: `${name}/LOGIN_SEND`,
  LOGIN_SUCCESS: `${name}/LOGIN_SUCCESS`,
  LOGIN_FAILED: `${name}/LOGIN_FAILED`,
  TOKEN_UPDATE_SUCCESS: `${name}/TOKEN_UPDATE_SUCCESS`,
  TOKEN_UPDATE_FAILED: `${name}/TOKEN_UPDATE_FAILED`,
  RESET: `${name}/RESET`,
};

export const registerUser = (form) => (dispatch) => {
  dispatch({
    type: ActionTypes.REGISTER_SEND,
  });

  return register(form)
    .then((result) => {
      if (!result || !result.success) {
        throw new Error();
      }
      localStorage.setItem("token", result.refreshToken);
      const authToken = result.accessToken.split("Bearer ")[1];
      setCookie("token", authToken);
      dispatch({
        type: ActionTypes.REGISTER_SUCCESS,
        payload: result.user,
      });
    })
    .catch((err) => {
      const errMessage = err.status === 403 && "E-mail уже зарегистрирован";
      dispatch({
        type: ActionTypes.REGISTER_FAILED,
        payload: errMessage || err,
      });
      return Promise.reject(err);
    });
};
