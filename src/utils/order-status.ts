import { TOrderStatus } from "./types";

export const getOrderStatus = (status: TOrderStatus) => {
  switch (status) {
    case "created": {
      return "Создан";
    }
    case "pending": {
      return "Готовится";
    }
    case "done": {
      return "Выполнен";
    }
    default: {
      return;
    }
  }
};
