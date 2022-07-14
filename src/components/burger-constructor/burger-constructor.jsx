import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "./burger-constructor.module.css";
import {
  addConstructor,
  deleteConstructor,
} from "../../services/actions/constructor";

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const ingredients = useSelector(
    (store) => store.burgerConstructor.ingredients
  );
  const bun = useSelector((store) => store.burgerConstructor.bun);

  const isIngredients = ingredients.length > 0;
  const isBun = Object.keys(bun).length > 0;

  const [{ isHover }, dropTarget] = useDrop({
    accept: "NEW_INGREDIENT",
    drop(ingredient) {
      dispatch(addConstructor(ingredient));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const totalPrice = useMemo(() => {
    return (
      ingredients.reduce((acc, ingredient) => ingredient.price + acc, 0) +
      (isBun ? bun.price * 2 : 0)
    );
  }, [bun, ingredients, isBun]);

  // const ingredientsId = useMemo(() => {
  //   return ingredients || bun
  //     ? ingredients.reduce(
  //         (acc, ingredient) => {
  //           acc.splice(-1, 0, ingredient._id);
  //           return acc;
  //         },
  //         [bun._id, bun._id]
  //       )
  //     : [];
  // }, [bun, ingredients]);

  const handleCreateOrder = () => {
    // saveOrder(ingredientsInConstructorId)
    //   .then((data) => {
    //     setOrder(data.order.number);
    //     setOrderDetailsOpened(true);
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <section className={constructorStyles.section}>
      <div
        className={constructorStyles.wrapper}
        ref={dropTarget}
        style={{ minHeight: "100px" }}
      >
        {isBun && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
        {isIngredients && (
          <ul className={constructorStyles.list}>
            {ingredients.map((item, index) => (
              <li key={index} className={constructorStyles.listItem}>
                <i className={constructorStyles.dragIcon}>
                  <DragIcon />
                </i>
                <ConstructorElement
                  key={item._id}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  handleClose={() => {
                    dispatch(deleteConstructor(index));
                  }}
                />
              </li>
            ))}
          </ul>
        )}
        {isBun && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
      </div>
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
          disabled={!(isBun || isIngredients)}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
