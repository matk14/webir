import React from "react";
import PropTypes from "prop-types";


class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsElapsed: 0,
      running: false,
      finish: false,
    };
    this.incrementer = null;
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handlePauseClick = this.handlePauseClick.bind(this);

  }

  getMinutes() {
    return ('0' + Math.floor(this.state.secondsElapsed / 60) % 60).slice(-2);
  }

  getSeconds() {
    return ('0' + this.state.secondsElapsed % 60).slice(-2);
  }

  getHours() {
    return ('0' + Math.floor(this.state.secondsElapsed / 3600)).slice(-2);
  }

  handleStartClick() {
    this.incrementer = setInterval(() => this.setState({
        secondsElapsed: this.state.secondsElapsed + 1
      })
    , 1000);
  }

  handlePauseClick() {
    clearInterval(this.incrementer);
  }

  componentDidUpdate() {
    if (!this.state.finish && this.props.tutorialEnded) {
      this.setState({
        finish: true
      });
      this.handlePauseClick();
    } else if (this.props.isPlaying && !this.state.running && !this.props.tutorialEnded) {
      this.setState({
        running: true
      });
      this.handleStartClick();

    } else if (this.state.running && !this.props.isPlaying && !this.props.tutorialEnded) {
      this.setState({
        running: false
      });
      this.handlePauseClick();
    }
  }

  render() {

    return (
      <h2 className={this.state.running ? 'tm-timer' : 'uk-hidden'}>{this.getHours()}:{this.getMinutes()}:{this.getSeconds()}</h2>
    );
  }
}

Timer.propTypes = {
  isPlaying: PropTypes.bool,
  tutorialEnded: PropTypes.bool
};

export default Timer;
