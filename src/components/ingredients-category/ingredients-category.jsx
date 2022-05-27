import React from "react";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import categoryStyles from "./ingredients-category.module.css";

class IngredientsCategory extends React.Component {
  render() {
    const { title, ingredients } = this.props;
    return (
      <li>
        <h2 className="text text_type_main-medium">{title}</h2>
        <ul className={categoryStyles.list}>
          {ingredients.map((ingredient) => (
            <BurgerIngredient key={ingredient._id} ingredient={ingredient} />
          ))}
        </ul>
      </li>
    );
  }
}

export default IngredientsCategory;
