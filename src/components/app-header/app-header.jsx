import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header.module.css";
import { routes } from "../../utils/routes";
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
                to={routes.home}
                className={linkClass}
                activeClassName={headerStyles.linkActive}
                onClick={() => dispatch({ type: ActionTypesAuth.RESET_ERRORS })}
              >
                <i className={iconClass}>
                  <BurgerIcon />
                </i>
                Конструктор
              </NavLink>
            </li>
            <li className={listItemClass}>
              <NavLink
                to={routes.feed}
                className={linkClass}
                activeClassName={headerStyles.linkActive}
                onClick={() => dispatch({ type: ActionTypesAuth.RESET_ERRORS })}
              >
                <i className={iconClass}>
                  <ListIcon />
                </i>
                Лента заказов
              </NavLink>
            </li>
            <li className={listItemClass}>
              <NavLink
                to={routes.profile}
                className={linkClass}
                activeClassName={headerStyles.linkActive}
                onClick={() => dispatch({ type: ActionTypesAuth.RESET_ERRORS })}
              >
                <i className={iconClass}>
                  <ProfileIcon />
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
