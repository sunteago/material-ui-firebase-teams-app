import React from "react";
import { useDispatch } from "react-redux";
import { sendPasswordResetEmail } from "../store/actions";
import useForm from "../hooks/useForm";
import formValidation from "../utils/formValidation";

import PersonIcon from "@material-ui/icons/Person";
import TextInput from "../components/TextInput";
import AuthForm from "../components/Authentication/AuthForm";

const initialState = { email: "" };

export default function ForgotPassword() {
  const dispatch = useDispatch();

  const forgotPasswordHandler = () => {
    dispatch(sendPasswordResetEmail(values.email));
  };

  const form = useForm(initialState, forgotPasswordHandler, formValidation);
  const { values, errors, handleSubmit, handleChange } = form;

  return (
    <AuthForm mode="forgot" onSubmit={handleSubmit}>
      <TextInput
        inputProps={{
          value: values.email || "",
          type: "email",
          label: "Email",
          name: "email",
          error: !!errors.email,
          helperText: errors.email,
          onChange: handleChange,
          required: true,
          autoFocus: true,
        }}
        Icon={PersonIcon}
      />
    </AuthForm>
  );
}
