import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header.module.css";

const AppHeader = () => {
  const buttonClass = `${headerStyles.button} text text_type_main-default pt-4 pl-5 pb-4 pr-5`;
  const buttonActiveClass = `${buttonClass} ${headerStyles.buttonActive}`;
  const iconClass = `${headerStyles.icon} mr-2`;
  const iconActiveClass = `${iconClass} ${headerStyles.iconActive}`;
  const listItemClass = `${headerStyles.listItem} mt-4 mb-4`;

  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.wrapper}>
        <div className={headerStyles.logo}>
          <Logo />
        </div>
        <nav>
          <ul className={headerStyles.list}>
            <li className={listItemClass}>
              <button className={buttonActiveClass}>
                <i className={iconActiveClass}>
                  <BurgerIcon />
                </i>
                Конструктор
              </button>
            </li>
            <li className={listItemClass}>
              <button className={buttonClass}>
                <i className={iconClass}>
                  <ListIcon />
                </i>
                Лента заказов
              </button>
            </li>
            <li className={listItemClass}>
              <button className={buttonClass}>
                <i className={iconClass}>
                  <ProfileIcon />
                </i>
                Личный кабинет
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
