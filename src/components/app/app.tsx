import { useEffect } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/hooks";
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
import FeedOrderInfo from "../feed-order-info/feed-order-info";
import FeedOrderInfoPage from "../../pages/feed-order-info/feed-order-info";
import ProtectedRoute from "../protected-route/protected-route";
import { Routes } from "../../utils/routes";
import { getCookie } from "../../utils/utils";
import { TLocation } from "../../utils/types";
import Spinner from "../spinner/spinner";

const App = () => {
  const dispatch = useDispatch();

  const location = useLocation<TLocation<"background">>();
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
    history.goBack();
    dispatch({ type: ActionTypesOrder.RESET_MODAL });
  };

  return (
    <>
      <div className={appStyles.page}>
        <AppHeader />

        <main className={appStyles.content}>
          {isUserLoading || isIngredientsLoading ? (
            <Spinner />
          ) : (
            <Switch location={background || location}>
              <Route exact path={Routes.home}>
                <ConstructorPage />
              </Route>
              <Route exact path={Routes.signin}>
                <SignInPage />
              </Route>
              <Route exact path={Routes.signup}>
                <SignUpPage />
              </Route>
              <Route exact path={Routes.forgot}>
                <ForgotPasswordPage />
              </Route>
              <Route exact path={Routes.reset}>
                <ResetPasswordPage />
              </Route>
              <ProtectedRoute path={Routes.profileOrder}>
                <FeedOrderInfoPage />
              </ProtectedRoute>
              <ProtectedRoute path={Routes.profile}>
                <PersonalAccountPage />
              </ProtectedRoute>
              <Route path={Routes.ingredient}>
                <IngredientPage />
              </Route>
              <Route exact path={Routes.feed}>
                <FeedPage />
              </Route>
              <Route path={Routes.feedOrder}>
                <FeedOrderInfoPage />
              </Route>
              <Route>
                <NotFoundPage />
              </Route>
            </Switch>
          )}
        </main>
      </div>

      {background && (
        <>
          <Route path={Routes.ingredient}>
            <Modal
              title="Детали ингредиента"
              handleCloseModals={handleCloseModals}
            >
              <IngredientDetails />
            </Modal>
          </Route>

          <Route path={Routes.feedOrder}>
            <Modal handleCloseModals={handleCloseModals}>
              <FeedOrderInfo />
            </Modal>
          </Route>

          <ProtectedRoute path={Routes.profileOrder}>
            <Modal handleCloseModals={handleCloseModals}>
              <FeedOrderInfo />
            </Modal>
          </ProtectedRoute>
        </>
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
