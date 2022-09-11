import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import pageStyles from "../auth-forms.module.css";
import { ActionTypes as ActionTypesAuth } from "../../../services/auth/actions";
import { registerUser } from "../../../services/auth/actions";
import {
  getUser,
  getRegisterStatus,
  getRegisterError,
} from "../../../services/auth/selectors";
import { checkEmailValid } from "../../../utils/utils";
import Spinner from "../../../components/spinner/spinner";
import { routes } from "../../../utils/routes";

const SignUpPage = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");
  const [emailExist, setEmailExist] = useState("");
  const [isEmailValid, setEmailValid] = useState(true);

  const user = useSelector(getUser);
  const isRegisterLoading = useSelector(getRegisterStatus);
  const registerError = useSelector(getRegisterError);

  if (registerError && !emailExist) {
    setEmailExist(email);
  }

  useEffect(() => {
    if (registerError && registerError.includes("зарегистрирован")) {
      setEmailValid(false);
    }
  }, [registerError]);

  const isShowErrorEmail = () => {
    return checkEmailValid(email) ? emailExist !== email : false;
  };

  const submitCred = (evt) => {
    evt.preventDefault();
    setEmailExist("");
    dispatch(registerUser({ name, email, password }));
  };

  return user.email ? (
    <Redirect to={routes.home} />
  ) : isRegisterLoading ? (
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
          onFocus={() => setEmailValid(true)}
          onBlur={() => setEmailValid(isShowErrorEmail)}
          value={email}
          name={"email"}
          error={!isEmailValid}
          errorText={
            (emailExist === email && registerError) || "Некорректный e-mail"
          }
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
              name &&
              checkEmailValid(email) &&
              email !== emailExist &&
              password.length > 5 &&
              !isRegisterLoading
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
          to={routes.signin}
          // onClick={() => dispatch({ type: ActionTypesAuth.RESET })}
        >
          Войти
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
