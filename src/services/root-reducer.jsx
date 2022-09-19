import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients/reducer";
import { name as ingredients } from "./ingredients/actions";
import { ingredientDetailsReducer } from "./ingredient-details/reducer";
import { name as details } from "./ingredient-details/actions";
import { constructorReducer } from "./constructor/reducer";
import { name as constructor } from "./constructor/actions";
import { orderReducer } from "./order/reducer";
import { name as order } from "./order/actions";
import { authReducer } from "./auth/reducer";
import { name as auth } from "./auth/actions";
import { feedReducer } from "./feed/reducer";
import { name as feed } from "./feed/actions";

const reducers = {};
reducers[ingredients] = ingredientsReducer;
reducers[details] = ingredientDetailsReducer;
reducers[constructor] = constructorReducer;
reducers[order] = orderReducer;
reducers[auth] = authReducer;
reducers[feed] = feedReducer;

export const rootReducer = combineReducers(reducers);
