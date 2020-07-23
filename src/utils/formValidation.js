import {getFirstLetterUppercase} from "./helpers";

const lengthValidation = (value, field, minLength) => {
  const fieldName = getFirstLetterUppercase(field);
  if (value.trim().length < minLength) {
    return `${fieldName} should be at least ${minLength} characters long`;
  }
  return "";
};

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
      title,
      content
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
      const nameErrors = lengthValidation(displayName, 'name', 5);
      if (nameErrors) errors.displayName = nameErrors;
    }

    if (inviteEmail !== undefined) {
      const inviteEmailErrors = inviteEmailValidation(inviteEmail, userEmail);
      if (inviteEmailErrors) errors.inviteEmail = inviteEmailErrors;
    }

    if (description !== undefined) {
      const descriptionErrors = lengthValidation(description, 'description', 10);
      if (descriptionErrors) errors.description = descriptionErrors;
    }

    if (title !== undefined) {
      const titleErrors = lengthValidation(title, 'title', 5);
      if (titleErrors) errors.title = titleErrors;
    }

    if (content !== undefined) {
      const contentErrors = lengthValidation(content, 'content', 10);
      if (contentErrors) errors.content = contentErrors;
    }

    console.log(errors);
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
        return lengthValidation(value, 'name', 5);
      case "inviteEmail":
        return inviteEmailValidation(value, values.userEmail);
      case "description":
        return lengthValidation(value, name, 10);
      case "title":
        return lengthValidation(value, name, 5);
      case "content":
        return lengthValidation(value, name, 5);
      default:
        return "";
    }
  },
};
