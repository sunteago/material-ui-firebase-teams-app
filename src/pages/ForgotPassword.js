import React from "react";
import { useDispatch } from "react-redux";
import { sendPasswordResetEmail } from "../store/actions";
import useForm from "../hooks/useForm";
import formValidation from "../utils/formValidation";

import PersonIcon from "@material-ui/icons/Person";
import TextInput from "../components/TextInput";
import AuthForm from "../components/Form/AuthForm";

const initialState = { email: "" };

function ForgotPassword(props) {
  const dispatch = useDispatch();

  const forgotPasswordHandler = () => {
    dispatch(sendPasswordResetEmail(values.email));
  };

  const { values, errors, handleSubmit, handleChange } = useForm(
    initialState,
    forgotPasswordHandler,
    formValidation
  );

  return (
    <AuthForm mode="recoverPassword" onSubmit={handleSubmit}>
      <TextInput
        inputProps={{
          value: values.email || "",
          type: "email",
          label: "Email",
          name: "email",
          error: !!errors.email,
          helperText: errors.email,
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
