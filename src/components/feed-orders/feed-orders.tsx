import { FC } from "react";
import styles from "./feed-orders.module.css";
import FeedOrderElement from "../feed-order-element/feed-order-element";
import { TFeedOrderDetailsWithPrice } from "../../utils/types";

export interface IFeedOrdersProps {
  orders: TFeedOrderDetailsWithPrice[];
}

const FeedOrders: FC<IFeedOrdersProps> = ({ orders }) => {
  return (
    <section>
      <ul className={styles.list}>
        {orders.map((order) => {
          return <FeedOrderElement key={order._id} order={order} />;
        })}
      </ul>
    </section>
  );
};

export default FeedOrders;
