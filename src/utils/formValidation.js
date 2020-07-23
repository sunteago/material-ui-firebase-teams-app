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

const inviteEmailValidation = (email, userEmail) => {
  const emailErrors = emailValidation(email);
  if (emailErrors) return emailErrors;
  if (email.toLowerCase() === userEmail.toLowerCase()) {
    return "You cannot invite yourself!";
  }
  return "";
};

export default {
  onSubmitValidation: (values) => {
    const errors = {};

    const {
      email,
      password,
      confirmPassword,
      displayName,
      inviteEmail,
      userEmail,
      description,
    } = values;

    if (email !== undefined) {
      const emailErrors = emailValidation(email);
      if (emailErrors) errors.email = emailErrors;
    }

    if (password !== undefined) {
      const passwordErrors = passwordValidation(password);
      if (passwordErrors) errors.password = passwordErrors;
    }

    if (confirmPassword !== undefined) {
      const cPasswordErrors = cPasswordValidation(password, confirmPassword);
      if (cPasswordErrors) errors.confirmPassword = cPasswordErrors;
    }

    if (displayName !== undefined) {
      const nameErrors = displayNameValidation(displayName);
      if (nameErrors) errors.name = nameErrors;
    }

    if (inviteEmail !== undefined) {
      const inviteEmailErrors = inviteEmailValidation(inviteEmail, userEmail);
      if (inviteEmailErrors) errors.inviteEmail = inviteEmailErrors;
    }

    // if (description !== undefined) {
    //   const descriptionErrors = descriptionValidation(description);
    //   if (descriptionErrors) errors.description = descriptionErrors;
    // }

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
      case "inviteEmail":
        return inviteEmailValidation(value, values.userEmail);
      default:
        return "";
    }
  },
};
