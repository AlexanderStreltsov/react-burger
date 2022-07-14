import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RESET_INGREDIENT_MODAL } from "../../services/actions/ingredient-details";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from "../app-header/app-header";
import appStyles from "./app.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

const App = () => {
  const dispatch = useDispatch();

  const isIngredientDetailsOpened = useSelector(
    (store) => store.details.isOpen
  );
  const [isOrderDetailsOpened, setOrderDetailsOpened] = useState(false);
  const [order, setOrder] = useState(null);

  const handleCloseModals = () => {
    dispatch({ type: RESET_INGREDIENT_MODAL });
  };

  return (
    <>
      <div className={appStyles.page}>
        <AppHeader />
        <main className={appStyles.content}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      </div>

      {isIngredientDetailsOpened && (
        <Modal title="Детали ингредиента" handleCloseModals={handleCloseModals}>
          <IngredientDetails />
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
