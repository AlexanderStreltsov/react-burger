import PropTypes from "prop-types";
import { orderPropType } from "../../utils/prop-types";
import styles from "./feed-orders.module.css";
import FeedOrderElement from "../feed-order-element/feed-order-element";

const FeedOrders = ({ orders }) => {
  console.log(orders);
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

FeedOrders.propTypes = {
  orders: PropTypes.arrayOf(orderPropType).isRequired,
};

export default FeedOrders;
