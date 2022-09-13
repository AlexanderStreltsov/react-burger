import pageStyles from "./feed.module.css";

const FeedPage = () => {
  return (
    <div className={pageStyles.wrapper}>
      <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
      <p className="text text_type_main-default">Develop mode</p>
    </div>
  );
};

export default FeedPage;
