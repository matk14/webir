import React, { Component } from "react";
import PropTypes from "prop-types";
import "./TutorialElement.less";

class TutorialElement extends Component {
  constructor(props) {
    super(props);
    this.handleSelected = this.handleSelected.bind(this);
  }

  handleSelected() {
    this.props.handleClickTutorial(this.props.tutorial.tutorialID);
  }

  render() {
    let classElement = ["tm-element", this.props.className];

    return (
      <p className="tm-tutorial">
        <a
          className={classElement.join(" ").trim()}
          href={`/tutorial/${this.props.tutorial.tutorialID}`}
        >
          {this.props.tutorial.name}
        </a>
      </p>
    );
  }
}

TutorialElement.propTypes = {
  tutorial: PropTypes.object,
  className: PropTypes.string,
  handleClickTutorial: PropTypes.func
};

export default TutorialElement;
