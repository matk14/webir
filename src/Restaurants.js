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
            <div className="uk-panel uk-container tm-block-top-a">
                <h2 className="mod-panel-title">La Pasiva Pocitos</h2>
                <div class="uk-child-width-1-2@s uk-child-width-1-4@m uk-text-center" data-uk-grid>
                    <div><div class="uk-card uk-card-default uk-card-body"><div>Sándwich de jamón</div><div>Pedidos Ya: $99</div><div>Glovo: $99</div></div></div>
                    <div><div class="uk-card uk-card-default uk-card-body"><div>Sándwich olímpico</div><div>Pedidos Ya: $170</div><div>Glovo: $190</div></div></div>
                    <div><div class="uk-card uk-card-default uk-card-body"><div>Ensalada de tomate</div><div>Pedidos Ya: $136</div><div>Glovo: $136</div></div></div>
                    <div><div class="uk-card uk-card-default uk-card-body"><div>Ravioles con estofado</div><div>Pedidos Ya: $426</div><div>Glovo: $450</div></div></div>
                    <div><div class="uk-card uk-card-default uk-card-body"><div>Chivito canadiense al plato</div><div>Pedidos Ya: $529</div><div>Glovo: $490</div></div></div>
                    <div><div class="uk-card uk-card-default uk-card-body"><div>Sorrentinos a la carusso</div><div>Pedidos Ya: $431</div><div>Glovo: $430</div></div></div>
                    <div><div class="uk-card uk-card-default uk-card-body"><div>Pizza común</div><div>Pedidos Ya: $84</div><div>Glovo: $85</div></div></div>
                    <div><div class="uk-card uk-card-default uk-card-body"><div>Ensalada La Pasiva</div><div>Pedidos Ya: $402</div><div>Glovo: $395</div></div></div>
                    <div><div class="uk-card uk-card-default uk-card-body"><div>Ravioles a la bolognesa</div><div>Pedidos Ya: $271</div><div>Glovo: $320</div></div></div>
                    <div><div class="uk-card uk-card-default uk-card-body"><div>Ensalada de lechuga y tomate</div><div>Pedidos Ya: $136</div><div>Glovo: $150</div></div></div>
                    <div><div class="uk-card uk-card-default uk-card-body"><div>Chivito canadiense con papas fritas</div><div>Pedidos Ya: $399</div><div>Glovo: $389</div></div></div>
                    <div><div class="uk-card uk-card-default uk-card-body"><div>Sándwich de jamón y tomate</div><div>Pedidos Ya: $114</div><div>Glovo: $115</div></div></div>
                    <div><div class="uk-card uk-card-default uk-card-body"><div>Húngara porteña</div><div>Pedidos Ya: $159</div><div>Glovo: $145</div></div></div>
                    <div><div class="uk-card uk-card-default uk-card-body"><div>Ensalada rusa</div><div>Pedidos Ya: $165</div><div>Glovo: $155</div></div></div>
                </div>
            </div>
        );
    }
}

Restaurants.propTypes = {
    categoriesList: PropTypes.array
};

export default Restaurants;
