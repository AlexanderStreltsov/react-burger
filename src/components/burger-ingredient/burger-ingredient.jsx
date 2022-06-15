import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import ingredientStyles from "./burger-ingredient.module.css";

const BurgerIngredient = ({ ingredient, onClickIngredient }) => {
  const priceClass = `${ingredientStyles.price} text text_type_digits-default mt-2 mb-2`;
  const titleClass = `${ingredientStyles.title} text text_type_main-default`;

  return (
    <li
      className={ingredientStyles.ingredient}
      onClick={() => onClickIngredient(ingredient)}
    >
      <img
        src={ingredient.image}
        alt={ingredient.name}
        className={ingredientStyles.image}
      />
      <div className={priceClass}>
        {ingredient.price}
        <i className={`${ingredientStyles.icon} ml-2`}>
          <CurrencyIcon />
        </i>
      </div>
      <h3 className={titleClass}>{ingredient.name}</h3>
      <Counter count={1} size="default" />
    </li>
  );
};

BurgerIngredient.propTypes = {
  ingredient: ingredientPropType,
  onClickIngredient: PropTypes.func.isRequired,
};

export default BurgerIngredient;
