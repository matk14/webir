import React, { Component } from "react";
import AppTutorial from "./tutorial/AppTutorial";
import Home from "./Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.less";

class App extends Component {
  render() {
    return <Router>
        <div className="tm-page">

        <div className="tm-block-header" data-uk-sticky="show-on-up: true; top:-175; animation: uk-animation-slide-top">
          <div className="uk-navbar-container">
            <div className="uk-container">

              <nav className="uk-navbar uk-flex-between" data-uk-navbar>

                <div className="uk-navbar-left">
                  <a className="uk-navbar-item uk-logo uk-visible@m" href="#block-home" data-uk-scroll>
                    <img className="uk-responsive-height" src="logo.jpg" alt="{{ theme.title }}" />
                  </a>
                </div>

                <div className="uk-navbar-center uk-hidden@m">
                  <a className="uk-navbar-item uk-logo" href="#block-home" data-uk-scroll>
                    <img className="uk-responsive-height" src="logo.jpg" alt="{{ theme.title }}" />
                  </a>
                </div>

              </nav>

            </div>
          </div>

          <div className="tm-block-navbar uk-flex uk-flex-center uk-visible@m">
            <div className="uk-container">
              <ul className="uk-navbar-nav" data-uk-scrollspy-nav="closest: li; scroll: true, offset: 0">
                <li className="item">
                  <a href="#">Inicio</a>
                </li>
                <li className="item">
                  <a href="#">Pedidos-Ya</a>
                </li>
                <li className="item">
                  <a href="#">Glovo</a>
                </li>
                <li className="item">
                  <a href="#">Recomendaciones</a>
                </li>
              </ul>

            </div>
          </div>

        </div>

        <Route path="/tutorial" component={AppTutorial} />
        <Route exact path="/" component={Home} />

        <div id="block-footer" className="uk-section tm-block-footer">
          <div className="uk-container">
            <div className="tm-section-wrapper">
              <footer className="tm-footer uk-flex-between uk-flex-center" data-uk-grid>
                <div>
                  <div className="uk-panel mod-legal">Pedidos WEBIR - Todos los derechos reservados.</div>
                </div>
                <div>
                  <div className="uk-panel mod-siniestro">
                    WEBIR Grupo 10
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </Router>;
  }
}

export default App;
