import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../services/hooks";
import { ActionTypes as ActionTypesFeed } from "../../../services/feed/actions";
import { getOrdersProfile } from "../../../services/feed/selectors";
import pageStyles from "./orders-history.module.css";
import FeedOrders from "../../../components/feed-orders/feed-orders";
import Spinner from "../../../components/spinner/spinner";

const OrdersHistoryPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ActionTypesFeed.AUTH_CONNECTION_START });
    return () => {
      dispatch({ type: ActionTypesFeed.AUTH_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  const orders = useSelector(getOrdersProfile).sort((a, b) => {
    return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
  });

  return orders.length === 0 ? (
    <Spinner />
  ) : (
    <>
      <div className={pageStyles.wrapper}>
        <FeedOrders orders={orders} />
      </div>
    </>
  );
};

export default OrdersHistoryPage;
