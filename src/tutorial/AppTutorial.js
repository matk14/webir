import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./AppTutorial.less";
import TutorialsPanel from "./tutorialsPanel/TutorialsPanel";
import ExecutionPanel from "./executionPanel/ExecutionPanel";
import AssistanceManager from "./AssistanceManager";
import UIkit from "uikit";

class AppTutorial extends Component {

  translateWindows() {
    let page = document.getElementById("id-page");
    let windowWidth = window.innerWidth;
    if (page.clientWidth === windowWidth) {
      page.classList.add("tm-page-translate");
    } else {
      page.classList.remove("tm-page-translate");
    }
  }

  translateWindowsAndOffcanvas() {
    let page = document.getElementById("id-page");
    let windowWidth = window.innerWidth;
    if (page.clientWidth === windowWidth) {
      page.classList.add("tm-page-translate");
      UIkit.offcanvas(document.getElementById("offcanvas-reveal")).show();
    } else {
      page.classList.remove("tm-page-translate");
      UIkit.offcanvas(document.getElementById("offcanvas-reveal")).hide();
    }
  }

  componentDidMount() {
    document.getElementById("id-close").addEventListener("click", this.translateWindows.bind(this));
    if (document.getElementById("id-select")) {
      document.getElementById("id-select").addEventListener("click", this.translateWindowsAndOffcanvas.bind(this));
    }
  }

  render() {
    return (
      <div id="id-page" className="tm-page uk-flex uk-flex-center uk-flex-middle">
        <div className="tm-close-offcanvas">
          <button className="uk-button uk-button-default uk-margin-small-right" id="id-close" type="button" data-uk-toggle="target: #offcanvas-reveal">
            <span data-uk-icon="icon: menu"></span>
          </button>
        </div>
        <div id="offcanvas-reveal" uk-offcanvas="mode: push; overlay: false; esc-close: false; bg-close: false">
          <div className="uk-offcanvas-bar">
            <TutorialsPanel />
          </div>
        </div>
        <Route
          path="/tutorial/:id"
          render={props =>
            <AssistanceManager>
              <ExecutionPanel
                {...props}
              />
            </AssistanceManager>
          }
        />
        <Route
          exact
          path="/tutorial"
          component={() =>
            <div className="uk-panel tm-excecute-tutorial uk-flex uk-flex-middle uk-flex-center">
              <div className="tm-objective tm-select-tutorial">
                <h2>Select a tutorial</h2>
                <p><a id="id-select" className="uk-button tm-button">Select</a></p>
              </div>
            </div>
          }
        />
      </div>
    );
  }
}

export default AppTutorial;
