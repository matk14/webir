import React, { Component } from "react";
import PropTypes from "prop-types";

const API = "http://172.16.100.112:8080/ApiRest/restaurantes";

class Restaurants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            restaurants: null
        };
    }

    componentDidMount() {
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
                <h2 className="mod-panel-title">{this.props.title}</h2>
                <div className="uk-child-width-1-2@s uk-child-width-1-4@m uk-flex uk-flex-center uk-flex-middle uk-text-center" data-uk-scrollspy="target: > div; cls:uk-animation-slide-right; delay: 250" data-uk-grid>
                {
                    this.state.restaurants ?
                    this.state.restaurants.map((item, index) =>
                        <div key={index}>
                            <div className="uk-card uk-card-default uk-card-body">
                                <div><a href="/products">{item.name}</a></div>
                            </div>
                        </div>
                    )
                    : <div className="uk-flex uk-flex-center">
                        <div uk-spinner="ratio: 3"></div>
                    </div>
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
