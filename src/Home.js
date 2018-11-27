import React, { Component } from "react";
import "./App.less";

class Home extends Component {
  render() {
    return (
        <div className="tm-ishome">
            <div id="block-fullscreen-a" className="tm-block-fullscreen-a">
                <section className="tm-fullscreen-a">
                    <div className="uk-panel mod-slider">

                        <div uk-slideshow="autoplay: true; animation: push; ratio: 2000:582; min-height: 300; max-height: 700">

                            <div className="uk-position-relative uk-visible-toggle uk-light">

                                <ul className="uk-slideshow-items">
                                    <li>
                                        <div className="uk-background-fixed uk-background-center-center uk-background-cover" style={{ backgroundImage: "url('slider.jpg')" }}></div>

                                        <div className="uk-overlay uk-overlay-primary uk-position-bottom uk-text-center uk-transition-slide-bottom uk-flex uk-flex-middle uk-flex-center">
                                            <h1>Servicio de recomendaciones de comidas</h1>
                                        </div>
                                    </li>
                                 </ul>

                                </div>

                            </div>

                        </div>
                </section>
            </div>

            <div className="tm-block-top-a">
                <section className="tm-top-a">
                    <div className="uk-panel">
                    <h3 className="mod-panel-title">Trabajamos con</h3>
                        <div className="uk-flex uk-flex-center" data-uk-grid>
                            <div>
                            <img src="glovo.png" alt=""/>
                            </div>
                            <div>
                                <img src="pedidos.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    );
  }
}

export default Home;
