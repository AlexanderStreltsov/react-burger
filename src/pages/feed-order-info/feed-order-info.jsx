import pageStyles from "./feed-order-info.module.css";
import FeedOrderInfo from "../../components/feed-order-info/feed-order-info";

const FeedOrderInfoPage = () => {
  return (
    <div className={pageStyles.wrapper}>
      <FeedOrderInfo />
    </div>
  );
};
export default FeedOrderInfoPage;
