import { name, ActionTypes } from "./actions";
import { IUser } from "../../utils/types";

export interface IActionTypes {
  readonly REGISTER_REQUEST: `${typeof name}/REGISTER_REQUEST`;
  readonly REGISTER_SUCCESS: `${typeof name}/REGISTER_SUCCESS`;
  readonly REGISTER_FAILED: `${typeof name}/REGISTER_FAILED`;

  readonly GET_USER_REQUEST: `${typeof name}/GET_USER_REQUEST`;
  readonly GET_USER_SUCCESS: `${typeof name}/GET_USER_SUCCESS`;
  readonly GET_USER_FAILED: `${typeof name}/GET_USER_FAILED`;

  readonly UPDATE_REQUEST: `${typeof name}/UPDATE_REQUEST`;
  readonly UPDATE_SUCCESS: `${typeof name}/UPDATE_SUCCESS`;
  readonly UPDATE_FAILED: `${typeof name}/UPDATE_FAILED`;

  readonly LOGIN_REQUEST: `${typeof name}/LOGIN_REQUEST`;
  readonly LOGIN_SUCCESS: `${typeof name}/LOGIN_SUCCESS`;
  readonly LOGIN_FAILED: `${typeof name}/LOGIN_FAILED`;

  readonly FORGOT_REQUEST: `${typeof name}/FORGOT_REQUEST`;
  readonly FORGOT_SUCCESS: `${typeof name}/FORGOT_SUCCESS`;
  readonly FORGOT_FAILED: `${typeof name}/FORGOT_FAILED`;

  readonly RESET_REQUEST: `${typeof name}/RESET_REQUEST`;
  readonly RESET_SUCCESS: `${typeof name}/RESET_SUCCESS`;
  readonly RESET_FAILED: `${typeof name}/RESET_FAILED`;

  readonly LOGOUT_REQUEST: `${typeof name}/LOGOUT_REQUEST`;
  readonly LOGOUT_SUCCESS: `${typeof name}/LOGOUT_SUCCESS`;
  readonly LOGOUT_FAILED: `${typeof name}/LOGOUT_FAILED`;

  readonly RESET_ERRORS: `${typeof name}/RESET_ERRORS`;
}

interface IRegisterRequestAction {
  readonly type: typeof ActionTypes.REGISTER_REQUEST;
}

interface IRegisterSuccessAction {
  readonly type: typeof ActionTypes.REGISTER_SUCCESS;
  readonly payload: IUser["user"];
}

interface IRegisterFailedAction {
  readonly type: typeof ActionTypes.REGISTER_FAILED;
  readonly payload: string;
}

interface IGetUserRequestAction {
  readonly type: typeof ActionTypes.GET_USER_REQUEST;
}

interface IGetUserSuccessAction {
  readonly type: typeof ActionTypes.GET_USER_SUCCESS;
  readonly payload: IUser["user"];
}

interface IGetUserFailedAction {
  readonly type: typeof ActionTypes.GET_USER_FAILED;
  readonly payload: string;
}

interface IUpdateRequestAction {
  readonly type: typeof ActionTypes.UPDATE_REQUEST;
}

interface IUpdateSuccessAction {
  readonly type: typeof ActionTypes.UPDATE_SUCCESS;
  readonly payload: IUser["user"];
}

interface IUpdateFailedAction {
  readonly type: typeof ActionTypes.UPDATE_FAILED;
  readonly payload: string;
}

interface ILoginRequestAction {
  readonly type: typeof ActionTypes.LOGIN_REQUEST;
}

interface ILoginSuccessAction {
  readonly type: typeof ActionTypes.LOGIN_SUCCESS;
  readonly payload: IUser["user"];
}

interface ILoginFailedAction {
  readonly type: typeof ActionTypes.LOGIN_FAILED;
  readonly payload: string;
}

interface IForgotRequestAction {
  readonly type: typeof ActionTypes.FORGOT_REQUEST;
}

interface IForgotSuccessAction {
  readonly type: typeof ActionTypes.FORGOT_SUCCESS;
}

interface IForgotFailedAction {
  readonly type: typeof ActionTypes.FORGOT_FAILED;
  readonly payload: string;
}

interface IResetRequestAction {
  readonly type: typeof ActionTypes.RESET_REQUEST;
}

interface IResetSuccessAction {
  readonly type: typeof ActionTypes.RESET_SUCCESS;
}

interface IResetFailedAction {
  readonly type: typeof ActionTypes.RESET_FAILED;
  readonly payload: string;
}

interface ILogoutRequestAction {
  readonly type: typeof ActionTypes.LOGOUT_REQUEST;
}

interface ILogoutSuccessAction {
  readonly type: typeof ActionTypes.LOGOUT_SUCCESS;
}

interface ILogoutFailedAction {
  readonly type: typeof ActionTypes.LOGOUT_FAILED;
  readonly payload: string;
}

interface IResetErrorsAction {
  readonly type: typeof ActionTypes.RESET_ERRORS;
}

export type TAuthActions =
  | IRegisterRequestAction
  | IRegisterSuccessAction
  | IRegisterFailedAction
  | IGetUserRequestAction
  | IGetUserSuccessAction
  | IGetUserFailedAction
  | IUpdateRequestAction
  | IUpdateSuccessAction
  | IUpdateFailedAction
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILoginFailedAction
  | IForgotRequestAction
  | IForgotSuccessAction
  | IForgotFailedAction
  | IResetRequestAction
  | IResetSuccessAction
  | IResetFailedAction
  | ILogoutRequestAction
  | ILogoutSuccessAction
  | ILogoutFailedAction
  | IResetErrorsAction;

export interface IAuthState {
  user: IUser["user"];
  isRegisterLoading: boolean;
  registerError: string | null;
  isGetUserLoading: boolean;
  getUserError: string | null;
  isUpdateLoading: boolean;
  updateError: string | null;
  isForgotLoading: boolean;
  forgotError: string | null;
  isForgotGeted: boolean;
  resetError: string | null;
  isResetLoading: boolean;
  isResetSucceded: boolean;
  loginError: string | null;
  isLoginLoading: boolean;
  logoutError: string | null;
  isLogoutLoading: boolean;
}
