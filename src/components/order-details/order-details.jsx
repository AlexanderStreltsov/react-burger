import detailsStyles from "./order-details.module.css";
import PropTypes from "prop-types";
import orderImagePath from "../../images/order.svg";

const OrderDetails = ({ order }) => {
  return (
    <div className={detailsStyles.details}>
      <h2
        className={`${detailsStyles.order} text text_type_digits-large mt-10`}
      >
        {order}
      </h2>
      <p className="mt-8 text text_type_main-medium">идентификатор заказа</p>
      <img
        src={orderImagePath}
        alt="Заказ оформлен"
        className={`${detailsStyles.image} mt-15`}
      />
      <p className="mt-15 text text_type_main-default">
        Ваш заказ начали готовить
      </p>
      <p className="mt-2 mb-15 text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

OrderDetails.propTypes = {
  order: PropTypes.string.isRequired,
};

export default OrderDetails;
