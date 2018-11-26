import React from "react";
import PropTypes from "prop-types";
import "./InstructionHolder.less";

const InstructionHolder = ({ instruction, hide, isPLaying }) =>
  <div className={`tm-instruction-holder ${hide && !isPLaying ? "uk-hidden" : "tm-show-holder"}`}>
    <p>
      <span>
        <strong>CURRENT INSTRUCTION: </strong>
        {instruction}
      </span>
    </p>
  </div>;

InstructionHolder.propTypes = {
  instruction: PropTypes.string,
  isPLaying: PropTypes.bool
};

export default InstructionHolder;
