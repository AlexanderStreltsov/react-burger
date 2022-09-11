import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import pageStyles from "../auth-forms.module.css";
import { routes } from "../../../utils/routes";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitCred = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  const descClass = `text text_type_main-default text_color_inactive`;
  const linkClass = `${pageStyles.link} text text_type_main-default`;

  return (
    <div className={pageStyles.wrapper}>
      <h2 className="text text_type_main-medium mb-6">Вход</h2>
      <form className={`${pageStyles.form} mb-20`} onSubmit={submitCred}>
        <Input
          type={"email"}
          placeholder={"E-mail"}
          onChange={(evt) => setEmail(evt.target.value)}
          value={email}
          name={"email"}
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
          disabled={!(email && password.length > 5)}
        >
          Войти
        </Button>
      </form>
      <ul className={pageStyles.actionList}>
        <li className={pageStyles.action}>
          <p className={descClass}>Вы&nbsp;&mdash; новый пользователь?</p>
          <Link className={linkClass} to={routes.signup}>
            Зарегистрироваться
          </Link>
        </li>
        <li className={pageStyles.action}>
          <p className={descClass}>Забыли пароль?</p>
          <Link className={linkClass} to={routes.forgot}>
            Восстановить пароль
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SignInPage;
