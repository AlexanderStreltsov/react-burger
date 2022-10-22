import { name, ActionTypes } from "./actions";
import { IFeedOrders } from "../../utils/types";

export interface IActionTypes {
  readonly CONNECTION_START: `${typeof name}/CONNECTION_START`;
  readonly CONNECTION_SUCCESS: `${typeof name}/CONNECTION_SUCCESS`;
  readonly CONNECTION_ERROR: `${typeof name}/CONNECTION_ERROR`;
  readonly CONNECTION_CLOSED: `${typeof name}/CONNECTION_CLOSED`;
  readonly GET_ORDERS: `${typeof name}/GET_ORDERS`;
  readonly SEND_ORDERS: `${typeof name}/SEND_ORDERS`;
  readonly AUTH_CONNECTION_START: `${typeof name}/AUTH_CONNECTION_START`;
  readonly AUTH_CONNECTION_SUCCESS: `${typeof name}/AUTH_CONNECTION_SUCCESS`;
  readonly AUTH_CONNECTION_ERROR: `${typeof name}/AUTH_CONNECTION_ERROR`;
  readonly AUTH_CONNECTION_CLOSED: `${typeof name}/AUTH_CONNECTION_CLOSED`;
  readonly AUTH_GET_ORDERS: `${typeof name}/AUTH_GET_ORDERS`;
  readonly AUTH_SEND_ORDERS: `${typeof name}/AUTH_SEND_ORDERS`;
}

interface IConnectionStartAction {
  readonly type: typeof ActionTypes.CONNECTION_START;
}

interface IConnectionSuccessAction {
  readonly type: typeof ActionTypes.CONNECTION_SUCCESS;
}

interface IConnectionErrorAction {
  readonly type: typeof ActionTypes.CONNECTION_ERROR;
  readonly payload: string;
}

interface IConnectionClosedAction {
  readonly type: typeof ActionTypes.CONNECTION_CLOSED;
}

interface IConnectionGetOrderAction {
  readonly type: typeof ActionTypes.GET_ORDERS;
  readonly payload: IFeedOrders;
}

interface IConnectionSendOrderAction {
  readonly type: typeof ActionTypes.SEND_ORDERS;
}

interface IAuthConnectionStartAction {
  readonly type: typeof ActionTypes.AUTH_CONNECTION_START;
}

interface IAuthConnectionSuccessAction {
  readonly type: typeof ActionTypes.AUTH_CONNECTION_SUCCESS;
}

interface IAuthConnectionErrorAction {
  readonly type: typeof ActionTypes.AUTH_CONNECTION_ERROR;
  readonly payload: string;
}

interface IAuthConnectionClosedAction {
  readonly type: typeof ActionTypes.AUTH_CONNECTION_CLOSED;
}

interface IAuthConnectionGetOrderAction {
  readonly type: typeof ActionTypes.AUTH_GET_ORDERS;
  readonly payload: IFeedOrders;
}

interface IAuthConnectionSendOrderAction {
  readonly type: typeof ActionTypes.AUTH_SEND_ORDERS;
}

export type TFeedActions =
  | IConnectionStartAction
  | IConnectionSuccessAction
  | IConnectionErrorAction
  | IConnectionClosedAction
  | IConnectionGetOrderAction
  | IConnectionSendOrderAction
  | IAuthConnectionStartAction
  | IAuthConnectionSuccessAction
  | IAuthConnectionErrorAction
  | IAuthConnectionClosedAction
  | IAuthConnectionGetOrderAction
  | IAuthConnectionSendOrderAction;

export interface IFeedState {
  wsConnected: boolean;
  wsError: string | null;
  orders: IFeedOrders["orders"];
  total: number | null;
  totalToday: number | null;
  wsConnectedAuth: boolean;
  wsErrorAuth: string | null;
  ordersAuth: IFeedOrders["orders"];
}
