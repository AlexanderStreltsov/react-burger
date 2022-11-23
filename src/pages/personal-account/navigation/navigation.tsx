import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "../../../services/hooks";
import pageStyles from "./navigation.module.css";
import { Routes } from "../../../utils/routes";
import {
  logoutUser,
  ActionTypes as ActionTypesAuth,
} from "../../../services/auth/actions";
import { getLogoutStatus } from "../../../services/auth/selectors";

const PersonalAccountNavigation = () => {
  const dispatch = useDispatch();

  const isLogoutLoading = useSelector(getLogoutStatus);

  const linkClass = `${pageStyles.link} text text_type_main-medium`;
  const infoClass = "text text_type_main-default text_color_inactive mt-20";
  const buttonClass = `${pageStyles.button} text text_type_main-medium`;

  return (
    <nav>
      <ul className={pageStyles.list}>
        <li className={pageStyles.listItem}>
          <NavLink
            exact
            to={Routes.profile}
            className={linkClass}
            activeClassName={pageStyles.linkActive}
            onClick={() => dispatch({ type: ActionTypesAuth.RESET_ERRORS })}
          >
            Профиль
          </NavLink>
        </li>
        <li className={pageStyles.listItem}>
          <NavLink
            exact
            to={Routes.orders}
            className={linkClass}
            activeClassName={pageStyles.linkActive}
            onClick={() => dispatch({ type: ActionTypesAuth.RESET_ERRORS })}
          >
            История заказов
          </NavLink>
        </li>
        <li className={pageStyles.listItem}>
          <button
            className={buttonClass}
            onClick={() => dispatch(logoutUser())}
            disabled={isLogoutLoading}
          >
            Выход
          </button>
        </li>
      </ul>
      <p className={infoClass}>
        В&nbsp;этом разделе вы&nbsp;можете изменить свои персональные данные
      </p>
    </nav>
  );
};

export default PersonalAccountNavigation;
