import React, { useState, useEffect } from "react";
import { googleAuthProvider } from "../config/firebaseConfig";
import Form from "../components/Form";
import * as firebase from "firebase/app";
import { Box, Typography } from "@material-ui/core";

function SignUp({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //using googleauth
   useEffect(() => {
     firebase.auth().onAuthStateChanged((user) => {
       if (user) {
         setIsAuthenticated(true);
         setUser({
           name: user.displayName,
           email: user.email,
           photoUrl: user.photoURL,
           emailVerified: user.emailVerified,
           uid: user.uid,
         });
         user.sendEmailVerification();
       }
     })
   }, []);

  // const startSignUp = (provider) => {
  //   firebase
  //     .auth()
  //     .signInWithPopup(googleAuthProvider)
  //     .then((result) => {
  //       setToken(result.credential.accessToken);
  //       // const user = result.user;
  //     })
  //     .catch((err) => console.log(err));
  // };

  const startSignUp = (e) => {
    e.preventDefault();
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(console.log)
      .catch(console.log);
  };

  return (
    <>
      <Form
        mode="signup"
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onActionHandler={startSignUp}
      />
      {isAuthenticated ? (
        <Box>
          <p> {user.name}</p>
          <p> {user.email}</p>
          <img src={user.photoURL} alt="alt" />
          <p> {user.emailVerified ? "VERIFICADO" : "NO VERTIICADO"}</p>
        </Box>
      ) : null}
    </>
  );
}
export default SignUp;
