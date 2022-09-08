import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import {
  setIngredientModal,
  loadImage,
} from "../../services/ingredient-details/actions";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";
import ingredientStyles from "./burger-ingredient.module.css";
import { dragDropTypes } from "../../utils/drag-drop-types";

const BurgerIngredient = ({ ingredient, count }) => {
  const dispatch = useDispatch();

  const [{ opacity }, dragRef] = useDrag({
    type: dragDropTypes.new,
    item: { ingredient },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.25 : 1,
    }),
  });

  const handleIngredientClick = () => {
    dispatch(loadImage(true));
    dispatch(setIngredientModal(ingredient));
  };

  const priceClass = `${ingredientStyles.price} text text_type_digits-default mt-2 mb-2`;
  const titleClass = `${ingredientStyles.title} text text_type_main-default`;

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
      {!!count && <Counter count={count} size="default" />}
    </li>
  );
};

BurgerIngredient.propTypes = {
  ingredient: ingredientPropType,
  count: PropTypes.number,
};

export default BurgerIngredient;
