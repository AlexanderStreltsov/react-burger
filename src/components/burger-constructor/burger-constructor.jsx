import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import constructorStyles from "./burger-constructor.module.css";
import { createRandomKey } from "../../utils/create-random-key";

const BurgerConstructor = ({ ingredients, handleCreateOrder }) => {
  const ingredientBun = ingredients.find(
    (ingredient) => ingredient.type === "bun"
  );
  const ingrdientsWithoutBun = ingredients.filter(
    (ingredient) => ingredient.type !== "bun"
  );
  const sum =
    ingrdientsWithoutBun.reduce(
      (acc, ingredient) => ingredient.price + acc,
      0
    ) +
    ingredientBun.price * 2;

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
          {ingrdientsWithoutBun.map((item) => (
            <li key={createRandomKey()} className={constructorStyles.listItem}>
              <i key={createRandomKey()} className={constructorStyles.dragIcon}>
                <DragIcon key={createRandomKey()} />
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
          <p className="text text_type_digits-medium">{sum}</p>
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
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  handleCreateOrder: PropTypes.func.isRequired,
};

export default BurgerConstructor;
