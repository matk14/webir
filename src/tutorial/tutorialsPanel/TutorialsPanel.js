import React, { Component } from "react";
import PropTypes from "prop-types";
import "./TutorialsPanel.less";
import TutorialCategory from "./tutorialCategory/TutorialCategory";

const API = "https://backpis.azurewebsites.net/api/tutorialCategories/published";

class TutorialsPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tutorialSelected: null,
            categories: null
        };
    }

    componentDidMount() {
        fetch(API)
        .then(response => response.json())
        .then(categories => this.setState({ categories }));
    }

    render() {

        return (
            <div className="uk-panel tm-tutorial-panel">
                <h2>Tutorials</h2>
                <div>
                <ul data-uk-accordion="collapsible: false, showfirst: false">

                    {
                        this.state.categories ?
                        this.state.categories.map((categoryItem, index) =>
                        (categoryItem.tutorials.length > 0 || categoryItem.subCategories.length) > 0 && <TutorialCategory tutorialList={categoryItem.tutorials} categoryName={categoryItem.name} subcategories={categoryItem.subCategories} key={index} tutorialSelected={this.state.tutorialSelected}/>
                        )
                        : <p>No hay cateogrias</p>
                    }
                    </ul>
                </div>
            </div>
        );
    }
}

TutorialsPanel.propTypes = {
    categoriesList: PropTypes.array
};

export default TutorialsPanel;
