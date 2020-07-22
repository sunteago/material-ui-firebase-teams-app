import React from "react";
import { useDispatch } from "react-redux";
import { standardSignup } from "../store/actions";
import useForm from "../hooks/useForm";

import AuthForm from "../components/Form/AuthForm";
import FaceIcon from "@material-ui/icons/Face";
import TextInput from "../components/TextInput";
import PersonIcon from "@material-ui/icons/Person";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUp() {
  const dispatch = useDispatch();

  const onSignUpHandler = (e) => {
    const { email, password, displayName } = values;
    dispatch(standardSignup(email.toLowerCase(), password, displayName));
  };

  const { values, handleSubmit, handleChange } = useForm(
    initialState,
    onSignUpHandler
  );

  return (
    <AuthForm mode="signup" onSubmit={handleSubmit}>
      <TextInput
        value={values.email}
        inputProps={{
          type: "email",
          label: "Email",
          name: "email",
          autoFocus: true,
          required: true,
          onChange: handleChange,
        }}
        Icon={PersonIcon}
      />
      <TextInput
        value={values.displayName}
        inputProps={{
          type: "name",
          label: "Name",
          name: "displayName",
          required: true,
          onChange: handleChange,
        }}
        Icon={FaceIcon}
        label="Name"
        required
      />

      <TextInput
        value={values.password}
        inputProps={{
          type: "password",
          label: "Password",
          name: "password",
          required: true,
          onChange: handleChange,
        }}
        Icon={VpnKeyIcon}
      />
      <TextInput
        value={values.confirmPassword}
        inputProps={{
          type: "password",
          label: "Password",
          name: "confirmPassword",
          required: true,
          onChange: handleChange,
        }}
        Icon={VpnKeyIcon}
        label="Confirm Password"
        required
      />
    </AuthForm>
  );
}
