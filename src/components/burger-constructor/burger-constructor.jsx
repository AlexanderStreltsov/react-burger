import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import constructorStyles from "./burger-constructor.module.css";
import { createRandomKey } from "../../utils/create-random-key";

const BurgerConstructor = ({ ingredients, handleCreateOrder }) => {
  const ingredient = ingredients.find(
    (ingredient) => ingredient.type === "bun"
  );
  const sum = ingredients.reduce(
    (acc, ingredient) => ingredient.price + acc,
    0
  );

  return (
    <section className={constructorStyles.section}>
      <div className={constructorStyles.wrapper}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
        />
        <ul className={constructorStyles.list}>
          {ingredients.map((item) => (
            <li key={createRandomKey()} className={constructorStyles.listItem}>
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
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
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
