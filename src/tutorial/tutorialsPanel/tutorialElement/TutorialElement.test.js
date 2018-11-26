import React from "react";
import {render, getByText} from 'react-testing-library'
import TutorialElement from "./TutorialElement"

const tutorial = {
    name: 'Tutorial test',
    tutorialID: 12
}

const setup = () => {
    const {getByText} = render (<TutorialElement tutorial={tutorial} className=""/>)
    return getByText;
}

test("Tutorial name expected from TutorialElement", () => {
    
    const getbytext = setup();
    const elem = getbytext("Tutorial test");
    expect(elem.tagName.toLowerCase() === 'a').toBe(true);

}) 
