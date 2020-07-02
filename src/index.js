import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import './index.css';
import reducers from "./store/reducers";
import CssBaseline from "@material-ui/core/CssBaseline";
import App from "./containers/App";
import * as serviceWorker from "./utils/serviceWorker";

let store;
if (process.env.NODE_ENV === "development") {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(reducers, composeEnhancers(applyMiddleware(ReduxThunk)));
} else {
  store = createStore(reducers, applyMiddleware(ReduxThunk));
}

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <CssBaseline>
        <App />

      </CssBaseline>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
