import React, { Component } from "react";
import PropTypes from "prop-types";

const API = "http://172.16.100.112:8080/ApiRest/restaurantes";

class Restaurants extends Component {
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

    handleOnClick(item) {
        this.setState({
            item: item,
            title: item.name,
            restaurants: null
        });
        setTimeout(() =>
            this.getProducts(),
        500);
    }

    getProducts() {
        if (this.props.type === "glovo") {
            fetch(API + "/products?glovo=" + this.state.item.url)
                .then(response => response.json())
                .then(response => this.setState({ products: response, restaurants: [] }));
        } else {
            fetch(API + "/products?pedidosya=" + this.state.item.url)
                .then(response => response.json())
                .then(response => this.setState({ products: response, restaurants: [] }));
        }
    }

    componentDidMount() {
        this.setState({
            title: this.props.title
        });
        if (this.props.type === "glovo") {
            fetch(API + "/glovo/")
                .then(response => response.json())
                .then(response => this.setState({ restaurants: response }));
        } else {
            fetch(API + "/pedidosYa/")
                .then(response => response.json())
                .then(response => this.setState({ restaurants: response }));
        }
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
                                <div><a onClick={this.handleOnClick.bind(this, item)}>{item.name}</a></div>
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
                                    <div>{item.name}</div>
                                        <div>
                                            <div><strong>{"$ " + item.precio}</strong></div>
                                        </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

Restaurants.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string
};

export default Restaurants;
