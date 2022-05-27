import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsCategory from "../ingredients-category/ingredients-category";
import ingredientsStyle from "./burger-ingredients.module.css";

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
    const tabList = Object.keys(categoryNames);
    const { ingredients } = this.props;

    return (
      <section>
        <h1 className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </h1>
        <nav className="mb-10">
          <ul className={ingredientsStyle.tabList}>
            {tabList.map((tab, index) => (
              <li key={index + tabList.length}>
                <Tab
                  key={index}
                  value={tab}
                  active={this.state.current === tab}
                  onClick={this.setCurrentTab}
                >
                  {categoryNames[tab]}
                </Tab>
              </li>
            ))}
          </ul>
        </nav>
        <ul className={ingredientsStyle.categoryList}>
          {tabList.map((tab, index) => (
            <IngredientsCategory
              key={index}
              title={categoryNames[tab]}
              ingredients={this.getFilteredIngredientsList(ingredients, tab)}
            />
          ))}
        </ul>
      </section>
    );
  }
}

export default BurgerIngredients;
