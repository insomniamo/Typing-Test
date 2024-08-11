import React from "react";
import ReactDOM from "react-dom";
import "./base/style.scss";

import App from "./components/App/App.jsx";

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
