import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import { App } from "./components/app";

import "./styles.scss";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.body.querySelector(".app")
);
