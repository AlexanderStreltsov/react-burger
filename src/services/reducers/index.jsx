import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { ingredientDetailReducer } from "./ingredient-details";
import { constructorReducer } from "./constructor";
import { orderReducer } from "./order";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  details: ingredientDetailReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
});
