import { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/hooks";
import pageStyles from "./feed.module.css";
import { ActionTypes as ActionTypesFeed } from "../../services/feed/actions";
import { getOrders } from "../../services/feed/selectors";
import FeedOrders from "../../components/feed-orders/feed-orders";
import FeedStatuses from "../../components/feed-statuses/feed-statuses";
import Spinner from "../../components/spinner/spinner";

const FeedPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ActionTypesFeed.CONNECTION_START });
    return () => {
      dispatch({ type: ActionTypesFeed.CONNECTION_CLOSED });
    };
  }, [dispatch]);

  const orders = useSelector(getOrders);

  return orders.length === 0 ? (
    <Spinner />
  ) : (
    <>
      <div className={pageStyles.wrapper}>
        <h1 className={`${pageStyles.title} text text_type_main-large mt-10`}>
          Лента заказов
        </h1>
        <FeedOrders orders={orders} />
        <FeedStatuses />
      </div>
    </>
  );
};

export default FeedPage;
