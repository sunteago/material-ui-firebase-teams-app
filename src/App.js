import React, { useEffect, useCallback } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import AppRouter from "./containers/AppRouter";
import FullLoading from "./components/FullLoading";

import { connect } from "react-redux";
import * as actions from "./store/actions";

function App({ startAuthStateChecker, isAuth }) {
  const initializeObserver = useCallback(() => {
    startAuthStateChecker();
  }, [startAuthStateChecker]);

  useEffect(() => {
    initializeObserver();
  }, [initializeObserver]);

  return isAuth === null ? (
    <FullLoading />
  ) : (
    <>
      <Router>
        <Header />
        <AppRouter isAuth={isAuth} />
        <Footer />
      </Router>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startAuthStateChecker: () => dispatch(actions.startAuthStateChecker()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
