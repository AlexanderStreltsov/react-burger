import React from "react";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import categoryStyles from "./ingredients-category.module.css";

class IngredientsCategory extends React.Component {
  render() {
    const { title, ingredients, id } = this.props;
    return (
      <li>
        <h2 id={id} className="text text_type_main-medium">
          {title}
        </h2>
        <ul className={categoryStyles.list}>
          {ingredients.map((ingredient) => (
            <BurgerIngredient key={ingredient._id} ingredient={ingredient} />
          ))}
        </ul>
      </li>
    );
  }
}

IngredientsCategory.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  id: PropTypes.string.isRequired,
};

export default IngredientsCategory;
