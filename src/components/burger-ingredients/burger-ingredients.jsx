import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-scroll";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsCategory from "../ingredients-category/ingredients-category";
import ingredientsStyle from "./burger-ingredients.module.css";
import Spinner from "../spinner/spinner";
import {
  setCurrentTab,
  getIngredientsAction,
} from "../../services/actions/ingredients";

const BurgerIngredients = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsAction());
  }, [dispatch]);

  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const currentTab = useSelector((store) => store.ingredients.currentTab);
  const isLoading = useSelector((store) => store.ingredients.isLoading);

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
            <li key={type}>
              <Link to={type} spy={true} smooth={true} containerId="categories">
                <Tab
                  value={type}
                  active={currentTab === type}
                  onClick={(evt) => dispatch(setCurrentTab(evt))}
                >
                  {categoryNames[type]}
                </Tab>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {!isLoading ? (
        <ul id="categories" className={ingredientsStyle.categoryList}>
          {categoryTypeList.map((type) => (
            <IngredientsCategory
              key={type}
              id={type}
              title={categoryNames[type]}
              ingredients={getFilteredIngredientsList(ingredients, type)}
            />
          ))}
        </ul>
      ) : (
        <Spinner />
      )}
    </section>
  );
};

export default BurgerIngredients;
