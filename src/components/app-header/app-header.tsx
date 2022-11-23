import { NavLink } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "../../services/hooks";
import headerStyles from "./app-header.module.css";
import { Routes } from "../../utils/routes";
import { ActionTypes as ActionTypesAuth } from "../../services/auth/actions";

const AppHeader = () => {
  const dispatch = useDispatch();

  const listItemClass = `${headerStyles.listItem} mt-4 mb-4`;
  const linkClass = `${headerStyles.link} text text_type_main-default pt-4 pl-5 pb-4 pr-5`;
  const iconClass = `${headerStyles.icon} mr-2`;

  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.wrapper}>
        <div className={headerStyles.logo}>
          <Logo />
        </div>
        <nav>
          <ul className={headerStyles.list}>
            <li className={listItemClass}>
              <NavLink
                exact
                to={Routes.home}
                className={linkClass}
                activeClassName={headerStyles.linkActive}
                onClick={() => dispatch({ type: ActionTypesAuth.RESET_ERRORS })}
              >
                <i className={iconClass}>
                  <BurgerIcon type="primary" />
                </i>
                Конструктор
              </NavLink>
            </li>
            <li className={listItemClass}>
              <NavLink
                to={Routes.feed}
                className={linkClass}
                activeClassName={headerStyles.linkActive}
                onClick={() => dispatch({ type: ActionTypesAuth.RESET_ERRORS })}
              >
                <i className={iconClass}>
                  <ListIcon type="primary" />
                </i>
                Лента заказов
              </NavLink>
            </li>
            <li className={listItemClass}>
              <NavLink
                to={Routes.profile}
                className={linkClass}
                activeClassName={headerStyles.linkActive}
                onClick={() => dispatch({ type: ActionTypesAuth.RESET_ERRORS })}
              >
                <i className={iconClass}>
                  <ProfileIcon type="primary" />
                </i>
                Личный кабинет
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
