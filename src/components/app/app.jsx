import { useEffect } from "react";
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
import { getUser } from "../../services/auth/actions";
import { getUserStatus } from "../../services/auth/selectors";
import { getIngredientsAction } from "../../services/ingredients/actions";
import {
  SignInPage,
  SignUpPage,
  ResetPasswordPage,
  ForgotPasswordPage,
} from "../../pages/auth-forms";
import PersonalAccountPage from "../../pages/personal-account/personal-account";
import { routes } from "../../utils/routes";
import { getCookie } from "../../utils/utils";
import Spinner from "../spinner/spinner";

const App = () => {
  const dispatch = useDispatch();

  const cookie = getCookie("token");
  const refreshTokenData = localStorage.getItem("token");

  useEffect(() => {
    cookie && refreshTokenData && dispatch(getUser());
    dispatch(getIngredientsAction());
  }, [dispatch, cookie, refreshTokenData]);

  const isIngredientDetailsOpened = useSelector(getDetailModalStatus);
  const isOrderDetailsOpened = useSelector(getOrderModalStatus);

  const handleCloseModals = () => {
    dispatch({ type: ActionTypesDetails.RESET_MODAL });
    dispatch({ type: ActionTypesOrder.RESET_MODAL });
  };

  const isUserLoading = useSelector(getUserStatus);

  return isUserLoading ? (
    <Spinner />
  ) : (
    <>
      <div className={appStyles.page}>
        <AppHeader />
        <main className={appStyles.content}>
          <Switch>
            <Route exact path={routes.main}>
              <ConstructorPage />
            </Route>
            <Route exact path={routes.signin}>
              <SignInPage />
            </Route>
            <Route exact path={routes.signup}>
              <SignUpPage />
            </Route>
            <Route exact path={routes.forgot}>
              <ForgotPasswordPage />
            </Route>
            <Route exact path={routes.reset}>
              <ResetPasswordPage />
            </Route>
            <Route exact path={routes.profile}>
              <PersonalAccountPage />
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
