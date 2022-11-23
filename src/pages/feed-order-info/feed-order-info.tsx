import pageStyles from "./feed-order-info.module.css";
import FeedOrderInfo from "../../components/feed-order-info/feed-order-info";

const FeedOrderInfoPage = () => {
  return (
    <div className={pageStyles.wrapper}>
      <div className={pageStyles.container}>
        <FeedOrderInfo />
      </div>
    </div>
  );
};
export default FeedOrderInfoPage;
