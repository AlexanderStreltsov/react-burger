import { ActionTypes as ActionsTypesFeed } from "../services/feed/actions";

export const wsUrlFeed = "wss://norma.nomoreparties.space/orders/all";

export const WsActionTypesFeed = {
  wsInit: ActionsTypesFeed.CONNECTION_START,
  onOpen: ActionsTypesFeed.CONNECTION_SUCCESS,
  onClose: ActionsTypesFeed.CONNECTION_CLOSED,
  onError: ActionsTypesFeed.CONNECTION_ERROR,
  onMessage: ActionsTypesFeed.GET_ORDERS,
  wsSendMessage: ActionsTypesFeed.SEND_ORDERS,
};
