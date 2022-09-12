import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import App from "./components/app/app";
import { Provider } from "react-redux";
import store from "./services/store";

ReactDOM.render(
  <React.StrictMode>
    <Router basename={process.env.PUBLIC_URL + "/"}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
