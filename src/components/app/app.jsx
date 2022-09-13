import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { getOrderModalStatus } from "../../services/order/selectors";
import { ActionTypes as ActionTypesOrder } from "../../services/order/actions";
import { getUser } from "../../services/auth/actions";
import { getUserStatus } from "../../services/auth/selectors";
import { getRequestStatus } from "../../services/ingredients/selectors";
import { getIngredientsAction } from "../../services/ingredients/actions";
import AppHeader from "../app-header/app-header";
import appStyles from "./app.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import ConstructorPage from "../../pages/constructor/constructor";
import IngredientPage from "../../pages/ingredient/ingredient";
import NotFoundPage from "../../pages/not-found/not-found";
import {
  SignInPage,
  SignUpPage,
  ResetPasswordPage,
  ForgotPasswordPage,
} from "../../pages/auth-forms";
import PersonalAccountPage from "../../pages/personal-account/personal-account";
import FeedPage from "../../pages/feed/feed";
import ProtectedRoute from "../protected-route/protected-route";
import { routes } from "../../utils/routes";
import { getCookie } from "../../utils/utils";
import Spinner from "../spinner/spinner";

const App = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const background = location.state?.background;

  const cookie = getCookie("token");
  const refreshTokenData = localStorage.getItem("token");

  useEffect(() => {
    cookie && refreshTokenData && dispatch(getUser());
    dispatch(getIngredientsAction());
  }, [dispatch, cookie, refreshTokenData]);

  const isUserLoading = useSelector(getUserStatus);
  const isIngredientsLoading = useSelector(getRequestStatus);
  const isOrderDetailsOpened = useSelector(getOrderModalStatus);

  const history = useHistory();

  const handleCloseModals = () => {
    history.replace(routes.home);
    dispatch({ type: ActionTypesOrder.RESET_MODAL });
  };

  return (
    <>
      <div className={appStyles.page}>
        <AppHeader />
        {isUserLoading || isIngredientsLoading ? (
          <Spinner />
        ) : (
          <main className={appStyles.content}>
            <Switch location={background || location}>
              <Route exact path={routes.home}>
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
              <ProtectedRoute path={routes.profile}>
                <PersonalAccountPage />
              </ProtectedRoute>
              <Route path={routes.ingredient}>
                <IngredientPage />
              </Route>
              <Route exact path={routes.feed}>
                <FeedPage />
              </Route>
              <Route>
                <NotFoundPage />
              </Route>
            </Switch>
          </main>
        )}
      </div>

      {background && (
        <Route path={routes.ingredient}>
          <Modal
            title="Детали ингредиента"
            handleCloseModals={handleCloseModals}
          >
            <IngredientDetails />
          </Modal>
        </Route>
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
