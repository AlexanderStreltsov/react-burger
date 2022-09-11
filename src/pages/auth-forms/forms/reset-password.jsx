import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import pageStyles from "../auth-forms.module.css";
import { routes } from "../../../utils/routes";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const submitPassword = (e) => {
    e.preventDefault();
    console.log(code, password);
  };

  return (
    <div className={pageStyles.wrapper}>
      <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
      <form className={`${pageStyles.form} mb-20`} onSubmit={submitPassword}>
        <Input
          type={"password"}
          placeholder={"Введите новый пароль"}
          onChange={(evt) => setPassword(evt.target.value)}
          icon={"ShowIcon"}
          value={password}
          name={"password"}
          size={"default"}
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={(evt) => setCode(evt.target.value)}
          value={code}
          name={"code"}
          size={"default"}
        />
        <Button
          type="primary"
          size="medium"
          disabled={!(code && password.length > 5)}
        >
          Сохранить
        </Button>
      </form>
      <div className={pageStyles.action}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
        </p>
        <Link
          className={`${pageStyles.link} text text_type_main-default`}
          to={routes.signin}
        >
          Войти
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
