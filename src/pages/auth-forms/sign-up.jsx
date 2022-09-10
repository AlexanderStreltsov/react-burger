import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import pageStyles from "./auth-forms.module.css";
import { ActionTypes as ActionTypesAuth } from "../../services/auth/actions";
import { registerUser } from "../../services/auth/actions";
import {
  getUser,
  getRegisterSendig,
  getResiterError,
} from "../../services/auth/selectors";
import { checkValidEmail } from "../../utils/utils";
import Spinner from "../../components/spinner/spinner";

const SignUpPage = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEmail, setIsEmail] = useState(true);
  const [password, setPassword] = useState("");

  const user = useSelector(getUser);
  const registerSending = useSelector(getRegisterSendig);
  const registerError = useSelector(getResiterError);

  useEffect(() => {
    registerError && setIsEmail(false);
  }, [registerError]);

  const submitCred = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return user ? (
    <Redirect to="/" />
  ) : registerSending ? (
    <Spinner />
  ) : (
    <div className={pageStyles.wrapper}>
      <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
      <form
        className={`${pageStyles.form} mb-20`}
        onSubmit={submitCred}
        noValidate
      >
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(evt) => setName(evt.target.value)}
          value={name}
          name={"name"}
          size={"default"}
        />
        <Input
          type={"email"}
          placeholder={"E-mail"}
          onChange={(evt) => setEmail(evt.target.value)}
          onFocus={() => setIsEmail(true)}
          onBlur={() => email && setIsEmail(checkValidEmail(email))}
          value={email}
          name={"email"}
          error={!isEmail}
          errorText={registerError || "Некорректный e-mail"}
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
          disabled={
            !(
              checkValidEmail(email) &&
              password.length > 5 &&
              name &&
              !registerSending
            )
          }
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
          onClick={() => dispatch({ type: ActionTypesAuth.RESET })}
        >
          Войти
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
