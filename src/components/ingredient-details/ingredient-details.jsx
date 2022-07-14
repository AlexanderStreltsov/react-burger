import detailsStyles from "./ingredient-details.module.css";
import { useSelector } from "react-redux";

const IngredientDetails = () => {
  const ingredient = useSelector((store) => store.details.ingredient);

  const { name, image_large, calories, carbohydrates, fat, proteins } =
    ingredient;
  const detailTitleClass = "text text_type_main-default text_color_inactive";
  const detailValueClass = "text text_type_digits-default text_color_inactive";

  return (
    <div className={detailsStyles.details}>
      <img src={image_large} alt={name} className={detailsStyles.image} />
      <h2 className={`${detailsStyles.title} mt-4 text text_type_main-medium`}>
        {name}
      </h2>
      <ul className={`${detailsStyles.list} mt-8`}>
        <li className={detailsStyles.listItem}>
          <span className={detailTitleClass}>Калории,ккал</span>
          <span className={detailValueClass}>{calories}</span>
        </li>
        <li className={detailsStyles.listItem}>
          <span className={detailTitleClass}>Белки, г</span>
          <span className={detailValueClass}>{proteins}</span>
        </li>
        <li className={detailsStyles.listItem}>
          <span className={detailTitleClass}>Жиры, г</span>
          <span className={detailValueClass}>{fat}</span>
        </li>
        <li className={detailsStyles.listItem}>
          <span className={detailTitleClass}>Углеводы, г</span>
          <span className={detailValueClass}>{carbohydrates}</span>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;
