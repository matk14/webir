import React, { Component } from "react";
import TutorialElement from "../../tutorialElement/TutorialElement";
import PropTypes from "prop-types";
import "../TutorialCategory.less";


class TutorialSubCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleClickTutorial = this.handleClickTutorial.bind(this);
    }

    handleClickTutorial (name) {
        this.props.handleSelectedTutorial(name);
    }

    render() {
        return (
                <li>
                    {
                    this.props.tutorialList.length > 0 ?
                    <a className="uk-accordion-title">{this.props.categoryName}</a>
                    :
                    <div/>
                    }
                    <div className="uk-accordion-content tm-category-content">
                        {
                        this.props.tutorialList.length > 0 ?
                        this.props.tutorialList.map(tutorialItem => {
                            const className = this.props.tutorialSelected === tutorialItem.tutorialID ? 'tm-selected-tutorial' : '';
                            return <TutorialElement key={tutorialItem.tutorialID} tutorial={tutorialItem} handleClickTutorial={this.handleClickTutorial} className={className} />;
                        })
                        : <div/>
                        }
                    </div>
                </li>
        );
    }

}

TutorialSubCategory.propTypes = {
    tutorialList: PropTypes.array, categoryName: PropTypes.string,
    subcategories: PropTypes.array, tutorialSelected: PropTypes.number,
    handleSelectedTutorial: PropTypes.func
};

export default TutorialSubCategory;
