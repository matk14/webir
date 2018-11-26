import React from "react";
import Proptypes from "prop-types";
import "./ExecuteTutorial.less";
import CountDown from "./countDown/CountDown";
import clippy from "../../clippyModule";
import ReactSVG from "react-svg";
import { DEFAULT_EXTRA_SCORE } from "../../constants";

const stateObjective = "objective";
const stateExecuting = "executing";
const stateEnd = "end";

const actionClick = "click";
const actionHover = "hover";
const actionDrag = "drag";
const actionDrop = "drop";

const actionEvent = ["click", "hover", "drag", "drop"];

class ExecuteTutorial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      img: null,
      slug: null,
      lastAction: null,
      lastId: null,
      nextImg: [],
      xDragRender: 0,
      yDragRender: 0,
      imgWidth: 0,
      imgHeight: 0,
      renderWidth: 0,
      renderHeight: 0,
      count: false,
      score: 0,
      state: stateObjective,
      end: null,
      animation: null,
      showCurrentAnimation: false,
      events: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.handleCountStarted = this.handleCountStarted.bind(this);
    this.handleFinishCountDown = this.handleFinishCountDown.bind(this);
    this.handleOnMouseUp = this.handleOnMouseUp.bind(this);
    this.handleOnDragStart = this.handleOnDragStart.bind(this);
    this.setMousePosition = this.setMousePosition.bind(this);
    this.updateScore = this.updateScore.bind(this);
  }

  handleCountStarted() {
    this.setState({ count: false });
  }

  handleFinishCountDown() {
    this.props.started(true);
    this.setState({
      renderHeight: document.getElementById("execute-tutorial").clientHeight,
      renderWidth: document.getElementById("execute-tutorial").clientWidth
    });
  }

  showCountDown() {
    this.setState({ count: true });
  }

  handleOnDragStart() {
    return false;
  }

  updateScore() {
    let newScore = this.state.score + this.props.score;

    const assistance = this.props.getCurrentAssistance();
    if (assistance && !assistance.taken) {
      newScore += assistance.score || DEFAULT_EXTRA_SCORE;
    }

    return newScore;
  }

  handleOnClick(index) {
    let nextEvent = this.state.events[index];
    if (
      this.state.state !== stateObjective &&
      actionEvent[nextEvent.type] === actionClick
    ) {
      let newId = nextEvent.nextStep;
      let newState = this.state.state;
      let nextImg = [];

      let dataIndex = this.props.data.find(element => element.stepID === newId);
      let events = [];
      if (newId === this.props.last) {
        newState = stateEnd;
        this.props.tutorialEnded(true);
      } else {
        dataIndex.events.map(event => nextImg.push(this.props.data.find(element => element.stepID === event.nextStep).image.source));
        events = dataIndex.events;
      }
      const newScore = this.updateScore();

      this.setState({
        id: newId,
        lastId: this.state.id,
        lastAction: actionEvent[nextEvent.type],
        img: dataIndex.image.source,
        imgHeight: dataIndex.image.heigth,
        imgWidth: dataIndex.image.width,
        slug: dataIndex.image.slug,
        state: newState,
        events: events,
        animation: dataIndex.animation.value,
        score: newScore,
        nextImg: nextImg,
        showCurrentAnimation: false
      });

       const assistance = {
        timeout: dataIndex.timeout,
        hint: dataIndex.assistance.value,
        taken: false,
        score: dataIndex.score
      };
      this.props.setCurrentAssistance(assistance);
      this.props.setCurrentInstruction(dataIndex.text);
      this.props.startHintTimeout();

      this.props.getScore(newScore);
    }
  }

  handleClick() {
    if (this.state.state === stateObjective) {
      this.setState({
        state: stateExecuting,
        count: true
      });
      this.showCountDown();
    }
  }

  handleOnMouseUpDrag(index) {
    let nextEvent = this.state.events[index];
    if (actionEvent[nextEvent.type] === actionDrop) {
      let newId = nextEvent.nextStep;
      let newState = this.state.state;
      let nextImg = [];

      let dataIndex = this.props.data.find(element => element.stepID === newId);
      let events = [];
      if (newId === this.props.last) {
        newState = stateEnd;
        this.props.tutorialEnded(true);
      } else {
        dataIndex.events.map(event => nextImg.push(this.props.data.find(element => element.stepID === event.nextStep).image.source));
        events = dataIndex.events;
      }

      const newScore = this.updateScore();
      this.setState({
        id: newId,
        lastId: this.state.id,
        lastAction: actionEvent[nextEvent.type],
        img: dataIndex.image.source,
        nextImg: nextImg,
        imgHeight: dataIndex.image.heigth,
        imgWidth: dataIndex.image.width,
        animation: dataIndex.animation.value,
        slug: dataIndex.image.slug,
        state: newState,
        score: newScore,
        events: events,
        showCurrentAnimation: false
      });

      const assistance = {
        timeout: dataIndex.timeout,
        hint: dataIndex.assistance.value,
        taken: false,
        score: dataIndex.score
      };
      this.props.setCurrentAssistance(assistance);
      this.props.setCurrentInstruction(dataIndex.text);
      this.props.startHintTimeout();

      this.props.getScore(newScore);

      document.removeEventListener("mousemove", this.setMousePosition);
      if (document.getElementById("draggable-image")) {
        document.getElementById("draggable-image").remove();
      }
    }
  }

  setMousePosition(event) {
    var img = document.getElementById("draggable-image");
    var extraSpace = 0;
    if (document.getElementsByClassName("uk-offcanvas-container")[0]) {
      extraSpace = 375;
    }
    let spaceX = window.innerWidth - this.state.renderWidth;
    let spaceY = window.innerHeight - this.state.renderHeight;
    let yMinRender = event.clientY - this.state.yDragRender - spaceY / 2 - 10;
    let xMinRender = event.clientX - this.state.xDragRender - extraSpace / 2 - spaceX / 2 - 20;
    img.style.top = yMinRender + "px";
    img.style.left = xMinRender + "px";
  }

  handleOnMouseUp() {
    if (this.state.lastAction === actionDrag) {
      let newId = this.state.lastId;
      let newState = this.state.state;
      let nextImg = [];
      var last = this.state.lastAction;

      let dataIndex = this.props.data.find(element => element.stepID === newId);
      let origenData = dataIndex.events.find(element => element.nextStep === this.state.id);
      let origenStep = origenData.originStep;

      let dataOrigen = this.props.data.find(element => element.stepID === origenStep);
      let lastAction = dataOrigen.events.find(element => element.nextStep === this.state.lastId);
      if (lastAction && actionEvent[lastAction.type] === actionHover) {
        last = actionEvent[lastAction.type];
        newId = dataOrigen.stepID;
        dataIndex = this.props.data.find(element => element.stepID === newId);
      }

      let events = [];
      if (newId === this.props.last) {
        newState = stateEnd;
        this.props.tutorialEnded(true);
      } else {
        dataIndex.events.map(event => nextImg.push(this.props.data.find(element => element.stepID === event.nextStep).image.source));
        events = dataIndex.events;
      }

      this.setState({
        id: newId,
        lastId: dataIndex.originStep,
        lastAction: last,
        img: dataIndex.image.source,
        nextImg: nextImg,
        animation: dataIndex.animation.value,
        imgHeight: dataIndex.image.heigth,
        imgWidth: dataIndex.image.width,
        slug: dataIndex.image.slug,
        state: newState,
        events: events,
        showCurrentAnimation: false
      });

      document.removeEventListener("mousemove", this.setMousePosition);
      document.removeEventListener("mouseup", this.handleOnMouseUp);
      if (document.getElementById("draggable-image")) {
        document.getElementById("draggable-image").remove();
      }
    }
  }

  handleOnMouseDown(event) {
    let nextEvent = this.state.events[event];
    if (actionEvent[nextEvent.type] !== actionClick) {
      if (actionEvent[nextEvent.type] === actionDrag) {
        let xMinRender = this.state.renderWidth * nextEvent.region.minimumX / this.state.imgWidth;
        let yMinRender = this.state.renderHeight * nextEvent.region.minimumY / this.state.imgHeight;
        let xMaxRender = this.state.renderWidth * nextEvent.region.maximumX / this.state.imgWidth;
        let yMaxRender = this.state.renderHeight * nextEvent.region.maximumY / this.state.imgHeight;

        var img = document.createElement("IMG");
        img.src = this.state.img;
        img.style.position = "absolute";
        img.style.width = this.state.renderWidth + "px";
        img.style.height = this.state.renderHeight + "px";
        img.style.clip = "rect(" + yMinRender + "px " + xMaxRender + "px " + yMaxRender + "px " + xMinRender + "px)";
        img.style.top = 0 + "px";
        img.style.left = 0 + "px";
        img.setAttribute("id", "draggable-image");
        img.setAttribute("draggable", "false");
        document.getElementById("tutorial-container").appendChild(img);

        this.setState({
          yDragRender: yMinRender,
          xDragRender: xMinRender
        });

        document.addEventListener("mousemove", this.setMousePosition);
        document.addEventListener("mouseup", this.handleOnMouseUp);

        document.getElementById("draggable-image").ondragstart = function () {
          return false;
        };

        document.getElementById("area").ondragstart = function () {
          return false;
        };

        let newId = nextEvent.nextStep;
        let dataIndex = this.props.data.find(
          element => element.stepID === newId
        );

        var nextImg = [];
        dataIndex.events.map(event => nextImg.push(this.props.data.find(element => element.stepID === event.nextStep).image.source));

        this.setState({
          id: newId,
          lastAction: actionEvent[nextEvent.type],
          lastId: this.state.id,
          nextImg: nextImg,
          img: dataIndex.image.source,
          animation: dataIndex.animation.value,
          imgHeight: dataIndex.image.heigth,
          imgWidth: dataIndex.image.width,
          slug: dataIndex.image.slug,
          yDragRender: yMinRender,
          xDragRender: xMinRender,
          events: dataIndex.events,
          showCurrentAnimation: false
        });
      }
    }
  }

  handleMouseOver(index) {
    let nextEvent = this.state.events[index];
    if (actionEvent[nextEvent.type] === actionHover) {
      let newId = nextEvent.nextStep;

      let dataIndex = this.props.data.find(element => element.stepID === newId);
      var nextImg = [];
      dataIndex.events.map(event => nextImg.push(this.props.data.find(element => element.stepID === event.nextStep).image.source));

      this.setState({
        id: newId,
        lastId: this.state.id,
        lastAction: actionEvent[nextEvent.type],
        img: dataIndex.image.source,
        imgHeight: dataIndex.image.heigth,
        imgWidth: dataIndex.image.width,
        slug: dataIndex.image.slug,
        animation: dataIndex.animation.value,
        events: dataIndex.events,
        nextImg: nextImg,
        showCurrentAnimation: false
      });
    }
  }

  handleMouseOut() {
    if (this.state.lastAction === actionHover) {
      let newId = this.state.lastId;
      let dataIndex = this.props.data.find(element => element.stepID === newId);
      let originDrag = dataIndex.events[0].originStep;
      let originStep = this.state.id;

      if (originDrag) {
        let dataDrag = actionEvent[this.props.data.find(
          element => element.stepID === originDrag
        ).events[0].type];
        if (dataDrag === actionDrag) {
          newId = this.props.data.find(element => element.stepID === originDrag)
            .events[0].nextStep;
          dataIndex = this.props.data.find(element => element.stepID === newId);
          originStep = dataIndex.events[0].originStep;
        }
      }

      var nextImg = [];
      dataIndex.events.map(event => nextImg.push(this.props.data.find(element => element.stepID === event.nextStep).image.source));

      this.setState({
        id: newId,
        lastId: originStep,
        nextImg: nextImg,
        img: dataIndex.image.source,
        imgHeight: dataIndex.image.heigth,
        imgWidth: dataIndex.image.width,
        animation: dataIndex.animation.value,
        slug: dataIndex.image.slug,
        lastAction: actionEvent[this.props.data.find(element => element.stepID === originStep).events[0].type],
        events: dataIndex.events,
        showCurrentAnimation: false
      });
    }
  }

  updateDimensions(event) {
    const element = document.getElementById("execute-tutorial");
    if (event.target.id === "id-page" && element) {
      this.setState(
        {
          renderHeight: document.getElementById("execute-tutorial")
            .clientHeight,
          renderWidth: document.getElementById("execute-tutorial").clientWidth
        }
      );
    }
  }

  componentDidMount() {
    let nextImg = [];
    let newId = this.props.first;
    let dataIndex = this.props.data.find(element => element.stepID === newId);
    dataIndex.events.map(event => nextImg.push(this.props.data.find(element => element.stepID === event.nextStep).image.source));

    this.setState({
      id: newId,
      lastId: newId,
      img: dataIndex.image.source,
      slug: dataIndex.image.slug,
      imgHeight: dataIndex.image.heigth,
      imgWidth: dataIndex.image.width,
      animation: dataIndex.animation.value,
      nextImg: nextImg,
      events: dataIndex.events,
      end: this.props.last,
      showCurrentAnimation: false
    });

    const assistance = {
      timeout: dataIndex.timeout,
      hint: dataIndex.assistance.value,
      taken: false,
      score: dataIndex.score
    };
    this.props.setCurrentAssistance(assistance);
    this.props.setCurrentInstruction(dataIndex.text);

    const element = document.getElementById("id-page");
    if (element) {
      element.addEventListener(
        "webkitTransitionEnd",
        this.updateDimensions,
        false
      );
      element.addEventListener("transitionend", this.updateDimensions, false);
      element.addEventListener("otransitionend", this.updateDimensions, false);
    }
    clippy.showOnTutorialStart();
    clippy.addClickListener(() => {
      const assistance = this.props.getCurrentAssistance();
      if (assistance.hint && assistance.hint !== "") {
        this.props.setCurrentAssistance(
          {
            timeout: assistance.timeout,
            hint: assistance.hint,
            score: assistance.score,
            taken: Boolean(assistance.hint) // si no hay pista, taken deberia permanecer
            // en false (para no restarle puntos)
          }
        );
        this.setState({ showCurrentAnimation: true });
        this.props.stopHintTimeout();
        return assistance.hint;
      }
      return null;
    });
  }

  render() {
    let classObjective = [
      "tm-objective",
      this.state.state === stateObjective ? "" : "uk-hidden"
    ];

    let classTutorial = [
      "tm-tutorial",
      this.state.state === stateObjective ? "tm-hidden" : ""
    ];

    let classImage = [
      "tm-image",
      this.state.state === stateObjective ? "uk-hidden" : ""
    ];

    let classFinish = [
      "tm-finish",
      this.state.state === stateEnd ? "" : "uk-hidden"
    ];

    let mapName = [this.state.state === stateEnd ? "" : "mapExecute"];

    return (
      <div className={classTutorial.join(" ").trim()}>
        <div
          id="tutorial-objective"
          data-testid="tutorial-objective"
          className={classObjective.join(" ").trim()}
        >
          <h2>Tutorial Information</h2>
          <p><strong>OBJECTIVE: </strong>{this.props.objective}</p>
          <p><strong>DIFFICULTY:</strong> {this.props.difficulty}</p>
          <p><strong>DURATION:</strong> {this.props.duration}</p>
          <p className="tm-link">
            <a onClick={this.handleClick} className="tm-button uk-button" data-testid="start-execute">
              Start
            </a>
          </p>
        </div>

        <CountDown
          count={this.state.count}
          handleCountStarted={this.handleCountStarted}
          handleFinishCountDown={this.handleFinishCountDown}
          state={this.state.state}
        />

        <div
          id="tutorial-container"
          draggable="false"
          className={classImage.join(" ").trim()}
        >
          <img
            id="execute-tutorial"
            data-testid="execute-tutorial"
            draggable="false"
            src={this.state.img}
            alt={this.state.slug}
            useMap="#mapExecute"
          />
          {
            this.state.nextImg.map((img, index) =>
              <img key={index} src={img} alt="" className="uk-hidden" />
            )
          }
          <map name={mapName.join(" ").trim()}>
            {
              this.state.events ?
              this.state.events.map((subevent, index) =>
                <React.Fragment key={index}>
                  <area
                    id="area"
                    data-testid="area"
                    key={index}
                    shape="rect"
                    onClick={this.handleOnClick.bind(this, index)}
                    onMouseOut={this.handleMouseOut}
                    onMouseOver={this.handleMouseOver.bind(this, index)}
                    onMouseDown={this.handleOnMouseDown.bind(this, index)}
                    onMouseUp={this.handleOnMouseUpDrag.bind(this, index)}
                    coords={[
                      this.state.renderWidth * subevent.region.minimumX / this.state.imgWidth,
                      this.state.renderHeight * subevent.region.minimumY / this.state.imgHeight,
                      this.state.renderWidth * subevent.region.maximumX / this.state.imgWidth,
                      this.state.renderHeight * subevent.region.maximumY / this.state.imgHeight
                    ]
                      .join(",")
                      .trim()}
                    alt=""
                  />

                {this.state.animation && this.state.animation !== "" && this.state.animation.split("|||")[0].trim() !== ".svg" && this.state.showCurrentAnimation && <div key={"matkf"} className="tm-step-animation"
                  style={{
                    position: "absolute",
                    left: this.state.renderWidth * subevent.region.minimumX / this.state.imgWidth + "px",
                    top: this.state.renderHeight * subevent.region.minimumY / this.state.imgHeight + "px",
                    height: this.state.renderHeight * subevent.region.maximumY / this.state.imgHeight - this.state.renderHeight * subevent.region.minimumY / this.state.imgHeight + "px",
                    width: this.state.renderWidth * subevent.region.maximumX / this.state.imgWidth - this.state.renderWidth * subevent.region.minimumX / this.state.imgWidth + "px"
                  }}>

                  <ReactSVG
                      src={"/assets/icons/" + this.state.animation.split("|||")[0].trim()}
                      className={this.state.animation.split("|||")[1]}
                      svgClassName="tm-svg"
                  />

                 </div>
                }
                </React.Fragment>
              )
                : <area data-testid="area" alt="" shape="rect" coords={[0, 0, 0, 0]} />
            }
          </map>
        </div>

        <div className={classFinish.join(" ").trim()}>
          <h2>Congratulations!</h2>
          <h3>
            Your score is: <span>{this.state.score}</span>
          </h3>
        </div>
      </div>
    );
  }
}

ExecuteTutorial.proptypes = {
  data: Proptypes.array,
  first: Proptypes.number,
  last: Proptypes.number,
  objective: Proptypes.string,
  duration: Proptypes.string,
  difficulty: Proptypes.string,
  started: Proptypes.func,
  getScore: Proptypes.func,
  score: Proptypes.number,
  tutorialEnded: Proptypes.func
};

export default ExecuteTutorial;
