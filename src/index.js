import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import clippy from "clippyjs";

clippy.load("Clippy", agent => {
    window.clippyAgent = agent;
    ReactDOM.render(<App />, document.getElementById("root"));
    registerServiceWorker();
});

