import PropTypes from "prop-types";
import { orderPropType } from "../../utils/prop-types";
import styles from "./feed-orders.module.css";
import FeedOrderElement from "../feed-order-element/feed-order-element";

const FeedOrders = ({ orders }) => {
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

FeedOrders.propTypes = {
  orders: PropTypes.arrayOf(orderPropType).isRequired,
};

export default FeedOrders;
