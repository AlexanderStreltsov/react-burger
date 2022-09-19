import styles from "./feed-orders.module.css";
import FeedOrderElement from "../feed-order-element/feed-order-element";

const FeedOrders = ({ orders }) => {
  return (
    <section>
      <ul className={styles.list}>
        {orders.map((order, index) => {
          return <FeedOrderElement key={index} order={order} />;
        })}
      </ul>
    </section>
  );
};

export default FeedOrders;
