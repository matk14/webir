import React, { Component } from "react";
import Home from "./Home";
import Restaurants from "./Restaurants";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.less";
import Recomendaciones from "./Recomendaciones";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recomendacionesGlovo: "",
      recomendacionesPedidos: "",
      restaurant: "",
      urlGlovo: "",
      urlPedidos: ""
    };
  }

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
                    <a href="/">Inicio</a>
                  </li>
                  <li className="item">
                    <a href="/pedidos-ya">Pedidos-Ya</a>
                  </li>
                  <li className="item">
                    <a href="/glovo">Glovo</a>
                  </li>
                  <li className="item">
                    <a href="/recomendaciones">Recomendaciones</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <Route exact path="/" component={Home} />
          <Route exact path="/pedidos-ya" component={() => <Restaurants type={"pedidos"} title={"Pedidos Ya"} />} />
          <Route exact path="/glovo" component={() => <Restaurants type={"glovo"} title={"Glovo"} />} />
          <Route exact path="/recomendaciones" component={() => <Recomendaciones recomendaciones={this.onClick} title={"Recomendaciones"} />} />

          <div id="block-footer" className="uk-section tm-block-footer">
            <div className="uk-container">
              <div className="tm-section-wrapper">
                <footer className="tm-footer uk-flex-between uk-flex-center" data-uk-grid>
                  <div>
                    <div className="uk-panel mod-legal">
                      Pedidos WEBIR - Todos los derechos reservados.
                    </div>
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
