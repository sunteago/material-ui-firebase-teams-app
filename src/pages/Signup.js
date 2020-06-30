import React, { useState } from "react";
import {connect} from 'react-redux';
import Form from "../components/Form";
import * as actions from '../store/actions';

function SignUp({ history, standardSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUpHandler = (e) => {
    e.preventDefault();
    standardSignup(email, password);
  };

  return (
    <>
      <Form
        mode="signup"
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onActionHandler={onSignUpHandler}
      />
      {/* {isAuthenticated ? (
        <Box>
          <p> {user.name}</p>
          <p> {user.email}</p>
          <img src={user.photoURL} alt="alt" />
          <p> {user.emailVerified ? "VERIFICADO" : "NO VERTIICADO"}</p>
        </Box>
      ) : null} */}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    msg: state.auth.msg
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    standardSignup: (email, password) => dispatch(actions.standardSignup(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
