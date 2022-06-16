import { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import appStyles from "./app.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { apiUrl, order } from "../../utils/constants";
import Spinner from "../spinner/spinner";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isIngredientDetailsOpened, setIngredientDetailsOpened] =
    useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [isOrderDetailsOpened, setOrderDetailsOpened] = useState(false);

  useEffect(() => {
    fetch(apiUrl, { method: "GET" })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => setData(data.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const handleCloseModals = () => {
    setIngredientDetailsOpened(false);
    setOrderDetailsOpened(false);
  };
  const handleEscKey = (evt) => evt.key === "Escape" && handleCloseModals();

  const handleSelectIngredient = (ingredient) => {
    setSelectedIngredient(ingredient);
    setIngredientDetailsOpened(true);
  };

  const handleCreateOrder = () => {
    setOrderDetailsOpened(true);
  };

  return (
    <>
      <div className={appStyles.page}>
        <AppHeader />
        {!loading ? (
          <main className={appStyles.content}>
            <BurgerIngredients
              ingredients={data}
              onClickIngredient={handleSelectIngredient}
            />
            <BurgerConstructor
              ingredients={data}
              handleCreateOrder={handleCreateOrder}
            />
          </main>
        ) : (
          <Spinner />
        )}
      </div>

      {isIngredientDetailsOpened && (
        <Modal
          title="Детали ингредиента"
          handleCloseModals={handleCloseModals}
          handleEscKey={handleEscKey}
        >
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}

      {isOrderDetailsOpened && (
        <Modal
          title=""
          handleCloseModals={handleCloseModals}
          handleEscKey={handleEscKey}
        >
          <OrderDetails order={order} />
        </Modal>
      )}
    </>
  );
};

export default App;
