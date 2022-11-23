import { useEffect, useMemo } from "react";
import {
  useParams,
  Redirect,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "../../services/hooks";
import Spinner from "../spinner/spinner";
import styles from "./feed-order-info.module.css";
import { Routes } from "../../utils/routes";
import { getOrderStatus } from "../../utils/order-status";
import { getOrders, getOrdersProfile } from "../../services/feed/selectors";
import { ActionTypes as ActionTypesFeed } from "../../services/feed/actions";
import { formatDate } from "../../utils/format-date";

const FeedOrderInfo = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch();

  const { id } = useParams<{ id: string }>();

  const ordersAll = useSelector(getOrders);
  const ordersProfile = useSelector(getOrdersProfile);

  const orders = match.path === Routes.profileOrder ? ordersProfile : ordersAll;

  useEffect(() => {
    if (!orders.length && match.path === Routes.feedOrder) {
      dispatch({ type: ActionTypesFeed.CONNECTION_START });
      history.replace(`${Routes.feed}/${id}`);
    }

    if (!orders.length && match.path === Routes.profileOrder) {
      dispatch({ type: ActionTypesFeed.AUTH_CONNECTION_START });
      history.replace(`${Routes.orders}/${id}`);
    }

    return () => {
      if (match.path === Routes.feedOrder) {
        dispatch({ type: ActionTypesFeed.CONNECTION_CLOSED });
      }

      if (match.path === Routes.profileOrder) {
        dispatch({ type: ActionTypesFeed.AUTH_CONNECTION_CLOSED });
      }
    };
  }, [dispatch, orders, history, id, match.path]);

  const order = useMemo(
    () => orders.find((order) => order._id === id),
    [orders, id]
  );

  if (!order) return <Redirect to={Routes.notfound} />;
  if (!orders.length) return <Spinner />;

  return (
    <div className={styles.wrapper}>
      <p className={`${styles.number} text text_type_digits-default`}>
        #{order.number}
      </p>
      <h2 className="text text_type_main-medium mt-10">{order.name}</h2>
      <p
        className={`${
          order.status === "done" ? styles.done : styles.status
        } text text_type_main-default mt-3`}
      >
        {getOrderStatus(order.status)}
      </p>
      <h3 className="text text_type_main-medium mt-15 mb-6">Состав:</h3>
      <ul
        className={
          order.ingredients.length > 4 ? styles.listScroll : styles.list
        }
      >
        {order.ingredients.map((ingredient, index) => {
          return (
            <li key={index} className={styles.ingredient}>
              <Avatar
                alt={ingredient!.name}
                src={ingredient!.image_mobile}
                sx={{
                  backgroundColor: "#131316",
                  border: "2px solid #4C4CFF",
                  width: "64px",
                  height: "64px",
                }}
              />
              <h3 className="text text_type_main-default">
                {ingredient!.name}
              </h3>
              <div className={`${styles.priceList}`}>
                <p className="text text_type_digits-default mr-2">
                  {ingredient!.count} &times; {ingredient!.price}
                </p>
                <i className={styles.icon}>
                  <CurrencyIcon type="primary" />
                </i>
              </div>
            </li>
          );
        })}
      </ul>
      <div className={`${styles.container} mt-10`}>
        <p className="text text_type_main-default text_color_inactive">
          {formatDate(order.createdAt)}
        </p>
        <div className={styles.price}>
          <p className="text text_type_digits-default mr-2">{order.price}</p>
          <i className={styles.icon}>
            <CurrencyIcon type="primary" />
          </i>
        </div>
      </div>
    </div>
  );
};

export default FeedOrderInfo;
