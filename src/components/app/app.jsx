import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { getDetailModalStatus } from "../../services/ingredient-details/selectors";
import { getOrderModalStatus } from "../../services/order/selectors";
import { ActionTypes as ActionTypesDetails } from "../../services/ingredient-details/actions";
import { ActionTypes as ActionTypesOrder } from "../../services/order/actions";
import AppHeader from "../app-header/app-header";
import appStyles from "./app.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import ConstructorPage from "../../pages/constructor/constructor";
import SignInPage from "../../pages/auth-forms/sign-in";
import SignUpPage from "../../pages/auth-forms/sign-up";
import ResetPasswordPage from "../../pages/auth-forms/reset-password";
import ForgotPasswordPage from "../../pages/auth-forms/forgot-password";

const App = () => {
  const dispatch = useDispatch();

  const isIngredientDetailsOpened = useSelector(getDetailModalStatus);
  const isOrderDetailsOpened = useSelector(getOrderModalStatus);

  const handleCloseModals = () => {
    dispatch({ type: ActionTypesDetails.RESET_MODAL });
    dispatch({ type: ActionTypesOrder.RESET_MODAL });
  };

  return (
    <>
      <div className={appStyles.page}>
        <AppHeader />
        <main className={appStyles.content}>
          <Switch>
            <Route exact path="/">
              <ConstructorPage />
            </Route>
            <Route exact path="/login">
              <SignInPage />
            </Route>
            <Route exact path="/register">
              <SignUpPage />
            </Route>
            <Route exact path="/forgot-password">
              <ForgotPasswordPage />
            </Route>
            <Route exact path="/reset-password">
              <ResetPasswordPage />
            </Route>
          </Switch>
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
