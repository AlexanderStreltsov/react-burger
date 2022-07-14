import {
  ADD_INGREDIENT_CONSTRUCTOR,
  DELETE_INGREDIENT_CONSTRUCTOR,
  RESET_CONSTRUCTOR,
} from "../actions/constructor";

const initialState = {
  ingredients: [],
  bun: {},
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_CONSTRUCTOR: {
      return {
        ...state,
        bun: action.payload.type === "bun" ? action.payload : state.bun,
        ingredients:
          action.payload.type !== "bun"
            ? [...state.ingredients, action.payload]
            : state.ingredients,
      };
    }
    case DELETE_INGREDIENT_CONSTRUCTOR: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients.slice(0, action.payload),
          ...state.ingredients.slice(action.payload + 1),
        ],
      };
    }
    case RESET_CONSTRUCTOR: {
      return initialState;
    }
    default:
      return state;
  }
};
