const apiUrl = "https://norma.nomoreparties.space/api/";
const apiIngredients = apiUrl + "ingredients";
const apiOrders = apiUrl + "orders";

const checkResponse = (res) => (res.ok ? res.json() : Promise.reject(res));

export const getIngredients = () => {
  return fetch(apiIngredients, { method: "GET" }).then((res) =>
    checkResponse(res)
  );
};

export const saveOrder = (ingredients) => {
  return fetch(apiOrders, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  }).then((res) => checkResponse(res));
};
