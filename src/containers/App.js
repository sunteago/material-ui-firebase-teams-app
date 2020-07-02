import React, { useEffect } from "react";
import { BrowserRouter as Router} from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import AppRouter from "./AppRouter";
import FullLoading from "../components/FullLoading";

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
