import { useParams, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import detailsStyles from "./ingredient-details.module.css";
import { loadImage } from "../../services/ingredient-details/actions";
import { getLoadImageStatus } from "../../services/ingredient-details/selectors";
import { getIngredients } from "../../services/ingredients/selectors";
import Spinner from "../spinner/spinner";
import { routes } from "../../utils/routes";

const IngredientDetails = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoading = useSelector(getLoadImageStatus);
  const ingredients = useSelector(getIngredients);

  const ingredient = ingredients.find((ingredient) => ingredient._id === id);

  const detailTitleClass = "text text_type_main-default text_color_inactive";
  const detailValueClass = "text text_type_digits-default text_color_inactive";

  return ingredient === undefined ? (
    <Redirect to={routes.notfound} />
  ) : (
    <div className={detailsStyles.details}>
      {isLoading && <Spinner />}
      <img
        src={ingredient.image_large}
        alt={ingredient.name}
        className={detailsStyles.image}
        onLoad={() => dispatch(loadImage(false))}
        style={!isLoading ? { display: "flex" } : { display: "none" }}
      />
      <h2 className={`${detailsStyles.title} mt-4 text text_type_main-medium`}>
        {ingredient.name}
      </h2>
      <ul className={`${detailsStyles.list} mt-8`}>
        <li className={detailsStyles.listItem}>
          <span className={detailTitleClass}>Калории,ккал</span>
          <span className={detailValueClass}>{ingredient.calories}</span>
        </li>
        <li className={detailsStyles.listItem}>
          <span className={detailTitleClass}>Белки, г</span>
          <span className={detailValueClass}>{ingredient.proteins}</span>
        </li>
        <li className={detailsStyles.listItem}>
          <span className={detailTitleClass}>Жиры, г</span>
          <span className={detailValueClass}>{ingredient.fat}</span>
        </li>
        <li className={detailsStyles.listItem}>
          <span className={detailTitleClass}>Углеводы, г</span>
          <span className={detailValueClass}>{ingredient.carbohydrates}</span>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;
