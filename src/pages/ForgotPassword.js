import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendPasswordResetEmail } from "../store/actions";

import Form from "../components/Form/Form";

function ForgotPassword(props) {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const onForgotPasswordHandler = (e) => {
    e.preventDefault();
    dispatch(sendPasswordResetEmail(email));
  };
  return (
    <Form
      mode="forgotpassword"
      email={email}
      setEmail={setEmail}
      onActionHandler={onForgotPasswordHandler}
    />
  );
}

export default ForgotPassword;
