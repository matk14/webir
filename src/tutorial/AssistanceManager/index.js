import React, { Component } from "react";
import clippy from "../clippyModule";
import { DEFAULT_TIMEOUT } from "../constants";

export default class AssistanceManager extends Component {
  constructor(props) {
    super(props);
    this.currentTimeoutID = null;
    this.currentAssistance = null;
    this.startHintTimeout = this.startHintTimeout.bind(this);
    this.stopHintTimeout = this.stopHintTimeout.bind(this);
    this.setCurrentAssistance = this.setCurrentAssistance.bind(this);
    this.getCurrentAssistance = this.getCurrentAssistance.bind(this);
    this.updateTimeout = this.updateTimeout.bind(this);
  }

  startHintTimeout() {
    this.stopHintTimeout(); // stop previous timeout
    const { currentAssistance } = this;
    if (
      currentAssistance &&
      currentAssistance.hint &&
      !currentAssistance.taken
    ) {
      const timeout = currentAssistance.timeout
        ? currentAssistance.timeout * 1000
        : DEFAULT_TIMEOUT;
      const timeOutID = setTimeout(() => clippy.showHintSuggestion(), timeout);
      this.currentTimeoutID = timeOutID;
    }
  }

  stopHintTimeout() {
    const { currentTimeoutID } = this;
    if (currentTimeoutID) {
      clearTimeout(currentTimeoutID);
    }
  }

  setCurrentAssistance(assistance) {
    this.currentAssistance = assistance;
  }

  getCurrentAssistance() {
    return this.currentAssistance;
  }

  updateTimeout(prevState, currState) {
    // si hubo un cambio de estado
    if (prevState !== currState) {
      // si se reanudo el tutorial
      if (currState) {
        this.startHintTimeout();
        // si se pauso el tutorial
      } else {
        this.stopHintTimeout();
      }
    }
  }

  render() {
    const child = React.Children.only(this.props.children);
    const childWithProps = React.cloneElement(child, {
      startHintTimeout: this.startHintTimeout,
      stopHintTimeout: this.stopHintTimeout,
      setCurrentAssistance: this.setCurrentAssistance,
      getCurrentAssistance: this.getCurrentAssistance,
      updateTimeout: this.updateTimeout
    });
    return childWithProps;
  }
}
