import AppHeader from "../app-header/app-header";
import appStyles from "./app.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { data } from "../../utils/data";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const App = () => {
  return (
    <div className={appStyles.page}>
      <AppHeader />
      <main className={appStyles.content}>
        <BurgerIngredients ingredients={data} />
        <BurgerConstructor ingredients={data} />
      </main>
    </div>
  );
};

export default App;
