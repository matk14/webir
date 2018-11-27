import React, { Component } from "react";
import PropTypes from "prop-types";

const API = "https://backpis.azurewebsites.net/api/tutorialCategories/published";

class Restaurants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            restaurants: null
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

Restaurants.propTypes = {
    categoriesList: PropTypes.array
};

export default Restaurants;
