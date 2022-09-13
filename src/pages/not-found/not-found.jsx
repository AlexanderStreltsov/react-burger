import pageStyles from "./not-found.module.css";
import { Link } from "react-router-dom";
import { routes } from "../../utils/routes";

const NotFoundPage = () => {
  return (
    <div className={pageStyles.wrapper}>
      <div className={pageStyles.cover}></div>
      <div className={pageStyles.info}>
        <p className="text text_type_main-large">Упс!</p>
        <h1 className={`text text_type_digits-large ${pageStyles.title}`}>
          404
        </h1>
        <p className="text text_type_main-medium">
          Извините, страница не найдена
        </p>
        <p className="text text_type_main-default mt-8">
          Похоже Вы заблудились в космосе...
          <Link to={routes.home} className={`${pageStyles.link} ml-2`}>
            Вернуться домой
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
