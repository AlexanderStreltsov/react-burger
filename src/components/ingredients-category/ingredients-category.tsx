import { forwardRef, PropsWithChildren } from "react";
import { useSelector } from "../../services/hooks";
import { getIngredientsCounters } from "../../services/constructor/selectors";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import categoryStyles from "./ingredients-category.module.css";
import { IIngredient } from "../../utils/types";

interface IIngredientsCategoryProps {
  ingredients: IIngredient[];
  id: string;
  categoryNames: { [type: string]: string };
}

const IngredientsCategory = forwardRef<
  HTMLLIElement,
  PropsWithChildren<IIngredientsCategoryProps>
>(({ ingredients, id, categoryNames }, ref) => {
  const ingredientsCounters = useSelector(getIngredientsCounters);

  return (
    <li ref={ref}>
      <h2 id={id} className="text text_type_main-medium">
        {categoryNames[id]}
      </h2>
      <ul className={categoryStyles.list}>
        {ingredients.map((ingredient) => (
          <BurgerIngredient
            key={ingredient._id}
            ingredient={ingredient}
            count={ingredientsCounters[ingredient._id]}
          />
        ))}
      </ul>
    </li>
  );
});

export default IngredientsCategory;
