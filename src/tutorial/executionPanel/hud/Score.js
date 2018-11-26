import React, { Component } from "react";
import PropTypes from "prop-types";

class Score extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return <h2 className={this.props.isPlaying ? 'tm-score' : 'uk-hidden'}>Score: {this.props.score}</h2>;
  }
}

Score.propTypes = {
  isPlaying: PropTypes.bool,
  score: PropTypes.number
};

export default Score;
