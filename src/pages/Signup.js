import React, { useState } from "react";
import { connect } from "react-redux";
import Form from "../components/Form/Form";
import * as actions from "../store/actions";

function SignUp({ history, standardSignup }) {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSignUpHandler = (e) => {
    e.preventDefault();
    standardSignup(email, password, displayName);
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

const mapStateToProps = (state) => {
  return {
    msg: state.auth.msg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    standardSignup: (email, password, name) =>
      dispatch(actions.standardSignup(email, password, name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
