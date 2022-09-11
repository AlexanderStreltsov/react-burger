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
import { updateProfile } from "../../../services/auth/actions";
import { checkEmailValid } from "../../../utils/utils";
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

  useEffect(() => {
    if (updateError && updateError.includes("зарегистрирован")) {
      setLoginValid(false);
    }
  }, [updateError]);

  const [name, setName] = useState(user.name);
  const [isNameEditable, setNameEditable] = useState(false);
  const [isNameValid, setNameValid] = useState(true);

  const [login, setLogin] = useState(user.email);
  const [isLoginEditable, setLoginEditable] = useState(false);
  const [isLoginValid, setLoginValid] = useState(true);
  const [loginExist, setLoginExist] = useState("");

  if (updateError && !loginExist) {
    setLoginExist(login);
  }

  const [password, setPassword] = useState("");
  const [isPasswordEditable, setPasswordEditable] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(true);

  const nameRef = useRef(null);
  const loginRef = useRef(null);
  const passwordRef = useRef(null);

  const editName = () => {
    setTimeout(() => nameRef.current.focus(), 0);
    setNameValid(true);
    setNameEditable(true);
  };

  const checkNameValue = () => {
    setNameEditable(false);
    name || setNameValid(false);
  };

  const editLogin = () => {
    setTimeout(() => loginRef.current.focus(), 0);
    setLoginValid(true);
    setLoginEditable(true);
  };

  const checkLoginValue = () => {
    setLoginEditable(false);
    setLoginValid(checkEmailValid(login) ? loginExist !== login : false);
  };

  const editPassword = () => {
    setTimeout(() => passwordRef.current.focus(), 0);
    setPasswordValid(true);
    setPasswordEditable(true);
  };

  const checkPasswordValue = () => {
    setPasswordEditable(false);
    !password || password.length > 5 || setPasswordValid(false);
  };

  const isProfileChanged = () => {
    return (
      (name && name !== user.name) ||
      (checkEmailValid(login) &&
        login !== user.email &&
        login !== loginExist &&
        isLoginValid) ||
      (password && password.length > 5) ||
      isUpdateLoading
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
  };

  const submitUpdate = (evt) => {
    evt.preventDefault();
    setLoginExist("");
    dispatch(updateProfile({ name, email: login, password }));
  };

  return isUpdateLoading ? (
    <Spinner />
  ) : (
    <form className={styles.form} onSubmit={submitUpdate} noValidate>
      <fieldset className={styles.inputBlock}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(evt) => setName(evt.target.value)}
          onBlur={checkNameValue}
          icon={"EditIcon"}
          onIconClick={editName}
          value={name}
          name={"name"}
          size={"default"}
          disabled={!isNameEditable}
          ref={nameRef}
          error={!isNameValid}
          errorText={"Введите имя"}
        />
        <Input
          type={"email"}
          placeholder={"Логин"}
          onChange={(evt) => setLogin(evt.target.value)}
          onBlur={checkLoginValue}
          icon={"EditIcon"}
          onIconClick={editLogin}
          value={login}
          name={"email"}
          size={"default"}
          disabled={!isLoginEditable}
          ref={loginRef}
          error={!isLoginValid}
          errorText={
            (loginExist === login && updateError) || "Некорректный e-mail"
          }
        />
        <Input
          type={"password"}
          placeholder={"Пароль"}
          onChange={(evt) => setPassword(evt.target.value)}
          onBlur={checkPasswordValue}
          icon={"EditIcon"}
          onIconClick={editPassword}
          value={password}
          name={"password"}
          size={"default"}
          disabled={!isPasswordEditable}
          ref={passwordRef}
          error={!isPasswordValid}
          errorText={"Пароль должен быть более 5 символов"}
        />
      </fieldset>
      <fieldset className={styles.handlersBlock}>
        <Button
          type="secondary"
          size="medium"
          onClick={resetUpdate}
          disabled={isUpdateLoading}
        >
          Отмена
        </Button>
        <Button type="primary" size="medium" disabled={!isProfileChanged()}>
          Сохранить
        </Button>
      </fieldset>
    </form>
  );
};

export default Profile;
