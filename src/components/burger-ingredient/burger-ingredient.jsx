import React from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";
import ingredientStyles from "./burger-ingredient.module.css";

class BurgerIngredient extends React.Component {
  render() {
    const { ingredient } = this.props;
    const priceClass = `${ingredientStyles.price} text text_type_digits-default mt-2 mb-2`;
    const titleClass = `${ingredientStyles.title} text text_type_main-default`;
    return (
      <li className={ingredientStyles.ingredient}>
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
  }
}

BurgerIngredient.propTypes = {
  ingredient: ingredientPropType,
};

export default BurgerIngredient;
