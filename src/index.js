import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import { Provider } from "react-redux";

import './index.css';
import CssBaseline from "@material-ui/core/CssBaseline";
import App from "./containers/App";
import * as serviceWorker from "./utils/serviceWorker";


//material ui and helmet are having conflicts with strict mode
ReactDOM.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
      <CssBaseline>
        <App />
      </CssBaseline>
   {/* </React.StrictMode> */}
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
