import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ExecuteTutorial from "./executeTutorial/ExecuteTutorial";
import Score from "./hud/Score";
import Controls from "./timerAndControls/controls/Controls";
import Timer from "./timerAndControls/Timer";
import clippy from "../clippyModule";
import InstructionHolder from "./../InstructionHolder";

const difficultyLevels = ["Basic", "Intermediate", "Advanced"];
const API = "https://backpis.azurewebsites.net/api/tutorials";

class ExecutionPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      data: null,
      tutorial: null,
      tutorialEnded: false,
      score: 0,
      currentInstruction: null,
      showInstruction: false
    };
    this.isPlaying = this.isPlaying.bind(this);
    this.tutorialEnded = this.tutorialEnded.bind(this);
    this.started = this.started.bind(this);
    this.handleTutorialClose = this.handleTutorialClose.bind(this);
    this.getScore = this.getScore.bind(this);
    this.setCurrentInstruction = this.setCurrentInstruction.bind(this);
    this.showCurrentInstruction = this.showCurrentInstruction.bind(this);
    this.hideCurrentInstruction = this.hideCurrentInstruction.bind(this);
  }

  componentDidMount() {
    fetch(API + "/" + this.props.match.params.id + "/state")
      .then(response => response.json())
      .then(responseJason => {
        this.setState({ data: responseJason });
      })
      .then(
        fetch(API + "/" + this.props.match.params.id)
          .then(response => response.json())
          .then(responseTutorial =>
            this.setState({
              tutorial: responseTutorial
            })
          )
      );
  }

  isPlaying(ok) {
    this.props.updateTimeout(this.state.isPlaying, ok);
    this.setState({ isPlaying: ok });
  }

  tutorialEnded(ok) {
    clippy.animateOnTutorialEnd();
    this.setState({ tutorialEnded: ok });
  }

  getScore(score) {
    this.setState({ score: score });
  }

  started(ok) {
    this.props.updateTimeout(this.state.isPlaying, ok);
    this.setState({ isPlaying: ok });
    clippy.moveToTopOnCountdownEnd();
    this.showCurrentInstruction();
  }

  handleTutorialClose() {
    this.props.stopHintTimeout();
    this.hideCurrentInstruction();
    clippy.animateOnTutorialClose();
    if (this.props.previewMode) {
      this.props.closeModal();
    } else {
      this.props.history.push("/tutorial");
    }
  }

  setCurrentInstruction(instruction) {
    if (instruction && instruction.value && instruction.value !== "") {
      this.setState({
        currentInstruction: instruction.value
      });
    } else {
      this.setState({
        currentInstruction: "",
        showInstruction: false
      });
    }
  }

  showCurrentInstruction() {
    this.setState({
      showInstruction: true
    });
  }

  hideCurrentInstruction() {
    this.setState({ showInstruction: false });
  }

  render() {
    let classExpand = [
      "uk-panel tm-excecute-tutorial",
      this.state.isPlaying ? "tm-excecute-tutorial-expand" : ""
    ];

    return (
      <div
        id="id-execute"
        data-testid="id-execute"
        className={classExpand.join(" ").trim()}
      >
        {this.props.previewMode &&
          this.props.closeButton(this.handleTutorialClose)}
        {this.state.data && this.state.tutorial ?
          <div className="tm-execute-container uk-flex uk-flex-center uk-flex-middle">
            <div className="tm-hud uk-flex uk-flex-middle uk-flex-between">
              <h2>{this.state.tutorial.name}</h2>
              <Timer
                isPlaying={this.state.isPlaying}
                tutorialEnded={this.state.tutorialEnded}
              />
              <Score
                score={this.state.score}
                isPlaying={this.state.isPlaying}
              />
            </div>
            <div className="tm-instructor-holder">
              {this.state.isPlaying &&
                this.state.currentInstruction &&
                this.state.currentInstruction !== "" &&
                  <InstructionHolder
                    isPLaying={this.state.isPlaying}
                    instruction={this.state.currentInstruction}
                    hide={
                      !this.state.showInstruction ||
                      !this.state.currentInstruction
                    }
                  />
                }
            </div>

            <ExecuteTutorial
              started={this.started}
              data={this.state.data}
              first={this.state.tutorial.firstStep}
              last={this.state.tutorial.finalStep}
              objective={this.state.tutorial.description}
              getScore={this.getScore}
              difficulty={difficultyLevels[this.state.tutorial.difficulty]}
              duration={this.state.tutorial.duration}
              score={parseInt(this.state.tutorial.score, 10)}
              startHintTimeout={this.props.startHintTimeout}
              stopHintTimeout={this.props.stopHintTimeout}
              setCurrentAssistance={this.props.setCurrentAssistance}
              getCurrentAssistance={this.props.getCurrentAssistance}
              setCurrentInstruction={this.setCurrentInstruction}
              tutorialEnded={this.tutorialEnded}
            />

            <div className="tm-panel-control uk-flex uk-flex-center uk-flex-middle">
              <Controls
                isPlaying={this.isPlaying}
                onClose={this.handleTutorialClose}
              />
            </div>
          </div>
         :
          <div />
        }
      </div>
    );
  }
}

export default withRouter(ExecutionPanel);
