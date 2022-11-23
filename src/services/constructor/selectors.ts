import { createSelector } from "reselect";
import { name } from "./actions";
import { RootState } from "../../utils/types";

const getBun = (store: RootState) => store[name].bun;
const getIngredients = (store: RootState) => store[name].ingredients;

export const getConstructorItems = createSelector(
  getBun,
  getIngredients,
  (bun, ingredients) => ({
    bun,
    ingredients,
  })
);

export const getTotalPrice = createSelector(
  getBun,
  getIngredients,
  (bun, ingredients) => {
    return (
      ingredients.reduce((acc, ingredient) => ingredient.price + acc, 0) +
      (bun ? bun.price * 2 : 0)
    );
  }
);

export const getIngredientsId = createSelector(
  getBun,
  getIngredients,
  (bun, ingredients) => {
    const bunId = bun ? [bun._id, bun._id] : [];
    return ingredients.reduce((acc, ingredient) => {
      acc.splice(-1, 0, ingredient._id);
      return acc;
    }, bunId);
  }
);

export const getIngredientsCounters = createSelector(
  getBun,
  getIngredients,
  (bun, ingredients) => {
    const counters: { [id: string]: number } = {};
    ingredients.forEach((ingredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (bun) counters[bun._id] = 2;
    return counters;
  }
);
