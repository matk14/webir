import PropTypes from "prop-types";
import React from "react";
import "./CountDown.less";

const stateExecuting = 'executing';

class CountDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secondsElapsed: 3,
            countDown: true
        };
    }

    componentDidUpdate() {
        if (this.props.count) {
            this.incrementer = setInterval(() =>
                this.setState({
                    secondsElapsed: this.state.secondsElapsed - 1
                },
                    this.props.handleCountStarted())
                , 1000);
        }
        if (this.state.secondsElapsed <= 0) {
          this.props.handleFinishCountDown();
          clearInterval(this.incrementer);
          this.setState({ secondsElapsed: 3, countDown: false });
        }
    }

    render() {
        return (
            <div>
                {this.state.secondsElapsed > 0 && this.props.state === stateExecuting && this.state.countDown ?
                    <div className="tm-countdown" >
                        <h2>
                            {this.state.secondsElapsed}
                        </h2>
                    </div>
                    : <div></div>
                }
            </div>
        );
    }
}

CountDown.propTypes = {
  count: PropTypes.bool,
  handleCountStarted: PropTypes.func,
  handleFinishCountDown: PropTypes.func,
  state: PropTypes.any
};

export default CountDown;
