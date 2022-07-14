import { useDispatch, useSelector } from "react-redux";
import { RESET_INGREDIENT_MODAL } from "../../services/actions/ingredient-details";
import { RESET_ORDER_MODAL } from "../../services/actions/order";
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
  const isOrderDetailsOpened = useSelector((store) => store.order.isOpen);

  const handleCloseModals = () => {
    dispatch({ type: RESET_INGREDIENT_MODAL });
    dispatch({ type: RESET_ORDER_MODAL });
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
        <Modal handleCloseModals={handleCloseModals}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

export default App;
