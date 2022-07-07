import { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import appStyles from "./app.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getIngredients } from "../../utils/api";
import Spinner from "../spinner/spinner";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import BurgerIngredientsContext from "../../services/burger-ingredients-context";
import BurgerConstructorContext from "../../services/burger-constructor-context";

const App = () => {
  const [ingredients, setIngredients] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isIngredientDetailsOpened, setIngredientDetailsOpened] =
    useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [isOrderDetailsOpened, setOrderDetailsOpened] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getIngredients()
      .then((data) => setIngredients(data.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const handleCloseModals = () => {
    setIngredientDetailsOpened(false);
    setOrderDetailsOpened(false);
  };

  const handleSelectIngredient = (ingredient) => {
    setSelectedIngredient(ingredient);
    setIngredientDetailsOpened(true);
  };

  return (
    <>
      <div className={appStyles.page}>
        <AppHeader />
        {!loading ? (
          <main className={appStyles.content}>
            <BurgerIngredientsContext.Provider value={ingredients}>
              <BurgerConstructorContext.Provider value={{ order, setOrder }}>
                <BurgerIngredients onClickIngredient={handleSelectIngredient} />
                <BurgerConstructor
                  setOrderDetailsOpened={setOrderDetailsOpened}
                />
              </BurgerConstructorContext.Provider>
            </BurgerIngredientsContext.Provider>
          </main>
        ) : (
          <Spinner />
        )}
      </div>

      {isIngredientDetailsOpened && (
        <Modal title="Детали ингредиента" handleCloseModals={handleCloseModals}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}

      {isOrderDetailsOpened && (
        <Modal title="" handleCloseModals={handleCloseModals}>
          <OrderDetails order={order} />
        </Modal>
      )}
    </>
  );
};

export default App;
