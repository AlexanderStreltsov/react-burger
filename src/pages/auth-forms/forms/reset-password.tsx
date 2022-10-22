import { useState, useRef, FormEvent } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import pageStyles from "../auth-forms.module.css";
import { Routes } from "../../../utils/routes";
import {
  resetPassword,
  ActionTypes as ActionTypesAuth,
} from "../../../services/auth/actions";
import { useDispatch, useSelector } from "../../../services/hooks";
import {
  getUser,
  getResetStatus,
  getResetError,
  getResetSucceded,
  getForgotGeted,
} from "../../../services/auth/selectors";
import {
  checkResetTokenValid,
  checkPasswordValid,
  getErrMsgForUser,
} from "../../../utils/validate-form";
import Spinner from "../../../components/spinner/spinner";

const ResetPasswordPage = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUser);
  const isResetLoading = useSelector(getResetStatus);
  const resetError = useSelector(getResetError);
  const isResetSucceded = useSelector(getResetSucceded);
  const isForgotGeted = useSelector(getForgotGeted);

  const [password, setPassword] = useState("");
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [iconPassInput, setIconPassInput] = useState("ShowIcon");
  const [typePassInput, setTypePassInput] = useState("password");

  const [token, setToken] = useState("");
  const [isTokenValid, setTokenValid] = useState(true);
  const [tokenIncorrect, setTokenIncorrect] = useState("");

  const passwordRef = useRef<HTMLInputElement>(null);
  const tokenRef = useRef<HTMLInputElement>(null);

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

  // action with token input
  if (resetError && resetError.includes("Incorrect") && !tokenIncorrect) {
    setTokenValid(false);
    setTokenIncorrect(token);
  }

  const isTokenChangedValid = (value: string) => {
    return checkResetTokenValid(value)
      ? setTokenValid(tokenIncorrect !== value)
      : setTokenValid(false);
  };

  const changeTokenInput = () => {
    setTimeout(() => tokenRef.current && tokenRef.current.focus(), 0);
    const value = tokenRef.current && tokenRef.current.value;
    setToken(value || "");
    isTokenChangedValid(value || "");
  };

  const submitPassword = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setTokenIncorrect("");
    dispatch(resetPassword({ password, token }));
  };

  return user.email ? (
    <Redirect to={Routes.home} />
  ) : !isForgotGeted ? (
    <Redirect to={Routes.forgot} />
  ) : isResetSucceded ? (
    <Redirect to={Routes.signin} />
  ) : isResetLoading ? (
    <Spinner />
  ) : (
    <div className={pageStyles.wrapper}>
      <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
      <form className={`${pageStyles.form} mb-20`} onSubmit={submitPassword}>
        <Input
          type={typePassInput === "password" ? "password" : "text"}
          placeholder={"Введите новый пароль"}
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
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={changeTokenInput}
          onBlur={() => isTokenChangedValid(token)}
          value={token}
          name={"token"}
          error={!isTokenValid}
          errorText={
            (tokenIncorrect === token && getErrMsgForUser(resetError)) ||
            getErrMsgForUser("Token no valid")
          }
          size={"default"}
          ref={tokenRef}
        />
        <Button
          type="primary"
          htmlType="submit"
          size="medium"
          disabled={
            !(
              (checkPasswordValid(password) && checkResetTokenValid(token)) ||
              isResetLoading
            )
          }
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
          to={Routes.signin}
          onClick={() => dispatch({ type: ActionTypesAuth.RESET_ERRORS })}
        >
          Войти
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
