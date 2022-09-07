import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import pageStyles from "./registration.module.css";

const RegistrationPage = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitCred = (e) => {
    e.preventDefault();
    console.log(login, email, password);
  };

  return (
    <div className={pageStyles.wrapper}>
      <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
      <form className={`${pageStyles.form} mb-20`} onSubmit={submitCred}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(evt) => setLogin(evt.target.value)}
          value={login}
          name={"name"}
          error={false}
          size={"default"}
        />
        <Input
          type={"email"}
          placeholder={"E-mail"}
          onChange={(evt) => setEmail(evt.target.value)}
          value={email}
          name={"email"}
          error={false}
          size={"default"}
        />
        <PasswordInput
          onChange={(evt) => setPassword(evt.target.value)}
          value={password}
          name={"password"}
        />
        <Button
          type="primary"
          size="medium"
          disabled={!(login && email && password.length > 5)}
        >
          Зарегистрироваться
        </Button>
      </form>
      <div className={pageStyles.action}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
        </p>
        <Link
          className={`${pageStyles.link} text text_type_main-default`}
          to="/login"
        >
          Войти
        </Link>
      </div>
    </div>
  );
};

export default RegistrationPage;
