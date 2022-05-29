import React from "react";
import AppHeader from "../components/app-header/app-header";
import appStyles from "./app.module.css";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import { data } from "../utils/data";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";

class App extends React.Component {
  render() {
    return (
      <div className={appStyles.page}>
        <AppHeader />
        <main className={appStyles.content}>
          <BurgerIngredients ingredients={data} />
          <BurgerConstructor ingredients={data} />
        </main>
      </div>
    );
  }
}

export default App;
