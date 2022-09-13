import { v4 as uuid } from "uuid";

export const name = "CONSTRUCTOR";

export const ActionTypes = {
  ADD: `${name}/ADD`,
  DELETE: `${name}/DELETE`,
  SORT: `${name}/SORT`,
  RESET: `${name}/RESET`,
};

export const addConstructor = (ingredient) => {
  return {
    type: ActionTypes.ADD,
    payload: {
      ...ingredient.ingredient,
      id: uuid(),
    },
  };
};

export const deleteConstructor = (index) => {
  return {
    type: ActionTypes.DELETE,
    payload: index,
  };
};

export const sortConstructor = (indexFrom, indexTo) => {
  return {
    type: ActionTypes.SORT,
    payload: {
      to: indexTo,
      from: indexFrom,
    },
  };
};
