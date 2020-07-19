import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Form from "../components/Form/Form";
import * as actions from "../store/actions";

export default function SignUp() {
  const dispatch = useDispatch();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSignUpHandler = (e) => {
    e.preventDefault();
    dispatch(
      actions.standardSignup(email.toLowerCase(), password, displayName)
    );
  };

  return (
    <>
      <Form
        mode="signup"
        displayName={displayName}
        setDisplayName={setDisplayName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        onActionHandler={onSignUpHandler}
      />
    </>
  );
}