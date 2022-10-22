import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDrag } from "react-dnd";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "../../services/hooks";
import { loadImage } from "../../services/ingredient-details/actions";
import ingredientStyles from "./burger-ingredient.module.css";
import { DragDropTypes } from "../../utils/drag-drop-types";
import { Routes } from "../../utils/routes";
import { IIngredient } from "../../utils/types";

interface IBurgerIngredientProps {
  ingredient: IIngredient;
  count: number;
}

const BurgerIngredient: FC<IBurgerIngredientProps> = ({
  ingredient,
  count,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [{ opacity }, dragRef] = useDrag({
    type: DragDropTypes.NEW,
    item: { ingredient },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.25 : 1,
    }),
  });

  const handleIngredientClick = () => {
    dispatch(loadImage(true));
  };

  const priceClass = `${ingredientStyles.price} text text_type_digits-default mt-2 mb-2`;
  const titleClass = `${ingredientStyles.title} text text_type_main-default`;

  return (
    <li
      className={ingredientStyles.ingredient}
      ref={dragRef}
      style={{ opacity }}
    >
      <Link
        className={ingredientStyles.link}
        to={{
          pathname: `${Routes.ingredients}/${ingredient._id}`,
          state: { background: location },
        }}
        onClick={handleIngredientClick}
      >
        <img
          src={ingredient.image}
          alt={ingredient.name}
          className={ingredientStyles.image}
        />
        <div className={priceClass}>
          {ingredient.price}
          <i className={`${ingredientStyles.icon} ml-2`}>
            <CurrencyIcon type="primary" />
          </i>
        </div>
        <h3 className={titleClass}>{ingredient.name}</h3>
        {!!count && <Counter count={count} size="default" />}
      </Link>
    </li>
  );
};

export default BurgerIngredient;
