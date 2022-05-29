import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsCategory from "../ingredients-category/ingredients-category";
import ingredientsStyle from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import { Link } from "react-scroll";

class BurgerIngredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "bun",
    };
  }

  setCurrentTab = (evt) => {
    this.setState({ current: evt });
  };

  getFilteredIngredientsList(ingredients, type) {
    return ingredients.filter((item) => item.type === type);
  }

  render() {
    const categoryNames = {
      bun: "Булки",
      sauce: "Соусы",
      main: "Начинки",
    };
    const categoryTypeList = Object.keys(categoryNames);
    const { ingredients } = this.props;

    return (
      <section>
        <h1 className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </h1>
        <nav className="mb-10">
          <ul className={ingredientsStyle.tabList}>
            {categoryTypeList.map((type, index) => (
              <li key={index}>
                <Link
                  key={index + 10}
                  to={type}
                  spy={true}
                  smooth={true}
                  containerId="categories"
                >
                  <Tab
                    key={index + 100}
                    value={type}
                    active={this.state.current === type}
                    onClick={this.setCurrentTab}
                  >
                    {categoryNames[type]}
                  </Tab>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul id="categories" className={ingredientsStyle.categoryList}>
          {categoryTypeList.map((type, index) => (
            <IngredientsCategory
              key={index}
              id={type}
              title={categoryNames[type]}
              ingredients={this.getFilteredIngredientsList(ingredients, type)}
            />
          ))}
        </ul>
      </section>
    );
  }
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType),
};

export default BurgerIngredients;
