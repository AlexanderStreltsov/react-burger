import pageStyles from "./orders-history.module.css";

const OrdersHistoryPages = () => {
  return (
    <div className={pageStyles.wrapper}>
      <h1 className="text text_type_main-large mb-5">История заказов</h1>
      <p className="text text_type_main-small">Develop mode</p>
    </div>
  );
};

export default OrdersHistoryPages;
