import { Link, useLocation } from "react-router-dom";
import styles from "./feed-order-element.module.css";
import IngredientsGroupImages from "../ingredients-group-images/ingredients-group-images";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { formatDate } from "../../utils/format-date";
import { routes } from "../../utils/routes";

const FeedOrderElement = ({ order }) => {
  const location = useLocation();

  const { name, number, createdAt, ingredients, price } = order;
  const timeCreated = formatDate(createdAt);

  return (
    <li>
      <Link
        className={styles.item}
        to={{
          pathname: `${routes.feed}/${order._id}`,
          state: { background: location },
        }}
      >
        <div className={styles.info}>
          <p className="text text_type_digits-default">#{number}</p>
          <p className="text text_type_main-default text_color_inactive">
            {timeCreated}
          </p>
        </div>
        <h2 className="text text_type_main-medium">{name}</h2>
        <div className={styles.info}>
          <IngredientsGroupImages ingredients={ingredients} />
          <div className={styles.price}>
            <p className="text text_type_digits-default mr-2">{price}</p>
            <i className={styles.icon}>
              <CurrencyIcon />
            </i>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default FeedOrderElement;
