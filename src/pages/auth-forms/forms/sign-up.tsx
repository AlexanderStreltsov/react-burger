import { useState, useRef, FormEvent } from "react";
import { Redirect, Link } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../../services/hooks";
import pageStyles from "../auth-forms.module.css";
import {
  registerUser,
  ActionTypes as ActionTypesAuth,
} from "../../../services/auth/actions";
import {
  getUser,
  getRegisterStatus,
  getRegisterError,
} from "../../../services/auth/selectors";
import {
  checkNameValid,
  checkEmailValid,
  checkPasswordValid,
  getErrMsgForUser,
} from "../../../utils/validate-form";
import Spinner from "../../../components/spinner/spinner";
import { Routes } from "../../../utils/routes";

const SignUpPage = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUser);
  const isRegisterLoading = useSelector(getRegisterStatus);
  const registerError = useSelector(getRegisterError);

  const [name, setName] = useState("");
  const [isNameValid, setNameValid] = useState(true);

  const [email, setEmail] = useState("");
  const [isEmailValid, setEmailValid] = useState(true);
  const [emailExist, setEmailExist] = useState("");

  const [password, setPassword] = useState("");
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [iconPassInput, setIconPassInput] = useState("ShowIcon");
  const [typePassInput, setTypePassInput] = useState("password");

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // action with name input
  const isNameChangedValid = (value: string) => {
    return checkNameValid(value) ? setNameValid(true) : setNameValid(false);
  };

  const changeNameInput = () => {
    setTimeout(() => nameRef.current && nameRef.current.focus(), 0);
    const value = nameRef.current && nameRef.current.value;
    setName(value || "");
    isNameChangedValid(value || "");
  };

  // action with email input
  if (registerError && registerError.includes("exists") && !emailExist) {
    setEmailValid(false);
    setEmailExist(email);
  }

  const isEmailChangedValid = (value: string) => {
    return checkEmailValid(value)
      ? setEmailValid(emailExist !== value)
      : setEmailValid(false);
  };

  const changeEmailInput = () => {
    setTimeout(() => emailRef.current && emailRef.current.focus(), 0);
    const value = emailRef.current && emailRef.current.value;
    setEmail(value || "");
    isEmailChangedValid(value || "");
  };

  // action with password input
  const changeInputTypePassword = () => {
    setTimeout(() => passwordRef.current && passwordRef.current.focus(), 0);

    if (typePassInput === "password") {
      setIconPassInput("HideIcon");
      setTypePassInput("text");
    } else {
      setIconPassInput("ShowIcon");
      setTypePassInput("password");
    }
  };

  const isPasswordChangedValid = (value: string) => {
    return checkPasswordValid(value)
      ? setPasswordValid(true)
      : setPasswordValid(false);
  };

  const changePasswordInput = () => {
    setTimeout(() => passwordRef.current && passwordRef.current.focus(), 0);
    const value = passwordRef.current && passwordRef.current.value;
    setPassword(value || "");
    isPasswordChangedValid(value || "");
  };

  const submitCred = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setEmailExist("");
    dispatch(registerUser({ name, email, password }));
  };

  return user.email ? (
    <Redirect to={Routes.home} />
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
          onChange={changeNameInput}
          onBlur={() => isNameChangedValid(name)}
          value={name}
          name={"name"}
          error={!isNameValid}
          errorText={getErrMsgForUser("Name is empty")}
          size={"default"}
          ref={nameRef}
        />
        <Input
          type={"email"}
          placeholder={"E-mail"}
          onChange={changeEmailInput}
          onBlur={() => isEmailChangedValid(email)}
          value={email}
          name={"email"}
          error={!isEmailValid}
          errorText={
            (emailExist === email && getErrMsgForUser(registerError)) ||
            getErrMsgForUser("Email no valid")
          }
          size={"default"}
          ref={emailRef}
        />
        <Input
          type={typePassInput === "password" ? "password" : "text"}
          placeholder={"Пароль"}
          onChange={changePasswordInput}
          onBlur={() => isPasswordChangedValid(password)}
          icon={iconPassInput === "ShowIcon" ? "ShowIcon" : "HideIcon"}
          onIconClick={changeInputTypePassword}
          value={password}
          name={"password"}
          ref={passwordRef}
          error={!isPasswordValid}
          errorText={getErrMsgForUser("Pass no valid")}
          size={"default"}
        />
        <Button
          type="primary"
          htmlType="submit"
          size="medium"
          disabled={
            !(
              checkNameValid(name) &&
              checkEmailValid(email) &&
              checkPasswordValid(password) &&
              email !== emailExist
            ) || isRegisterLoading
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
          to={Routes.signin}
          onClick={() => dispatch({ type: ActionTypesAuth.RESET_ERRORS })}
        >
          Войти
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
