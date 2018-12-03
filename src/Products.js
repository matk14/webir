import React, { Component } from "react";
import PropTypes from "prop-types";

let array = [
    ["Sándwich de jamón", "99", "99"],
    ["Sándwich olímpico", "170", "190"],
    ["Ensalada de tomate", "136", "136"],
    ["Ravioles con estofado", "426", "450"],
    ["Chivito canadiense al plato", "529", "490"],
    ["Sorrentinos a la carusso", "431", "430"],
    ["Pizza común", "84", "85"],
    ["Ensalada La Pasiva", "402", "395"],
    ["Ravioles a la bolognesa", "271", "320"],
    ["Ensalada de lechuga y tomate", "136", "150"],
    ["Chivito canadiense con papas fritas", "399", "389"],
    ["Sándwich de jamón y tomate", "114", "115"],
    ["Húngara porteña", "159", "145"],
    ["Ensalada rusa", "165", "155"]
];

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loaded: true
            });
        }, 3000);
    }

    render() {

        return (
            <div className="uk-panel uk-container tm-block-top-a">
                <h2 className="mod-panel-title">Productos recomendados</h2>
                {
                this.state.loaded ?
                        <div className="uk-child-width-1-2@s uk-child-width-1-4@m uk-text-center uk-grid-match" data-uk-scrollspy="target: > div; cls:uk-animation-slide-right; delay: 250" data-uk-grid>
                        {
                            array.map((item, index) =>
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
    title: PropTypes.string
};

export default Products;
