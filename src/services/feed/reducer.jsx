import { ActionTypes } from "./actions";

const initialState = {
  wsConnected: false,
  wsError: null,
  orders: [],
  total: null,
  totalToday: null,
  wsConnectedAuth: false,
  wsErrorAuth: null,
  ordersAuth: [],
};

export const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true,
        wsError: null,
      };
    }
    case ActionTypes.CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false,
        wsError: action.payload,
      };
    }
    case ActionTypes.CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false,
        wsError: null,
      };
    }
    case ActionTypes.GET_ORDERS: {
      return {
        ...state,
        wsError: null,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    }
    case ActionTypes.AUTH_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnectedAuth: true,
        wsErrorAuth: null,
      };
    }
    case ActionTypes.AUTH_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnectedAuth: false,
        wsErrorAuth: action.payload,
      };
    }
    case ActionTypes.AUTH_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnectedAuth: false,
        wsErrorAuth: null,
      };
    }
    case ActionTypes.AUTH_GET_ORDERS: {
      return {
        ...state,
        wsErrorAuth: null,
        ordersAuth: action.payload.orders,
      };
    }
    default:
      return state;
  }
};
