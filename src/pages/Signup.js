import React from "react";
import { useDispatch } from "react-redux";
import { standardSignup } from "../store/actions";
import useForm from "../hooks/useForm";

import AuthForm from "../components/Form/AuthForm";
import FaceIcon from "@material-ui/icons/Face";
import TextInput from "../components/TextInput";
import PersonIcon from "@material-ui/icons/Person";
import VpnKeyIcon from "@material-ui/icons/VpnKey";


export default function SignUp() {
  const dispatch = useDispatch();

  const onSignUpHandler = (e) => {
    const { email, password, displayName } = values;
    dispatch(standardSignup(email.toLowerCase(), password, displayName));
  };

  const { values, handleSubmit, handleChange } = useForm(onSignUpHandler);

  return (
    <AuthForm mode="signup" onSubmit={handleSubmit}>
      <TextInput
        inputProps={{
          value: values.email || '',
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
        inputProps={{
          value: values.displayName || '',
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
        inputProps={{
          value: values.password || '',
          type: "password",
          label: "Password",
          name: "password",
          required: true,
          onChange: handleChange,
        }}
        Icon={VpnKeyIcon}
      />
      <TextInput
        inputProps={{
          value: values.confirmPassword || '',
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
