import { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsCategory from "../ingredients-category/ingredients-category";
import ingredientsStyle from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import { createRandomKey } from "../../utils/create-random-key";
import { Link } from "react-scroll";

const BurgerIngredients = ({ ingredients, onClickIngredient }) => {
  const [current, setCurrent] = useState("bun");

  const categoryNames = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
  };
  const categoryTypeList = Object.keys(categoryNames);

  const getFilteredIngredientsList = (ingredients, type) => {
    return ingredients.filter((item) => item.type === type);
  };

  return (
    <section>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <nav className="mb-10">
        <ul className={ingredientsStyle.tabList}>
          {categoryTypeList.map((type) => (
            <li key={createRandomKey()}>
              <Link to={type} spy={true} smooth={true} containerId="categories">
                <Tab
                  value={type}
                  active={current === type}
                  onClick={(evt) => setCurrent(evt)}
                >
                  {categoryNames[type]}
                </Tab>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <ul id="categories" className={ingredientsStyle.categoryList}>
        {categoryTypeList.map((type) => (
          <IngredientsCategory
            key={createRandomKey()}
            id={type}
            title={categoryNames[type]}
            ingredients={getFilteredIngredientsList(ingredients, type)}
            onClickIngredient={onClickIngredient}
          />
        ))}
      </ul>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  onClickIngredient: PropTypes.func.isRequired,
};

export default BurgerIngredients;
