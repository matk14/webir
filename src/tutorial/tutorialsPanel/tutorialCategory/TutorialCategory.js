import React, { Component } from "react";
import TutorialElement from "../tutorialElement/TutorialElement";
import TutorialSubCategory from "./subCategory/TutorialSubCategory";
import PropTypes from "prop-types";
import "./TutorialCategory.less";


class TutorialCategory extends Component {

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
                    <a className="uk-accordion-title">{this.props.categoryName}</a>
                    <div className="uk-accordion-content tm-category-content">
                        {
                        this.props.tutorialList.map(tutorialItem => {
                            const className = this.props.tutorialSelected === tutorialItem.tutorialID ? 'tm-selected-tutorial' : '';
                            return <TutorialElement key={tutorialItem.tutorialID} tutorial={tutorialItem} handleClickTutorial={this.handleClickTutorial} className={className} />;
                        })
                        }
                        <div className="tm-tutorial-subcategory">
                                {
                                this.props.subcategories && this.props.subcategories.length > 0 ?
                                <ul data-uk-accordion="collapsible: false, showfirst: true">
                                    {
                                        this.props.subcategories.map(subcategoryItem => subcategoryItem.tutorials.length > 0 && <TutorialSubCategory tutorialList={subcategoryItem.tutorials} categoryName={subcategoryItem.name} subcategories={[]} key={subcategoryItem.id} handleSelectedTutorial={this.handleClickTutorial} tutorialSelected={this.props.tutorialSelected}/>)
                                    }
                                </ul>
                                : <div></div>
                                }
                        </div>
                    </div>
                </li>
        );
    }

}

TutorialCategory.propTypes = {
    tutorialList: PropTypes.array, categoryName: PropTypes.string,
    subcategories: PropTypes.array, tutorialSelected: PropTypes.number,
    handleSelectedTutorial: PropTypes.func
};

export default TutorialCategory;
