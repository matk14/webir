import $ from 'jquery'; // eslint-disable-line id-length
import clippy from "clippyjs";
import { hintSuggestions } from "./constants";

const showOnTutorialStart = () => {
  // se vuelve a hacer el load de clippy para evitar un bug
  // que tiene la libreria al ocultarlo y volver a mostrarlo
  clippy.load("Clippy", agent => {
    window.clippyAgent = agent;
    window.clippyAgent.show();
    const clippyHeight = 93;
    const popupHeight = document.getElementById("tutorial-objective")
      .clientHeight;
    const marginTopPopup = (window.innerHeight - popupHeight) / 2;
    const mediumBlock = 325;
    const smallBlock = (window.innerWidth - mediumBlock * 3) / 2;
    const offset = 15;
    window.clippyAgent.moveTo(
      smallBlock + mediumBlock * 2 - clippyHeight + offset,
      marginTopPopup + popupHeight - clippyHeight + offset
    );
    window.clippyAgent.play("CheckingSomething");
  });
};

const moveToTopOnCountdownEnd = () => {
  const clippy = window.clippyAgent;
  clippy.stopCurrent();
  clippy.moveTo(window.innerWidth - 140, window.innerHeight - 120);
  clippy.speak("Good luck!");
  clippy.play("GetTechy");
};

const animateOnTutorialClose = () => {
  animateAndHide("GoodBye");
};

const animateOnTutorialEnd = () => {
  animateAndHide("Processing");
};

const animateAndHide = action => {
  const clippy = window.clippyAgent;
  clippy.stopCurrent();
  setTimeout(
    // eslint-disable-next-line no-undefined
    () => clippy.play(action, undefined, () => clippy.hide()),
    1000
  );
};

const addClickListener = getHint => {
  // eslint-disable-next-line no-underscore-dangle
  $(window.clippyAgent._el).click(() => {
    const hint = getHint();
    if (hint) {
      window.clippyAgent.speak(hint);
    }
  });
};

const showHintSuggestion = () => {
  window.clippyAgent.speak(getRandomSuggestion());
};

const getRandomSuggestion = () =>
  hintSuggestions[Math.floor(Math.random() * hintSuggestions.length)];

const load = () => new Promise(resolve => {
  clippy.load("Clippy", agent => resolve(agent));
});

export default {
  addClickListener,
  showOnTutorialStart,
  moveToTopOnCountdownEnd,
  animateOnTutorialClose,
  showHintSuggestion,
  animateOnTutorialEnd,
  load
};
