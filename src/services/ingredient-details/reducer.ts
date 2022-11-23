import { ActionTypes } from "./actions";
import { IDetailsState, TDetailsActions } from "./types";

const initialState: IDetailsState = {
  isLoading: false,
};

export const ingredientDetailsReducer = (
  state = initialState,
  action: TDetailsActions
): IDetailsState => {
  switch (action.type) {
    case ActionTypes.LOAD_IMAGE: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    default:
      return state;
  }
};
