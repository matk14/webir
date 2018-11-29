import React, { Component } from "react";
import PropTypes from "prop-types";

const API = "https://backpis.azurewebsites.net/api/tutorialCategories/published";

let array = [
    ["La Vespita", "https://glovoapp.com/es/mtv/store/la-vespita/", "La Vespita", "https://www.pedidosya.com.uy/restaurantes/montevideo/la-vespita-menu"],
    ["Chez Piñeiro", "https://glovoapp.com/es/mtv/store/chez-pineiro/", "Chez Piñeiro", "https://www.pedidosya.com.uy/restaurantes/montevideo/chez-pineiro-menu"],
    ["Burgers", "https://glovoapp.com/es/mtv/store/burgers-2/", "Burgers Pocitos", "https://www.pedidosya.com.uy/restaurantes/montevideo/burgers-pocitos-menu"],
    ["La Cavia", "https://glovoapp.com/es/mtv/store/la-cavia-2/", "La Cavia Parrillada", "https://www.pedidosya.com.uy/restaurantes/montevideo/la-cavia-parrillada-menu"],
    ["Barreiro Gourmet", "https://glovoapp.com/es/mtv/store/barreiro-gourmet/", "Barreiro Gourmet", "https://www.pedidosya.com.uy/restaurantes/montevideo/barreiro-gourmet-menu"],
    ["Pizza Libre", "https://glovoapp.com/es/mtv/store/pizza-libre/", "Pizza Libre - Pocitos", "https://www.pedidosya.com.uy/restaurantes/montevideo/pizza-libre-pocitos-menu"],
    ["Glück", "https://glovoapp.com/es/mtv/store/gl%C3%BCck/", "Glück", "https://www.pedidosya.com.uy/restaurantes/montevideo/gluck-menu"],
    ["Lokotas", "https://glovoapp.com/es/mtv/store/lokotas/", "Lokotas", "https://www.pedidosya.com.uy/restaurantes/montevideo/empanadas-lokotas-menu"],
    ["Qué Papa", "https://glovoapp.com/es/mtv/store/que-papa/", "Qué Papa", "https://www.pedidosya.com.uy/restaurantes/montevideo/que-papa-menu"],
    ["Porto Vanila", "https://glovoapp.com/es/mtv/store/porto-vanila/", "Porto Vanila - Scoseria", "https://www.pedidosya.com.uy/restaurantes/montevideo/porto-vanila-scoseria-menu"],
    ["Porto Vanila", "https://glovoapp.com/es/mtv/store/porto-vanila/", "Porto Vanila - Ellauri", "https://www.pedidosya.com.uy/restaurantes/montevideo/porto-vanila-ellauri-menu"],
    ["Sumi Sushi", "https://glovoapp.com/es/mtv/store/sumi-sushi/", "Sumi Sushi", "https://www.pedidosya.com.uy/restaurantes/montevideo/sumi-sushi-menu"],
    ["OMG Fried Chicken", "https://glovoapp.com/es/mtv/store/omg-fried-chicken/", "OMG Fried Chicken", "https://www.pedidosya.com.uy/restaurantes/montevideo/omg-fried-chicken-menu"],
    ["Oliva", "https://glovoapp.com/es/mtv/store/oliva/", "Oliva", "https://www.pedidosya.com.uy/restaurantes/montevideo/oliva-menu"],
    ["Oliva", "https://glovoapp.com/es/mtv/store/oliva/", "Oliva y Nuez", "https://www.pedidosya.com.uy/restaurantes/montevideo/oliva-y-nuez-menu"],
    ["Vegan Wraps", "https://glovoapp.com/es/mtv/store/vegan-wraps/", "Vegan Wraps", "https://www.pedidosya.com.uy/restaurantes/montevideo/vegan-wraps-menu"],
    ["Fabric Sushi", "https://glovoapp.com/es/mtv/store/fabric-sushi-3/", "Fabric Sushi Bar", "https://www.pedidosya.com.uy/restaurantes/montevideo/fabric-sushi-bar-menu"],
    ["Tony's Pizza", "https://glovoapp.com/es/mtv/store/tonys-pizza/", "Tony's Pizza", "https://www.pedidosya.com.uy/restaurantes/montevideo/tonys-pizza-menu"],
    ["Don Peperone", "https://glovoapp.com/es/mtv/store/don-peperone/", "Don Peperone Punta Carretas", "https://www.pedidosya.com.uy/restaurantes/montevideo/don-peperone-punta-carretas-menu"],
    ["Tiqui Taca", "https://glovoapp.com/es/mtv/store/tiqui-taca/", "Tiqui Taca Pocitos - Punta Carretas", "https://www.pedidosya.com.uy/restaurantes/montevideo/tiqui-taca-pocitos-menu"],
    ["Tanooki", "https://glovoapp.com/es/mtv/store/tanooki/", "Tanooki Sushi", "https://www.pedidosya.com.uy/restaurantes/montevideo/tanooki-sushi-menu"],
    ["La Vanguardia", "https://glovoapp.com/es/mtv/store/la-vanguardia/", "La Vanguardia 1934", "https://www.pedidosya.com.uy/restaurantes/montevideo/la-vanguardia-1934-menu"],
    ["WTF Burger", "https://glovoapp.com/es/mtv/store/wtf-burger/", "WTF Burger", "https://www.pedidosya.com.uy/restaurantes/montevideo/wtf-burger-menu"],
    ["Sushi Time", "https://glovoapp.com/es/mtv/store/sushi-time-4/", "Sushi Time Pocitos", "https://www.pedidosya.com.uy/restaurantes/montevideo/sushi-time-pocitos-menu"],
    ["La Pasiva", "https://glovoapp.com/es/mtv/store/la-pasiva/", "La Pasiva - Punta Carretas Shopping", "https://www.pedidosya.com.uy/restaurantes/montevideo/la-pasiva-punta-carretas-shopping-menu"],
    ["La Pasiva", "https://glovoapp.com/es/mtv/store/la-pasiva/", "La Pasiva Pocitos", "https://www.pedidosya.com.uy/restaurantes/montevideo/la-pasiva-pocitos-menu"],
    ["Mil Pizzas", "https://glovoapp.com/es/mtv/store/mil-pizzas-2/", "Mil Pizzas", "https://www.pedidosya.com.uy/restaurantes/montevideo/mil-pizzas-menu"],
    ["Espacio Gourmet", "https://glovoapp.com/es/mtv/store/espacio-gourmet/", "Espacio Gourmet", "https://www.pedidosya.com.uy/restaurantes/montevideo/espacio-gourmet-menu"],
    ["La Bottega", "https://glovoapp.com/es/mtv/store/la-bottega-/", "La Bottega", "https://www.pedidosya.com.uy/restaurantes/montevideo/la-bottega-menu"],
    ["Fans Pocitos", "https://glovoapp.com/es/mtv/store/fans-pocitos/", "Fans Pocitos", "https://www.pedidosya.com.uy/restaurantes/montevideo/fans-pocitos-menu"],
    ["Pizzabrossa", "https://glovoapp.com/es/mtv/store/pizzabrossa/", "Pizzabrossa", "https://www.pedidosya.com.uy/restaurantes/montevideo/pizzabrossa-menu"],
    ["Don Ciccio", "https://glovoapp.com/es/mtv/store/don-ciccio/", "Don Ciccio", "https://www.pedidosya.com.uy/restaurantes/montevideo/don-ciccio-menu"],
    ["Ararat", "https://glovoapp.com/es/mtv/store/ararat/", "Ararat", "https://www.pedidosya.com.uy/restaurantes/montevideo/ararat-menu"],
    ["@Bar", "https://glovoapp.com/es/mtv/store/arroba-bar/", "@Bar", "https://www.pedidosya.com.uy/restaurantes/montevideo/bar-menu"],
    ["Miyagi Sushi", "https://glovoapp.com/es/mtv/store/miyagi-sushi-2/", "Miyagi Sushi", "https://www.pedidosya.com.uy/restaurantes/montevideo/miyagi-sushi-menu"],
    ["Tomato Gourmet", "https://glovoapp.com/es/mtv/store/tomato-gourmet/", "Tomato Gourmet", "https://www.pedidosya.com.uy/restaurantes/montevideo/tomato-gourmet-menu"],
    ["Asian Food", "https://glovoapp.com/es/mtv/store/asian-food-2/", "Asian Food Mediodía", "https://www.pedidosya.com.uy/restaurantes/montevideo/asian-food-mediodia-menu"],
    ["Asian Food", "https://glovoapp.com/es/mtv/store/asian-food-2/", "Asian Food", "https://www.pedidosya.com.uy/restaurantes/montevideo/asian-food-menu"],
    ["Camelia", "https://glovoapp.com/es/mtv/store/camelia/", "Camelia", "https://www.pedidosya.com.uy/restaurantes/montevideo/camelia-menu"],
    ["Brandi Pizza", "https://glovoapp.com/es/mtv/store/brandi-pizza/", "Brandi Pizza", "https://www.pedidosya.com.uy/restaurantes/montevideo/brandi-pizza-menu"],
    ["Erevan", "https://glovoapp.com/es/mtv/store/erevan/", "Erevan", "https://www.pedidosya.com.uy/restaurantes/montevideo/erevan-menu"],
    ["Milamores", "https://glovoapp.com/es/mtv/store/milamores/", "Milamores Punta Carretas", "https://www.pedidosya.com.uy/restaurantes/montevideo/milamores-punta-carretas-menu"],
    ["Milamores", "https://glovoapp.com/es/mtv/store/milamores/", "Milamores Pocitos", "https://www.pedidosya.com.uy/restaurantes/montevideo/milamores-pocitos-menu"],
    ["Johnny Day's", "https://glovoapp.com/es/mtv/store/johnny-days/", "Johnny Day's", "https://www.pedidosya.com.uy/restaurantes/montevideo/johnny-days-menu"],
    ["Valerio", "https://glovoapp.com/es/mtv/store/valerio/", "Valerio", "https://www.pedidosya.com.uy/restaurantes/montevideo/valerio-menu"],
    ["Ten", "https://glovoapp.com/es/mtv/store/ten/", "Ten Placeres Sin Gluten - Celíacos", "https://www.pedidosya.com.uy/restaurantes/montevideo/ten-placeres-sin-gluten-celiacos-menu"]
];

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
                <h2 className="mod-panel-title">{this.props.title}</h2>
                <div class="uk-child-width-1-2@s uk-child-width-1-4@m uk-text-center" data-uk-grid>
                {
                    array.map((item, index) =>
                        <div key={index}>
                            <div class="uk-card uk-card-default uk-card-body">
                                <div><a href="/products">{item[0]}</a></div>
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
    title: PropTypes.array
};

export default Restaurants;
