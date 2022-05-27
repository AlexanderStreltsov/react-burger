import React from "react";
import AppHeader from "../components/app-header/app-header";
import appStyles from "./app.module.css";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import { data } from "../utils/data";

class App extends React.Component {
  render() {
    return (
      <div className={appStyles.page}>
        <AppHeader />
        <main className={appStyles.content}>
          <BurgerIngredients ingredients={data} />
        </main>
      </div>
    );
  }
}

export default App;
