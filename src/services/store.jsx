import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./root-reducer";
import { socketMiddleware } from "./socket-middleware";
import {
  wsUrlFeed,
  WsActionTypesFeed,
  wsUrlFeedAuth,
  WsActionTypesFeedAuth,
} from "../utils/ws";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(wsUrlFeed, WsActionTypesFeed),
    socketMiddleware(wsUrlFeedAuth, WsActionTypesFeedAuth, true)
  )
);

const store = createStore(rootReducer, enhancer);

export default store;
