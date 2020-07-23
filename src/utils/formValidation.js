const emailValidation = (email) => {
  if (!email.trim()) {
    return "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    return "Email address is invalid";
  }
  return "";
};

const passwordValidation = (password) => {
  if (!password) {
    return "Password required";
  } else if (password.length < 6) {
    return "Password should be at least 6 characters long";
  }
  return "";
};

const cPasswordValidation = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return "Passwords should match";
  }
  return "";
};

const displayNameValidation = (name) => {
  if (name.length < 5) {
    return "Name should be at least 5 characters long";
  } else if (name.length > 15) {
    return "Name should be less than 15 characters long";
  }
  return "";
};

export default {
  onSubmitValidation: (values) => {
    const errors = {};

    const { email, password, confirmPassword, displayName } = values;

    if (email) {
      const emailErrors = emailValidation(email);
      if (emailErrors) errors.email = emailErrors;
    }

    if (password) {
      const passwordErrors = passwordValidation(password);
      if (passwordErrors) errors.password = passwordErrors;
    }

    if (confirmPassword) {
      const cPasswordErrors = cPasswordValidation(password, confirmPassword);
      if (cPasswordErrors) errors.confirmPassword = cPasswordErrors;
    }

    if (displayName) {
      const nameErrors = displayNameValidation(displayName);
      if (nameErrors) errors.name = nameErrors;
    }

    return errors;
  },
  onChangeValidation: (name, value, values) => {
    switch (name) {
      case "email":
        return emailValidation(value);
      case "password":
        return passwordValidation(value);
      case "confirmPassword":
        return cPasswordValidation(value, values.password);
      case "displayName":
        return displayNameValidation(value);
      default:
        return "";
    }
  },
};
