import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import pageStyles from "../auth-forms.module.css";
import {
  loginUser,
  ActionTypes as ActionTypesAuth,
} from "../../../services/auth/actions";
import {
  getUser,
  getLoginStatus,
  getLoginError,
} from "../../../services/auth/selectors";
import {
  checkEmailValid,
  checkPasswordValid,
  getErrMsgForUser,
} from "../../../utils/validate-form";
import Spinner from "../../../components/spinner/spinner";
import { routes } from "../../../utils/routes";

const SignInPage = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUser);
  const isLoginLoading = useSelector(getLoginStatus);
  const loginError = useSelector(getLoginError);

  useEffect(() => {
    if (loginError && loginError.includes("are incorrect")) {
      setPasswordValid(false);
      setEmailValid(false);
      setErrorFromServer(true);
    }
  }, [loginError]);

  const [email, setEmail] = useState("");
  const [isEmailValid, setEmailValid] = useState(true);

  const [password, setPassword] = useState("");
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [iconPassInput, setIconPassInput] = useState("ShowIcon");
  const [typePassInput, setTypePassInput] = useState("password");

  const [isErrorFromServer, setErrorFromServer] = useState("false");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const rerunValidate = () => {
    if (isErrorFromServer) {
      setErrorFromServer(false);
      !isPasswordValid && setPasswordValid(true);
      !isEmailValid && setEmailValid(true);
    }
  };

  // action with email input
  const isEmailChangedValid = (value) => {
    return checkEmailValid(value) ? setEmailValid(true) : setEmailValid(false);
  };

  const changeEmailInput = () => {
    setTimeout(() => emailRef.current.focus(), 0);
    rerunValidate();
    const value = emailRef.current.value;
    setEmail(value);
    isEmailChangedValid(value);
  };

  // action with password input
  const changeInputTypePassword = () => {
    setTimeout(() => passwordRef.current.focus(), 0);

    if (typePassInput === "password") {
      setIconPassInput("HideIcon");
      setTypePassInput("text");
    } else {
      setIconPassInput("ShowIcon");
      setTypePassInput("password");
    }
  };

  const isPasswordChangedValid = (value) => {
    return checkPasswordValid(value)
      ? setPasswordValid(true)
      : setPasswordValid(false);
  };

  const changePasswordInput = () => {
    setTimeout(() => passwordRef.current.focus(), 0);
    rerunValidate();
    const value = passwordRef.current.value;
    setPassword(value);
    isPasswordChangedValid(value);
  };

  const submitCred = (e) => {
    e.preventDefault();
    setErrorFromServer(false);
    dispatch(loginUser({ email, password }));
  };

  const descClass = `text text_type_main-default text_color_inactive`;
  const linkClass = `${pageStyles.link} text text_type_main-default`;

  return user.email ? (
    <Redirect to={routes.home} />
  ) : isLoginLoading ? (
    <Spinner />
  ) : (
    <div className={pageStyles.wrapper}>
      <h2 className="text text_type_main-medium mb-6">Вход</h2>
      <form className={`${pageStyles.form} mb-20`} onSubmit={submitCred}>
        <Input
          type={"email"}
          placeholder={"E-mail"}
          onChange={changeEmailInput}
          onBlur={() => isEmailChangedValid(email)}
          value={email}
          name={"email"}
          error={!isEmailValid}
          errorText={
            (isErrorFromServer && " ") || getErrMsgForUser("Email no valid")
          }
          size={"default"}
          ref={emailRef}
        />
        <Input
          type={typePassInput}
          placeholder={"Пароль"}
          onChange={changePasswordInput}
          onBlur={() => isPasswordChangedValid(password)}
          icon={iconPassInput}
          onIconClick={changeInputTypePassword}
          value={password}
          name={"password"}
          ref={passwordRef}
          error={!isPasswordValid}
          errorText={
            (isErrorFromServer && getErrMsgForUser(loginError)) ||
            getErrMsgForUser("Pass no valid")
          }
          size={"default"}
        />
        <Button
          type="primary"
          size="medium"
          disabled={
            !(checkEmailValid(email) && checkPasswordValid(password)) ||
            isErrorFromServer ||
            isLoginLoading
          }
        >
          Войти
        </Button>
      </form>
      <ul className={pageStyles.actionList}>
        <li className={pageStyles.action}>
          <p className={descClass}>Вы&nbsp;&mdash; новый пользователь?</p>
          <Link
            className={linkClass}
            to={routes.signup}
            onClick={() => dispatch({ type: ActionTypesAuth.RESET_ERRORS })}
          >
            Зарегистрироваться
          </Link>
        </li>
        <li className={pageStyles.action}>
          <p className={descClass}>Забыли пароль?</p>
          <Link
            className={linkClass}
            to={routes.forgot}
            onClick={() => dispatch({ type: ActionTypesAuth.RESET_ERRORS })}
          >
            Восстановить пароль
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SignInPage;
