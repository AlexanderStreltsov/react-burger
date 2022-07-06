import { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import appStyles from "./app.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { apiIngredients } from "../../utils/constants";
import Spinner from "../spinner/spinner";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import BurgerIngredientsContext from "../../context/burger-ingredients-context";
import BurgerConstructorContext from "../../context/burger-constructor-context";

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isIngredientDetailsOpened, setIngredientDetailsOpened] =
    useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [isOrderDetailsOpened, setOrderDetailsOpened] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(apiIngredients, { method: "GET" })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => setIngredients(data.data))
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

  return (
    <BurgerIngredientsContext.Provider value={ingredients}>
      <BurgerConstructorContext.Provider value={{ order, setOrder }}>
        <div className={appStyles.page}>
          <AppHeader />
          {!loading ? (
            <main className={appStyles.content}>
              <BurgerIngredients onClickIngredient={handleSelectIngredient} />
              <BurgerConstructor
                setOrderDetailsOpened={setOrderDetailsOpened}
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
      </BurgerConstructorContext.Provider>
    </BurgerIngredientsContext.Provider>
  );
};

export default App;
