import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import pageStyles from "../auth-forms.module.css";
import { routes } from "../../../utils/routes";
import { checkEmailValid } from "../../../utils/utils";
import { forgotPassword } from "../../../services/auth/actions";
import {
  getForgotStatus,
  getForgotGeted,
  getUser,
} from "../../../services/auth/selectors";
import Spinner from "../../../components/spinner/spinner";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUser);
  const isForgotLoading = useSelector(getForgotStatus);
  const isForgotGeted = useSelector(getForgotGeted);

  const [email, setEmail] = useState("");
  const [isEmailValid, setEmailValid] = useState(true);

  const isShowErrorEmail = () => {
    return checkEmailValid(email);
  };

  const submitEmail = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  return user.email ? (
    <Redirect to={routes.home} />
  ) : isForgotGeted ? (
    <Redirect to={routes.reset} />
  ) : isForgotLoading ? (
    <Spinner />
  ) : (
    <div className={pageStyles.wrapper}>
      <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
      <form className={`${pageStyles.form} mb-20`} onSubmit={submitEmail}>
        <Input
          type={"email"}
          placeholder={"E-mail"}
          onChange={(evt) => setEmail(evt.target.value)}
          onFocus={() => setEmailValid(true)}
          onBlur={() => setEmailValid(isShowErrorEmail)}
          value={email}
          name={"email"}
          error={!isEmailValid}
          errorText={"Некорректный e-mail"}
          size={"default"}
        />
        <Button
          type="primary"
          size="medium"
          disabled={!checkEmailValid(email) && !isForgotLoading}
        >
          Восстановить
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
