import validator from "validator";

export const checkEmailValid = (email: string) => {
  return validator.isEmail(email);
};

export const checkResetTokenValid = (token: string) => {
  return validator.matches(
    token,
    /^(\w{8})-(\w{4})-(\w{4})-(\w{4})-(\w{12})$/i
  );
};

export const checkPasswordValid = (password: string) => {
  return password.length > 5;
};

export const checkNameValid = (name: string) => {
  return name.length > 1;
};

export const getErrMsgForUser = (err: string | null) => {
  switch (err) {
    case "Email no valid": {
      return "Некорректный e-mail";
    }
    case "User already exists": {
      return "Данный e-mail зарегистрирован";
    }
    case "User with such email already exists": {
      return "Пользователь с данным e-mail уже зарегистрирован";
    }
    case "Name is empty": {
      return "Введите имя (минимум 2 символа)";
    }
    case "Pass no valid": {
      return "Введите пароль (более 5 символов)";
    }
    case "Token no valid": {
      return "Токен должен соответствовать шаблону ########-####-####-####-############";
    }
    case "Incorrect reset token": {
      return "Введен некорректный токен — перепроверьте или запросите заново";
    }
    case "email or password are incorrect": {
      return "Проверьте корректность введенных данных (неверные e-mail или пароль)";
    }
    default: {
      return;
    }
  }
};
