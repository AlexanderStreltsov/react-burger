import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { rootReducer } from "../services/root-reducer";
import { TAuthActions } from "../services/auth/types";
import { TConstructorActions } from "../services/constructor/types";
import { TDetailsActions } from "../services/ingredient-details/types";
import { TIngredientsActions } from "../services/ingredients/types";
import { TOrderActions } from "../services/order/types";
import { TFeedActions } from "../services/feed/types";

export type TApplicationActions =
  | TAuthActions
  | TConstructorActions
  | TDetailsActions
  | TIngredientsActions
  | TOrderActions
  | TFeedActions;

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = Dispatch<TApplicationActions>;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, RootState, unknown, TApplicationActions>
>;

export interface IUser {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IRegistrationForm extends ILoginForm {
  name: string;
}

export interface IResetPasswordForm {
  password: string;
  token: string;
}

export interface IRefreshTokenResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface IDefaulResponse {
  success: boolean;
  message: string;
}

export type TIngredientType = "bun" | "main" | "sauce";

export interface IIngredient {
  _id: string;
  name: string;
  type: TIngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface IIngredientWithId extends IIngredient {
  id: string;
}

export interface IIngredientsResponse {
  data: IIngredient[];
  success: boolean;
}

export interface IOrderResponse {
  name: string;
  order: { number: number };
  success: boolean;
}

export interface IWebSocketActions {
  wsInit: string;
  wsSendMessage: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
}

export interface IFeedOrderDetails {
  ingredients: string[];
  _id: string;
  name: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}

export interface IFeedOrders {
  success: boolean;
  orders: IFeedOrderDetails[];
  total: number;
  totalToday: number;
}

export interface IFeedIngredient extends IIngredient {
  count: number;
}
