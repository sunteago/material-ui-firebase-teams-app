import React, { useEffect } from "react";
import { BrowserRouter as Router} from "react-router-dom";
import NavBar from "../components/Layout/NavigationBar/NavBar";
import Footer from "../components/Layout/Footer/Footer";
import AppRouter from "./AppRouter";
import CircularLoading from "../components/Layout/CircularLoading";

import {  useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";

export default function App() {
  const dispatch = useDispatch();
  const {isAuth} = useSelector(state => state.auth)
  const {isFullLoading} = useSelector(state => state.UI)

  useEffect(() => {
    dispatch(actions.startAuthStateChecker());
  }, [dispatch]);

  return isFullLoading  ? (
    <CircularLoading type="full" />
  ) : (
    <>
      <Router>
        <NavBar />
        <AppRouter isAuth={isAuth} />
        <Footer />
      </Router>
    </>
  );
}
