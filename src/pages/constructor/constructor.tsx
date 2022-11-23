import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import pageStyles from "./constructor.module.css";

const ConstructorPage = () => {
  return (
    <div className={pageStyles.wrapper}>
      <h1 className={`${pageStyles.title} text text_type_main-large mt-10`}>
        Соберите бургер
      </h1>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </div>
  );
};

export default ConstructorPage;
