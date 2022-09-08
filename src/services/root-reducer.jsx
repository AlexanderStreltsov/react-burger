import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients/reducer";
import { name as nameIngredients } from "./ingredients/actions";
import { ingredientDetailReducer } from "./ingredient-details/reducer";
import { name as nameDetails } from "./ingredient-details/actions";
import { constructorReducer } from "./constructor/reducer";
import { name as nameConstructor } from "./constructor/actions";
import { orderReducer } from "./order/reducer";
import { name as nameOrder } from "./order/actions";

const reducers = {};
reducers[nameIngredients] = ingredientsReducer;
reducers[nameDetails] = ingredientDetailReducer;
reducers[nameConstructor] = constructorReducer;
reducers[nameOrder] = orderReducer;

export const rootReducer = combineReducers(reducers);
