import { useHistory } from "react-router-dom";
import { useDrop } from "react-dnd";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "./burger-constructor.module.css";
import { useSelector, useDispatch } from "../../services/hooks";
import {
  addConstructor,
  ActionTypes as ActionTypesConstructor,
} from "../../services/constructor/actions";
import { orderBurger } from "../../services/order/actions";
import {
  getConstructorItems,
  getTotalPrice,
  getIngredientsId,
} from "../../services/constructor/selectors";
import { getUser } from "../../services/auth/selectors";
import { getOrderRequestStatus } from "../../services/order/selectors";
import BurgerEmptyElement from "../burger-empty-element/burger-empty-element";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import Spinner from "../spinner/spinner";
import { DragDropTypes } from "../../utils/drag-drop-types";
import { Routes } from "../../utils/routes";
import { IIngredient } from "../../utils/types";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(getUser);

  const { ingredients, bun } = useSelector(getConstructorItems);
  const isLoading = useSelector(getOrderRequestStatus);
  const totalPrice = useSelector(getTotalPrice);
  const ingredientsId = useSelector(getIngredientsId);

  const isIngredients = ingredients.length > 0;

  const [, dropTarget] = useDrop({
    accept: DragDropTypes.NEW,
    drop(ingredient: { ingredient: IIngredient }) {
      dispatch(addConstructor(ingredient));
    },
  });

  const handleCreateOrder = () => {
    if (user.email) {
      dispatch(orderBurger({ ingredients: ingredientsId }));
      dispatch({ type: ActionTypesConstructor.RESET });
    } else {
      history.push(Routes.signin);
    }
  };

  return (
    <section className={constructorStyles.section}>
      {!isLoading ? (
        <div className={constructorStyles.wrapper} ref={dropTarget}>
          {bun ? (
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
          {bun ? (
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
            <CurrencyIcon type="primary" />
          </i>
        </div>
        <Button
          type="primary"
          htmlType="button"
          size="large"
          onClick={handleCreateOrder}
          disabled={!(bun || isIngredients) || isLoading}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
