import React from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../store/actions";
import useForm from "../hooks/useForm";

import AuthForm from "../components/Form/AuthForm";
import TextInput from "../components/TextInput";
import PersonIcon from "@material-ui/icons/Person";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

function Login({ isAuth }) {
  const dispatch = useDispatch();

  const onLogInHandler = () => dispatch(logIn(values.email, values.password));

  const { values, handleSubmit, handleChange } = useForm(onLogInHandler);

  return (
    <AuthForm mode="login" onSubmit={handleSubmit}>
      <TextInput
        inputProps={{
          value: values.email || '',
          type: "email",
          label: "Email",
          autoFocus: true,
          required: true,
          onChange: handleChange,
          inputProps: {
            name: "email",
          },
        }}
        Icon={PersonIcon}
      />
      <TextInput
        inputProps={{
          value: values.password || '',
          type: "password",
          label: "Password",
          autoFocus: true,
          required: true,
          onChange: handleChange,
          inputProps: {
            name: "password",
          },
        }}
        Icon={VpnKeyIcon}
      />
    </AuthForm>
  );
}
export default Login;
