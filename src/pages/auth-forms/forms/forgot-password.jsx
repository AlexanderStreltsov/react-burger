import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import pageStyles from "../auth-forms.module.css";
import { routes } from "../../../utils/routes";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const submitEmail = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className={pageStyles.wrapper}>
      <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
      <form className={`${pageStyles.form} mb-20`} onSubmit={submitEmail}>
        <Input
          type={"email"}
          placeholder={"Укажите e-mail"}
          onChange={(evt) => setEmail(evt.target.value)}
          value={email}
          name={"email"}
          size={"default"}
        />
        <Button type="primary" size="medium" disabled={!email}>
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

export default ForgotPasswordPage;
