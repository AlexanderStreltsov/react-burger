import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "./burger-constructor.module.css";
import {
  addConstructor,
  RESET_CONSTRUCTOR,
} from "../../services/actions/constructor";
import { orderBurger } from "../../services/actions/order";
import BurgerEmptyElement from "../burger-empty-element/burger-empty-element";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import Spinner from "../spinner/spinner";
import { dragDropTypes } from "../../utils/drag-drop-types";

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const ingredients = useSelector(
    (store) => store.burgerConstructor.ingredients
  );
  const bun = useSelector((store) => store.burgerConstructor.bun);
  const isLoading = useSelector((store) => store.order.isLoading);

  const [, dropTarget] = useDrop({
    accept: dragDropTypes.new,
    drop(ingredient) {
      dispatch(addConstructor(ingredient));
    },
  });

  const isIngredients = ingredients.length > 0;
  const isBun = Object.keys(bun).length > 0;

  const totalPrice = useMemo(() => {
    return (
      ingredients.reduce((acc, ingredient) => ingredient.price + acc, 0) +
      (isBun ? bun.price * 2 : 0)
    );
  }, [bun, ingredients, isBun]);

  const ingredientsId = useMemo(() => {
    const bunId = isBun ? [bun._id, bun._id] : [];

    return ingredients.reduce((acc, ingredient) => {
      acc.splice(-1, 0, ingredient._id);
      return acc;
    }, bunId);
  }, [bun, ingredients, isBun]);

  const handleCreateOrder = () => {
    dispatch(orderBurger(ingredientsId));
    dispatch({ type: RESET_CONSTRUCTOR });
  };

  return (
    <section className={constructorStyles.section}>
      {!isLoading ? (
        <div className={constructorStyles.wrapper} ref={dropTarget}>
          {isBun ? (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          ) : (
            <BurgerEmptyElement top />
          )}
          {isIngredients ? (
            <ul className={constructorStyles.list}>
              {ingredients.map((ingredient, index) => (
                <BurgerConstructorElement
                  key={ingredient.id}
                  index={index}
                  ingredient={ingredient}
                />
              ))}
            </ul>
          ) : (
            <BurgerEmptyElement />
          )}
          {isBun ? (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          ) : (
            <BurgerEmptyElement bottom />
          )}
        </div>
      ) : (
        <Spinner />
      )}
      <div className={`${constructorStyles.orderWrapper} mt-10`}>
        <div className={constructorStyles.priceWrapper}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <i className={`${constructorStyles.icon} ml-2`}>
            <CurrencyIcon />
          </i>
        </div>
        <Button
          type="primary"
          size="large"
          onClick={handleCreateOrder}
          disabled={!(isBun || isIngredients) || isLoading}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
