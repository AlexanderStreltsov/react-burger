import { AnyAction, MiddlewareAPI } from "redux";
import { getCookie } from "../utils/utils";
import { IWebSocketActions } from "../utils/types";

export const socketMiddleware = (
  wsUrl: string,
  wsActions: IWebSocketActions,
  isAuth = false
) => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next: (arg: AnyAction) => void) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } =
        wsActions;
      if (type === wsInit) {
        socket = isAuth
          ? new WebSocket(`${wsUrl}?token=${getCookie("token")}`)
          : new WebSocket(wsUrl);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          socket.send(JSON.stringify(payload));
        }
      }
      next(action);
    };
  };
};
