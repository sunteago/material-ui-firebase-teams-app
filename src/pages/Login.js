import React, { useState } from "react";
import Form from "../components/Form/Form";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";

function Login({ isAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const onLogInHandler = (e) => {
    e.preventDefault();
    dispatch(actions.logIn(email, password));
  };
  
  return (
    <Form
      mode="login"
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onActionHandler={onLogInHandler}
    />
  );
}
export default Login;
