import { createSelector } from "reselect";
import { name } from "./actions";
import { getIngredients } from "../ingredients/selectors";

export const getTotal = (store) => store[name].total;
export const getTotalToday = (store) => store[name].totalToday;

const getOrdersFeed = (store) => store[name].orders;
const getOrdersAuth = (store) => store[name].ordersAuth;

const getIngredientsOrderFiltered = (ingredients) => {
  const ingredientsFiltered = ingredients.reduce((acc, ingredient) => {
    acc[ingredient] = (acc[ingredient] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(ingredientsFiltered).map((arr) => {
    return { id: arr[0], count: arr[1] };
  });
};

const getIngredientsOrder = (ingredientsOrder, ingredients) => {
  // eslint-disable-next-line array-callback-return
  return ingredientsOrder.map((ingredientOrder) => {
    for (let i = 0; i < ingredients.length; i++) {
      if (ingredientOrder.id === ingredients[i]._id) {
        return { ...ingredients[i], count: ingredientOrder.count };
      }
    }
  });
};

const getPriceOrder = (ingredients) => {
  return ingredients.reduce(
    (acc, ingredient) => (acc += ingredient.price * ingredient.count),
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
