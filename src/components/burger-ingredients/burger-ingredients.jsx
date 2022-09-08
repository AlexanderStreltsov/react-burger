import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";
import { Link } from "react-scroll";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsCategory from "../ingredients-category/ingredients-category";
import ingredientsStyle from "./burger-ingredients.module.css";
import Spinner from "../spinner/spinner";
import {
  setCurrentTab,
  getIngredientsAction,
} from "../../services/ingredients/actions";
import {
  getIngredients,
  getCurrentTab,
  getRequestStatus,
} from "../../services/ingredients/selectors";

const BurgerIngredients = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsAction());
  }, [dispatch]);

  const ingredients = useSelector(getIngredients);
  const currentTab = useSelector(getCurrentTab);
  const isLoading = useSelector(getRequestStatus);

  const getFilteredIngredientsList = (ingredients, type) => {
    return ingredients.filter((item) => item.type === type);
  };

  const rootRef = useRef(null);
  const options = {
    root: rootRef.current,
    rootMargin: "0px 0px -90% 0px",
    threshold: 0,
  };
  const [bunRef, isInViewBun] = useInView(options);
  const [sauceRef, isInViewSauce] = useInView(options);
  const [mainRef, isInViewMain] = useInView(options);

  useEffect(() => {
    isInViewBun && dispatch(setCurrentTab("bun"));
    isInViewSauce && dispatch(setCurrentTab("sauce"));
    isInViewMain && dispatch(setCurrentTab("main"));
  }, [isInViewBun, isInViewSauce, isInViewMain, dispatch]);

  const categoryNames = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
  };
  const categoryRefs = {
    bun: bunRef,
    sauce: sauceRef,
    main: mainRef,
  };
  const categoryTypeList = Object.keys(categoryNames);

  return (
    <section>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <nav className="mb-10">
        <ul className={ingredientsStyle.tabList}>
          {categoryTypeList.map((type) => (
            <li key={type}>
              <Link to={type} spy={true} smooth={true} containerId="categories">
                <Tab value={type} active={currentTab === type}>
                  {categoryNames[type]}
                </Tab>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {!isLoading ? (
        <ul
          id="categories"
          className={ingredientsStyle.categoryList}
          ref={rootRef}
        >
          {categoryTypeList.map((type) => (
            <IngredientsCategory
              key={type}
              id={type}
              ingredients={getFilteredIngredientsList(ingredients, type)}
              categoryNames={categoryNames}
              ref={categoryRefs[type]}
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
