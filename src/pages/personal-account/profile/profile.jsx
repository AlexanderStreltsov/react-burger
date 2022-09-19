import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import {
  getUser,
  getUpdateStatus,
  getUpdateError,
} from "../../../services/auth/selectors";
import {
  updateProfile,
  ActionTypes as ActionTypesAuth,
} from "../../../services/auth/actions";
import {
  checkNameValid,
  checkEmailValid,
  checkPasswordValid,
  getErrMsgForUser,
} from "../../../utils/validate-form";
import Spinner from "../../../components/spinner/spinner";

const Profile = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUser);
  const isUpdateLoading = useSelector(getUpdateStatus);
  const updateError = useSelector(getUpdateError);

  useEffect(() => {
    setName(user.name);
    setLogin(user.email);
  }, [user]);

  const [name, setName] = useState(user.name);
  const [isNameEditable, setNameEditable] = useState(false);
  const [isNameValid, setNameValid] = useState(true);

  const [login, setLogin] = useState(user.email);
  const [isLoginEditable, setLoginEditable] = useState(false);
  const [isLoginValid, setLoginValid] = useState(true);
  const [loginExist, setLoginExist] = useState("");

  const [password, setPassword] = useState("");
  const [isPasswordEditable, setPasswordEditable] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(true);

  const nameRef = useRef(null);
  const loginRef = useRef(null);
  const passwordRef = useRef(null);

  // action with name input
  const editName = () => {
    setTimeout(() => nameRef.current.focus(), 0);
    setNameEditable(true);
  };

  const isNameChangedValid = (value) => {
    return checkNameValid(value) ? setNameValid(true) : setNameValid(false);
  };

  const changeNameInput = () => {
    setTimeout(() => nameRef.current.focus(), 0);
    const value = nameRef.current.value;
    setName(value);
    isNameChangedValid(value);
  };

  const blurNameInput = () => {
    isNameChangedValid(name);
    setNameEditable(false);
  };

  // action with login input
  if (
    updateError &&
    updateError.includes("exist") &&
    login !== user.email &&
    !loginExist
  ) {
    setLoginExist(login);
    setLoginValid(false);
  }

  const editLogin = () => {
    setTimeout(() => loginRef.current.focus(), 0);
    setLoginEditable(true);
  };

  const isLoginChangedValid = (value) => {
    return checkEmailValid(value)
      ? setLoginValid(loginExist !== value)
      : setLoginValid(false);
  };

  const changeLoginInput = () => {
    setTimeout(() => loginRef.current.focus(), 0);
    const value = loginRef.current.value;
    setLogin(value);
    isLoginChangedValid(value);
  };

  const blurLoginInput = () => {
    isLoginChangedValid(login);
    setLoginEditable(false);
  };

  // action with password input
  const editPassword = () => {
    setTimeout(() => passwordRef.current.focus(), 0);
    setPasswordEditable(true);
  };

  const isPasswordChangedValid = (value) => {
    return password
      ? setPasswordValid(checkPasswordValid(value))
      : setPasswordValid(true);
  };

  const changePasswordInput = () => {
    setTimeout(() => passwordRef.current.focus(), 0);
    const value = passwordRef.current.value;
    setPassword(value);
    isPasswordChangedValid(value);
  };

  const blurPasswordInput = () => {
    isPasswordChangedValid(password);
    setPasswordEditable(false);
  };

  // check all inputs
  const isInputsChanged = () => {
    return name !== user.name || login !== user.email || password !== "";
  };

  const isInputsChangedValid = () => {
    return (
      checkNameValid(name) &&
      checkEmailValid(login) &&
      (!password || checkPasswordValid(password)) &&
      login !== loginExist
    );
  };

  const resetUpdate = (evt) => {
    evt.preventDefault();
    setName(user.name);
    setNameValid(true);
    setLogin(user.email);
    setLoginValid(true);
    setLoginExist("");
    setPassword("");
    setPasswordValid(true);
    dispatch({ type: ActionTypesAuth.RESET_ERRORS });
  };

  const submitUpdate = (evt) => {
    evt.preventDefault();
    setLoginExist("");
    dispatch(updateProfile({ name, email: login, password }));
    setPassword("");
  };

  return isUpdateLoading ? (
    <Spinner />
  ) : (
    <section>
      <form className={styles.form} onSubmit={submitUpdate} noValidate>
        <fieldset className={styles.inputBlock}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={changeNameInput}
            onBlur={blurNameInput}
            icon={"EditIcon"}
            onIconClick={editName}
            value={name}
            name={"name"}
            size={"default"}
            disabled={!isNameEditable}
            ref={nameRef}
            error={!isNameValid}
            errorText={getErrMsgForUser("Name is empty")}
          />
          <Input
            type={"email"}
            placeholder={"Логин"}
            onChange={changeLoginInput}
            onBlur={blurLoginInput}
            icon={"EditIcon"}
            onIconClick={editLogin}
            value={login}
            name={"email"}
            size={"default"}
            disabled={!isLoginEditable}
            ref={loginRef}
            error={!isLoginValid}
            errorText={
              (loginExist === login && getErrMsgForUser(updateError)) ||
              getErrMsgForUser("Email no valid")
            }
          />
          <Input
            type={"password"}
            placeholder={"Пароль"}
            onChange={changePasswordInput}
            onBlur={blurPasswordInput}
            icon={"EditIcon"}
            onIconClick={editPassword}
            value={password}
            name={"password"}
            size={"default"}
            disabled={!isPasswordEditable}
            ref={passwordRef}
            error={!isPasswordValid}
            errorText={getErrMsgForUser("Pass no valid")}
          />
        </fieldset>
        <fieldset className={styles.handlersBlock}>
          <Button
            type="secondary"
            size="medium"
            onClick={resetUpdate}
            disabled={!isInputsChanged() || isUpdateLoading}
          >
            Отмена
          </Button>
          <Button
            type="primary"
            size="medium"
            disabled={
              !(
                (isInputsChanged() && isInputsChangedValid()) ||
                isUpdateLoading
              )
            }
          >
            Сохранить
          </Button>
        </fieldset>
      </form>
    </section>
  );
};

export default Profile;
