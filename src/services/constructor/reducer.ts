import { ActionTypes } from "./actions";
import { IConstructorState, TConstructorActions } from "./types";

const initialState: IConstructorState = {
  ingredients: [],
  bun: null,
};

export const constructorReducer = (
  state = initialState,
  action: TConstructorActions
): IConstructorState => {
  switch (action.type) {
    case ActionTypes.ADD: {
      return {
        ...state,
        bun: action.payload.type === "bun" ? action.payload : state.bun,
        ingredients:
          action.payload.type !== "bun"
            ? [...state.ingredients, action.payload]
            : state.ingredients,
      };
    }
    case ActionTypes.DELETE: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients.slice(0, action.payload),
          ...state.ingredients.slice(action.payload + 1),
        ],
      };
    }
    case ActionTypes.SORT: {
      const ingredients = [...state.ingredients];
      ingredients.splice(
        action.payload.to,
        0,
        ingredients.splice(action.payload.from, 1)[0]
      );
      return {
        ...state,
        ingredients,
      };
    }
    case ActionTypes.RESET: {
      return initialState;
    }
    default:
      return state;
  }
};
