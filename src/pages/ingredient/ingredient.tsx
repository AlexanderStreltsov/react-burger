import pageStyles from "./ingredient.module.css";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";

const IngredientPage = () => {
  return (
    <div className={pageStyles.wrapper}>
      <div className={pageStyles.container}>
        <h1 className="text text_type_main-large mt-4">Детали ингредиента</h1>
        <IngredientDetails />
      </div>
    </div>
  );
};
export default IngredientPage;
