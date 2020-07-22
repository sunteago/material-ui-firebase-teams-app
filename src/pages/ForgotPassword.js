import React from "react";
import { useDispatch } from "react-redux";
import { sendPasswordResetEmail } from "../store/actions";
import useForm from "../hooks/useForm";

import PersonIcon from "@material-ui/icons/Person";
import TextInput from "../components/TextInput";
import AuthForm from "../components/Form/AuthForm";

function ForgotPassword(props) {
  const dispatch = useDispatch();

  const forgotPasswordHandler = (e) => {
    dispatch(sendPasswordResetEmail(values.email));
  };

  const { values, handleSubmit, handleChange } = useForm(
    { email: "" },
    forgotPasswordHandler
  );

  return (
    <AuthForm mode="recoverPassword" onSubmit={handleSubmit}>
      <TextInput
        inputProps={{
          value: values.email,
          type: "email",
          label: "Email",
          name: "email",
          onChange: handleChange,
          required: true,
          autoFocus: true,
        }}
        Icon={PersonIcon}
      />
    </AuthForm>
  );
}

export default ForgotPassword;
