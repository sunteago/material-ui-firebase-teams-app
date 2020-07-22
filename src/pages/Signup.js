import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { standardSignup } from "../store/actions";

import AuthForm from "../components/Form/AuthForm";
import FaceIcon from "@material-ui/icons/Face";
import TextInput from "../components/TextInput";
import PersonIcon from "@material-ui/icons/Person";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

export default function SignUp() {
  const dispatch = useDispatch();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSignUpHandler = (e) => {
    e.preventDefault();
    dispatch(standardSignup(email.toLowerCase(), password, displayName));
  };

  return (
    <AuthForm mode="signup" onActionHandler={onSignUpHandler}>
      <TextInput
        value={email}
        inputProps={{
          type: "email",
          label: "Email",
          autoFocus: true,
          required: true,
          onChange: (e) => setEmail(e.target.value),
        }}
        Icon={PersonIcon}
      />
      <TextInput
        value={displayName}
        inputProps={{
          type: "email",
          label: "Email",
          required: true,
          onChange: (e) => setDisplayName(e.target.value),
        }}
        Icon={FaceIcon}
        label="Name"
        required
      />

      <TextInput
        value={password}
        inputProps={{
          type: "password",
          label: "Password",
          required: true,
          onChange: (e) => setPassword(e.target.value),
        }}
        Icon={VpnKeyIcon}
      />
      <TextInput
        value={confirmPassword}
        inputProps={{
          type: "password",
          label: "Password",
          required: true,
          onChange: (e) => setConfirmPassword(e.target.value),
        }}
        Icon={VpnKeyIcon}
        label="Confirm Password"
        required
      />
    </AuthForm>
  );
}
