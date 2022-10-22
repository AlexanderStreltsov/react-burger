import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients/reducer";
import { ingredientDetailsReducer } from "./ingredient-details/reducer";
import { constructorReducer } from "./constructor/reducer";
import { orderReducer } from "./order/reducer";
import { authReducer } from "./auth/reducer";
import { feedReducer } from "./feed/reducer";

export const rootReducer = combineReducers({
  INGREDIENTS: ingredientsReducer,
  DETAILS: ingredientDetailsReducer,
  CONSTRUCTOR: constructorReducer,
  ORDER: orderReducer,
  AUTH: authReducer,
  FEED: feedReducer,
});
