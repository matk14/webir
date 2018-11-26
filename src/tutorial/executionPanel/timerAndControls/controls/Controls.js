import React from "react";
import Popup from "reactjs-popup";
import PropTypes from "prop-types";

class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNotPlaying: false
    };
    this.handlePlay = this.handlePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  handlePlay() {
    this.setState({
      isNotPlaying: !this.state.isNotPlaying
    });

    this.props.isPlaying(this.state.isNotPlaying);
  }

  handleStop() {
    if (!this.state.isNotPlaying) {
      this.setState({
        isNotPlaying: !this.state.isNotPlaying
      });
      this.props.isPlaying(this.state.isNotPlaying);
    }
  }

  render() {
    let classControl = [
      "tm-control",
      this.state.isNotPlaying ? "fas fa-play-circle" : "fas fa-pause-circle"
    ];

    return (
      <div className="tm-controls">
        <a onClick={this.handlePlay}>
          <i className={classControl.join(" ").trim()} />
        </a>

        <Popup
          closeOnDocumentClick={false}
          closeOnEscape={false}
          trigger={open =>
            <a>
              <i
                onClick={this.handleStop}
                className="tm-control fas fa-times-circle"
              />
            </a>
          }
          modal
        >
          {close =>
            <div className="tm-modal">
              <a
                className="tm-close"
                onClick={() => {
                  close();
                  this.handlePlay();
                }}
              >
                &times;
              </a>
              <div className="tm-header">
                Are you sure you want to exit the tutorial?
              </div>
              <div className="tm-actions uk-flex uk-flex-center">
                <a
                  className="uk-button tm-button"
                  onClick={() => {
                    this.props.onClose();
                  }}
                >
                  Yes
                </a>

                <a
                  className="uk-button tm-button"
                  onClick={() => {
                    close();
                    this.handlePlay();
                  }}
                >
                  No
                </a>
              </div>
            </div>
          }
        </Popup>
      </div>
    );
  }
}

Controls.propTypes = {
  isPlaying: PropTypes.func
};

export default Controls;
