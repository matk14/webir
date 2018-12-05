import React, { Component } from "react";
import PropTypes from "prop-types";

const API = "http://172.16.100.112:8080/ApiRest/restaurantes";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: null,
        };
    }

    componentDidMount() {
        fetch(API)
            .then(response => response.json())
            .then(response => this.setState({ restaurants: response }));
    }

    render() {

        return (
            <div className="uk-panel uk-container tm-block-top-a">
                <h2 className="mod-panel-title">{this.props.title}</h2>
                {
                this.state.products ?
                        <div className="uk-child-width-1-2@s uk-child-width-1-4@m uk-text-center uk-grid-match" data-uk-scrollspy="target: > div; cls:uk-animation-slide-right; delay: 250" data-uk-grid>
                        {
                            this.state.products.map((item, index) =>
                                <div className="uk-flex uk-flex-middle" key={index}>
                                    <div className="uk-card uk-card-default uk-card-body">
                                        <div>{item[0]}</div>
                                        {
                                            item[1] < item[2]
                                            ?
                                                <div>
                                                    <div><strong>Pedidos Ya {"$ " + item[1]}</strong></div>
                                                    <div>Glovo {"$ " + item[2]}</div>
                                                </div>
                                            :
                                                <div>
                                                    <div>Pedidos Ya {"$ " + item[1]}</div>
                                                    <div><strong>Glovo {"$ " + item[2]}</strong></div>

                                                </div>

                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
                : <div className="uk-flex uk-flex-center">
                    <div uk-spinner="ratio: 3"></div>
                </div>
                }
            </div>
        );
    }
}

Products.propTypes = {
    title: PropTypes.string,
    glovo: PropTypes.string,
    pedidos: PropTypes.string
};

export default Products;
