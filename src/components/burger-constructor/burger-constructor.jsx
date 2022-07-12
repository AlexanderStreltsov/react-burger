import { useContext, useMemo } from "react";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import constructorStyles from "./burger-constructor.module.css";
import BurgerIngredientsContext from "../../services/burger-ingredients-context";
import BurgerConstructorContext from "../../services/burger-constructor-context";
import { saveOrder } from "../../utils/api";

const BurgerConstructor = ({ setOrderDetailsOpened }) => {
  const ingredients = useContext(BurgerIngredientsContext);
  const { setOrder } = useContext(BurgerConstructorContext);

  const ingredientBun = ingredients.find(
    (ingredient) => ingredient.type === "bun"
  );
  const ingrdientsWithoutBun = ingredients.filter(
    (ingredient) => ingredient.type !== "bun"
  );

  const totalPrice = useMemo(() => {
    return (
      ingrdientsWithoutBun.reduce(
        (acc, ingredient) => ingredient.price + acc,
        0
      ) +
      ingredientBun.price * 2
    );
  }, [ingredientBun, ingrdientsWithoutBun]);

  const ingredientsInConstructorId = useMemo(() => {
    return ingrdientsWithoutBun.reduce(
      (acc, ingredient) => {
        acc.splice(-1, 0, ingredient._id);
        return acc;
      },
      [ingredientBun._id, ingredientBun._id]
    );
  }, [ingredientBun, ingrdientsWithoutBun]);

  const handleCreateOrder = () => {
    saveOrder(ingredientsInConstructorId)
      .then((data) => {
        setOrder(data.order.number);
        setOrderDetailsOpened(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className={constructorStyles.section}>
      <div className={constructorStyles.wrapper}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${ingredientBun.name} (верх)`}
          price={ingredientBun.price}
          thumbnail={ingredientBun.image}
        />
        <ul className={constructorStyles.list}>
          {ingrdientsWithoutBun.map((item, index) => (
            <li key={index} className={constructorStyles.listItem}>
              <i className={constructorStyles.dragIcon}>
                <DragIcon />
              </i>
              <ConstructorElement
                key={item._id}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          ))}
        </ul>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${ingredientBun.name} (низ)`}
          price={ingredientBun.price}
          thumbnail={ingredientBun.image}
        />
      </div>
      <div className={`${constructorStyles.orderWrapper} mt-10`}>
        <div className={constructorStyles.priceWrapper}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <i className={`${constructorStyles.icon} ml-2`}>
            <CurrencyIcon />
          </i>
        </div>
        <Button type="primary" size="large" onClick={handleCreateOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  setOrderDetailsOpened: PropTypes.func.isRequired,
};

export default BurgerConstructor;
