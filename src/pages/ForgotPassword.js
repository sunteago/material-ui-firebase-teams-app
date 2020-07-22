import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendPasswordResetEmail } from "../store/actions";

import PersonIcon from "@material-ui/icons/Person";
import TextInput from "../components/TextInput";
import AuthForm from "../components/Form/AuthForm";


function ForgotPassword(props) {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const onForgotPasswordHandler = (e) => {
    e.preventDefault();
    dispatch(sendPasswordResetEmail(email));
  };
  return (
    <AuthForm
      mode="recoverPassword"
      formStates={{ email, setEmail }}
      onActionHandler={onForgotPasswordHandler}
    >
      <TextInput
        inputProps={{
          value: email,
          type: "password",
          label: "Password",
          onChange: (e) => setEmail(e.target.value),
          required: true,
          autoFocus: true
        }}
        Icon={PersonIcon}
      />
    </AuthForm>
  );
}

export default ForgotPassword;
