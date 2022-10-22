import { createSelector } from "reselect";
import { name } from "./actions";
import { getIngredients } from "../ingredients/selectors";
import { RootState } from "../../utils/types";
import {
  IFeedOrderDetails,
  IIngredient,
  IFeedIngredient,
} from "../../utils/types";

export const getTotal = (store: RootState) => store[name].total;
export const getTotalToday = (store: RootState) => store[name].totalToday;

const getOrdersFeed = (store: RootState) => store[name].orders;
const getOrdersAuth = (store: RootState) => store[name].ordersAuth;

const getIngredientsOrderFiltered = (
  ingredients: IFeedOrderDetails["ingredients"]
) => {
  const ingredientsFiltered = ingredients.reduce(
    (acc: { [id: string]: number }, ingredient) => {
      acc[ingredient] = (acc[ingredient] || 0) + 1;
      return acc;
    },
    {}
  );

  return Object.entries(ingredientsFiltered).map((arr) => {
    return { id: arr[0], count: arr[1] };
  });
};

const getIngredientsOrder = (
  ingredientsOrder: {
    id: string;
    count: number;
  }[],
  ingredients: IIngredient[]
) => {
  // eslint-disable-next-line array-callback-return
  return ingredientsOrder.map((ingredientOrder) => {
    for (let i = 0; i < ingredients.length; i++) {
      if (ingredientOrder.id === ingredients[i]._id) {
        return { ...ingredients[i], count: ingredientOrder.count };
      }
    }
  });
};

const getPriceOrder = (ingredients: (IFeedIngredient | undefined)[]) => {
  return ingredients.reduce(
    (acc, ingredient) => (acc += ingredient!.price * ingredient!.count),
    0
  );
};

export const getOrders = createSelector(
  getOrdersFeed,
  getIngredients,
  (orders, ingredients) => {
    return orders.map((order) => {
      const ingredientsOrderFiltered = getIngredientsOrderFiltered(
        order.ingredients
      );

      const ingredientsOrder = getIngredientsOrder(
        ingredientsOrderFiltered,
        ingredients
      );

      const priceOrder = getPriceOrder(ingredientsOrder);

      return {
        ...order,
        ingredients: ingredientsOrder,
        price: priceOrder,
      };
    });
  }
);

export const getOrdersDone = createSelector(getOrdersFeed, (orders) => {
  return orders.filter((order) => order.status === "done");
});

export const getOrdersPending = createSelector(getOrdersFeed, (orders) => {
  return orders.filter((order) => order.status === "pending");
});

export const getOrdersProfile = createSelector(
  getOrdersAuth,
  getIngredients,
  (orders, ingredients) => {
    return orders.map((order) => {
      const ingredientsOrderFiltered = getIngredientsOrderFiltered(
        order.ingredients
      );

      const ingredientsOrder = getIngredientsOrder(
        ingredientsOrderFiltered,
        ingredients
      );

      const priceOrder = getPriceOrder(ingredientsOrder);

      return {
        ...order,
        ingredients: ingredientsOrder,
        price: priceOrder,
      };
    });
  }
);
