import { useSelector } from "../../services/hooks";
import styles from "./feed-statuses.module.css";
import {
  getOrdersDone,
  getOrdersPending,
  getTotal,
  getTotalToday,
} from "../../services/feed/selectors";

const FeedStatuses = () => {
  const ordersDone = useSelector(getOrdersDone);
  const ordersInProgress = useSelector(getOrdersPending);
  const total = useSelector(getTotal);
  const totalToday = useSelector(getTotalToday);

  return (
    <section className={styles.wrapper}>
      <div className={styles.status}>
        <h2 className="text text_type_main-medium">Готовы:</h2>
        <ul className={`${styles.list} ${styles.done}`}>
          {ordersDone.map((order, index) => {
            return (
              <li className="text text_type_digits-default" key={index}>
                {order.number}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.status}>
        <h2 className="text text_type_main-medium">В работе:</h2>
        <ul className={styles.list}>
          {ordersInProgress.map((order, index) => {
            return (
              <li className="text text_type_digits-default" key={index}>
                {order.number}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.all}>
        <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
        <p className="text text_type_digits-large">{total}</p>
      </div>
      <div className={styles.today}>
        <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
        <p className="text text_type_digits-large">{totalToday}</p>
      </div>
    </section>
  );
};

export default FeedStatuses;
