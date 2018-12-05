import React, { Component } from "react";
import PropTypes from "prop-types";

const API = "http://172.16.100.112:8080/ApiRest/restaurantes";

class Recomendaciones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            restaurants: null,
            products: null,
            title: "",
            item: null
        };
        this.getProducts = this.getProducts.bind(this);
    }

    getProducts() {
        fetch(API + "/products?pedidosya=" + this.state.item.pedidosYa.url + "&glovo=" + this.state.item.glovo.url)
          .then(response => response.json())
          .then(response => this.setState({ products: response, restaurants: [] })
        );
    }

    handleOnClick(item) {
        this.setState({
            item: item,
            title: item.pedidosYa.name,
            restaurants: null
        });
        setTimeout(() =>
            this.getProducts(),
        500);
    }

    componentDidMount() {
        this.setState({
            title: this.props.title
        });
        fetch(API)
            .then(response => response.json())
            .then(response => this.setState({ restaurants: response }));
    }

    render() {

        return (
            <div className="uk-panel uk-container tm-block-top-a">
                <h2 className="mod-panel-title">{this.state.title}</h2>
                <div className="uk-child-width-1-2@s uk-child-width-1-4@m uk-flex uk-flex-center uk-flex-middle uk-text-center" data-uk-scrollspy="target: > div; cls:uk-animation-slide-right; delay: 250" data-uk-grid>
                    {
                    this.state.restaurants ?
                        this.state.restaurants.map((item, index) =>
                            <div key={index}>
                                <div className="uk-card uk-card-default uk-card-body">
                                    <div>
                                        <a onClick={this.handleOnClick.bind(this, item)}
                                        >{item.pedidosYa.name}</a>
                                        </div>
                                </div>
                            </div>
                        )
                        : <div className="uk-flex uk-flex-center">
                            <div uk-spinner="ratio: 3"></div>
                        </div>
                    }
                </div>
                <div className="uk-child-width-1-2@s uk-child-width-1-4@m uk-text-center uk-grid-match" data-uk-scrollspy="target: > div; cls:uk-animation-slide-right; delay: 250" data-uk-grid>
                    {
                        this.state.products && this.state.products.map((item, index) =>
                            <div className="uk-flex uk-flex-middle" key={index}>
                                <div className="uk-card uk-card-default uk-card-body">
                                    <div>{item.pedidosYa.name}</div>
                                    {
                                        item.pedidosYa.precio < item.glovo.precio
                                        ?
                                        <div>
                                            <div><strong>Pedidos Ya {"$ " + item.pedidosYa.precio}</strong></div>
                                            <div>Glovo {"$ " + item.glovo.precio}</div>
                                        </div>
                                        :
                                        <div>

                                            <div>Pedidos Ya {"$ " + item.pedidosYa.precio}</div>
                                            <div><strong>Glovo {"$ " + item.glovo.precio}</strong></div>

                                        </div>

                                    }
                                </div>
                            </div>
                        )
                    }
                </div>

            </div>
        );
    }
}

Recomendaciones.propTypes = {
    title: PropTypes.string,
};

export default Recomendaciones;
