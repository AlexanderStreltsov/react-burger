import { ActionTypes as ActionsTypesFeed } from "../services/feed/actions";
import { IWebSocketActions } from "./types";

export const wsUrlFeedAuth = "wss://norma.nomoreparties.space/orders";
export const wsUrlFeed = wsUrlFeedAuth + "/all";

export const WsActionTypesFeed: IWebSocketActions = {
  wsInit: ActionsTypesFeed.CONNECTION_START,
  onOpen: ActionsTypesFeed.CONNECTION_SUCCESS,
  onClose: ActionsTypesFeed.CONNECTION_CLOSED,
  onError: ActionsTypesFeed.CONNECTION_ERROR,
  onMessage: ActionsTypesFeed.GET_ORDERS,
  wsSendMessage: ActionsTypesFeed.SEND_ORDERS,
};

export const WsActionTypesFeedAuth: IWebSocketActions = {
  wsInit: ActionsTypesFeed.AUTH_CONNECTION_START,
  onOpen: ActionsTypesFeed.AUTH_CONNECTION_SUCCESS,
  onClose: ActionsTypesFeed.AUTH_CONNECTION_CLOSED,
  onError: ActionsTypesFeed.AUTH_CONNECTION_ERROR,
  onMessage: ActionsTypesFeed.AUTH_GET_ORDERS,
  wsSendMessage: ActionsTypesFeed.AUTH_SEND_ORDERS,
};
