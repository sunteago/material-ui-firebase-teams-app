import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../store/actions";

import AuthForm from "../components/Form/AuthForm";
import TextInput from "../components/TextInput";
import PersonIcon from "@material-ui/icons/Person";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

function Login({ isAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const onLogInHandler = (e) => {
    e.preventDefault();
    dispatch(logIn(email, password));
  };

  return (
    <AuthForm mode="login" onActionHandler={onLogInHandler}>
      <TextInput
        inputProps={{
          value: email,
          type: "email",
          label: "Email",
          autoFocus: true,
          required: true,
          onChange: (e) => setEmail(e.target.value),
        }}
        Icon={PersonIcon}
      />
      <TextInput
        inputProps={{
          value: password,
          type: "password",
          label: "Password",
          autoFocus: true,
          required: true,
          onChange: (e) => setPassword(e.target.value),
        }}
        Icon={VpnKeyIcon}
      />
    </AuthForm>
  );
}
export default Login;
