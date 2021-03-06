import React from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../store/actions";
import useForm from "../hooks/useForm";
import formValidation from "../utils/formValidation";

import AuthForm from "../components/Authentication/AuthForm";
import TextInput from "../components/TextInput";
import PersonIcon from "@material-ui/icons/Person";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const dispatch = useDispatch();

  const onLogInHandler = () => dispatch(logIn(values.email, values.password));

  const form = useForm(initialState, onLogInHandler, formValidation);
  const { values, errors, handleSubmit, handleChange } = form;

  return (
    <AuthForm mode="login" onSubmit={handleSubmit}>
      <TextInput
        inputProps={{
          value: values.email,
          type: "email",
          label: "Email",
          autoFocus: true,
          required: true,
          onChange: handleChange,
          error: !!errors.email,
          helperText: errors.email,
          inputProps: {
            name: "email",
          },
        }}
        Icon={PersonIcon}
      />
      <TextInput
        inputProps={{
          value: values.password,
          type: "password",
          label: "Password",
          required: true,
          onChange: handleChange,
          error: !!errors.password,
          helperText: errors.password,
          inputProps: {
            name: "password",
          },
        }}
        Icon={VpnKeyIcon}
      />
    </AuthForm>
  );
}
