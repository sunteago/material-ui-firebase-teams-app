import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { app } from "./config/firebaseConfig";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Dashboard from "./pages/Dashboard";
import PageContainer from "./components/Layout/PageContainer";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <Router>
        <Header />

          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/forgotpassword">
              <ForgotPassword />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="*">
              Not found
            </Route>
          </Switch>

        <Footer />
      </Router>
    </>
  );
}

export default App;
