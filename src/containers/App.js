import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import * as actions from "../store/actions";

import AppRouter from "./AppRouter";
import SnackAlert from "../components/Layout/SnackAlert";
import NavBar from "../components/Layout/NavigationBar/NavBarContainer";
import Footer from "../components/Layout/Footer/Footer";
import CircularLoading from "../components/Layout/CircularLoading";

export default function App() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const { isFullLoading } = useSelector((state) => state.UI);
  const snackData = useSelector((state) => state.UI.snackData);

  useEffect(() => {
    dispatch(actions.startAuthStateChecker());
    dispatch(actions.fetchNewsData());
  }, [dispatch]);

  return isFullLoading ? (
    <CircularLoading type="full" />
  ) : (
    <>
      <Router>
        <NavBar />
        <AppRouter isAuth={isAuth} />
        <Footer />
      </Router>
      <SnackAlert
        severity={snackData.severity}
        open={snackData.isOpen}
        action={snackData.action}
      />
    </>
  );
}
