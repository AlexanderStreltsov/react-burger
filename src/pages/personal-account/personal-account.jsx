import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import pageStyles from "./personal-account.module.css";
import PersonalAccountNavigation from "./navigation/navigation";
import Profile from "./profile/profile";
import OrdersHistoryPage from "./orders-history/orders-history";
import { routes } from "../../utils/routes";
import { getLogoutStatus } from "../../services/auth/selectors";
import Spinner from "../../components/spinner/spinner";

const PersonalAccountPage = () => {
  const isLogoutLoading = useSelector(getLogoutStatus);
  return isLogoutLoading ? (
    <Spinner />
  ) : (
    <div className={pageStyles.wrapper}>
      <div className={pageStyles.container}>
        <PersonalAccountNavigation />
        <Switch>
          <Route exact path={routes.profile}>
            <Profile />
          </Route>
          <Route exact path={routes.orders}>
            <OrdersHistoryPage />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default PersonalAccountPage;
