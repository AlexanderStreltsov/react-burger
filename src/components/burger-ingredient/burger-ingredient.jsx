import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import {
  setIngredientModal,
  loadImage,
} from "../../services/actions/ingredient-details";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";
import ingredientStyles from "./burger-ingredient.module.css";

const BurgerIngredient = ({ ingredient }) => {
  const dispatch = useDispatch();

  const ingredientsConstructor = useSelector(
    (store) => store.burgerConstructor.ingredients
  );
  const bunConstructor = useSelector((store) => store.burgerConstructor.bun);

  const countIngredientConstructor = useMemo(() => {
    return [...ingredientsConstructor, bunConstructor].filter(
      (item) => item._id === ingredient._id
    ).length;
  }, [ingredientsConstructor, bunConstructor, ingredient]);

  const [{ opacity }, dragRef] = useDrag({
    type: "NEW_INGREDIENT",
    item: { ingredient },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.25 : 1,
    }),
  });

  const priceClass = `${ingredientStyles.price} text text_type_digits-default mt-2 mb-2`;
  const titleClass = `${ingredientStyles.title} text text_type_main-default`;

  const handleIngredientClick = () => {
    dispatch(loadImage(true));
    dispatch(setIngredientModal(ingredient));
  };

  return (
    <li
      className={ingredientStyles.ingredient}
      onClick={handleIngredientClick}
      ref={dragRef}
      style={{ opacity }}
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
      {!!countIngredientConstructor && (
        <Counter count={countIngredientConstructor} size="default" />
      )}
    </li>
  );
};

BurgerIngredient.propTypes = {
  ingredient: ingredientPropType,
};

export default BurgerIngredient;
