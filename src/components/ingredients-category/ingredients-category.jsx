import { useSelector } from "react-redux";
import { getIngredientsCounters } from "../../services/constructor/selectors";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import categoryStyles from "./ingredients-category.module.css";

const IngredientsCategory = ({
  ingredients,
  id,
  categoryNames,
  bunRef,
  sauceRef,
  mainRef,
}) => {
  const ingredientsCounters = useSelector(getIngredientsCounters);

  return (
    <li
      ref={
        categoryNames[id] === categoryNames.bun
          ? bunRef
          : categoryNames[id] === categoryNames.sauce
          ? sauceRef
          : mainRef
      }
    >
      <h2 id={id} className="text text_type_main-medium">
        {categoryNames[id]}
      </h2>
      <ul className={categoryStyles.list}>
        {ingredients.map((ingredient) => (
          <BurgerIngredient
            key={ingredient._id}
            ingredient={ingredient}
            count={ingredientsCounters[ingredient._id]}
          />
        ))}
      </ul>
    </li>
  );
};

IngredientsCategory.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  id: PropTypes.string.isRequired,
  categoryNames: PropTypes.object.isRequired,
  bunRef: PropTypes.func.isRequired,
  sauceRef: PropTypes.func.isRequired,
  mainRef: PropTypes.func.isRequired,
};

export default IngredientsCategory;
