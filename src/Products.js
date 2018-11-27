import React, { Component } from "react";
import PropTypes from "prop-types";

const API = "https://backpis.azurewebsites.net/api/tutorialCategories/published";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            products: null
        };
    }

    componentDidMount() {
        fetch(API)
            .then(response => response.json())
            .then(categories => this.setState({ categories }));
    }

    render() {

        return (
            <div className="uk-panel">
            </div>
        );
    }
}

Products.propTypes = {
    title: PropTypes.string
};

export default Products;
