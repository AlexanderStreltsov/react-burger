import { NavLink } from "react-router-dom";
import pageStyles from "./navigation.module.css";
import { routes } from "../../../utils/routes";

const PersonalAccountNavigation = () => {
  const logout = () => console.log("logout");

  const linkClass = `${pageStyles.link} text text_type_main-medium`;
  const infoClass = "text text_type_main-default text_color_inactive mt-20";

  return (
    <nav>
      <ul className={pageStyles.list}>
        <li className={pageStyles.listItem}>
          <NavLink
            exact
            to={routes.profile}
            className={linkClass}
            activeClassName={pageStyles.linkActive}
          >
            Профиль
          </NavLink>
        </li>
        <li className={pageStyles.listItem}>
          <NavLink
            exact
            to={routes.orders}
            className={linkClass}
            activeClassName={pageStyles.linkActive}
          >
            История заказов
          </NavLink>
        </li>
        <li className={pageStyles.listItem}>
          <NavLink
            exact
            to={routes.signin}
            className={linkClass}
            activeClassName={pageStyles.linkActive}
          >
            Выход
          </NavLink>
        </li>
      </ul>
      <p className={infoClass}>
        В&nbsp;этом разделе вы&nbsp;можете изменить свои персональные данные
      </p>
    </nav>
  );
};

export default PersonalAccountNavigation;
