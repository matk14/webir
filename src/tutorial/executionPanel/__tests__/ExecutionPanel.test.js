import React from "react";
import { render, fireEvent, waitForElement } from "react-testing-library";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ExecutionPanel from "../ExecutionPanel";
import AssistanceManager from "tutorial/AssistanceManager";
import clippy from "tutorial/clippyModule";
import steps_data from "./steps_data.json";
import tutorial_data from "./tutorial_data.json";


let tutoImage = '';
let area = '';
let imgUrlHover = '';
let imgUrlClick = '';
let imgUrlDrag = '';
let imgUrlTransition = '';
let imgUrlDrop = '';

test("Starting tutorial ", async () => {
  fetch.once(JSON.stringify(steps_data)).once(JSON.stringify(tutorial_data));
  const clippyAgent = await clippy.load();
  window.clippyAgent = clippyAgent;
  const { getByTestId } = render(
    <Router>
      <AssistanceManager>
        <ExecutionPanel />
      </AssistanceManager>
    </Router>
  );
  const startButton = await waitForElement(() => getByTestId("start-execute"));
  fireEvent.click(startButton);
  
  // Starting tutorial
  tutoImage = await waitForElement(() => getByTestId("execute-tutorial"));
  expect(tutoImage.src).toBe(
    "https://pis2018blobaccount.blob.core.windows.net/images/d2d4e986-591b-4957-817f-f2f671c8f63a"
  );
  area = await waitForElement(() => getByTestId("area"));
})

test("Open an Excel file ", async () => {
  // Microsoft Excel open file
  imgUrlHover = "https://pis2018blobaccount.blob.core.windows.net/images/e6a745af-d02b-4f11-92ab-f3002c94328d";
  imgUrlClick = "https://pis2018blobaccount.blob.core.windows.net/images/30c19406-a30e-4964-878c-690667dd9d33";
  hoverAndClick(area, tutoImage, imgUrlHover, imgUrlClick);

  // Select the file
  imgUrlHover = 'https://pis2018blobaccount.blob.core.windows.net/images/71a84ec2-6cfa-4ce4-997f-387260407f39';
  imgUrlClick = 'https://pis2018blobaccount.blob.core.windows.net/images/324dfa31-4037-4f7e-a5f0-183fb73510f2';
  hoverAndClick(area, tutoImage, imgUrlHover, imgUrlClick);

  // Open the selected file
  imgUrlHover = 'https://pis2018blobaccount.blob.core.windows.net/images/d18d5218-6c81-4eae-8ed7-3df98dbd85a6';
  imgUrlClick = 'https://pis2018blobaccount.blob.core.windows.net/images/d27aaa01-bbd0-4696-b80f-2292cda43a5d';
  hoverAndClick(area, tutoImage, imgUrlHover, imgUrlClick);
});

test("Join two tables ", async () => {
  // Drag and drop Orders table
  imgUrlHover = 'https://pis2018blobaccount.blob.core.windows.net/images/05026933-b244-4e15-88b0-859962488171'
  imgUrlDrag = 'https://pis2018blobaccount.blob.core.windows.net/images/cd63110a-0331-43ca-8a8e-9ab9abb76d7e';
  imgUrlTransition = "https://pis2018blobaccount.blob.core.windows.net/images/58d9d995-58db-492a-bc98-404f76043fb3";
  imgUrlDrop = "https://pis2018blobaccount.blob.core.windows.net/images/a6bb6027-63d4-4c86-8e90-79df457dfa40";
  hoverDragAndDrop(area, tutoImage, imgUrlHover, imgUrlDrag, imgUrlTransition, imgUrlDrop);
  
  // Drag and drop People table
  imgUrlHover = 'https://pis2018blobaccount.blob.core.windows.net/images/0cedc062-2e36-4d9b-905c-9cf3227fbedb'
  imgUrlDrag = "https://pis2018blobaccount.blob.core.windows.net/images/7a1663d3-f623-4777-8228-b35f35cb0766";
  imgUrlTransition = "https://pis2018blobaccount.blob.core.windows.net/images/3e758a46-0f44-45a0-8814-fe172414c0a6";
  imgUrlDrop = "https://pis2018blobaccount.blob.core.windows.net/images/2be9989c-a9d7-4c02-badf-ebab83bbcd86";
  hoverDragAndDrop(area, tutoImage, imgUrlHover, imgUrlDrag, imgUrlTransition, imgUrlDrop);

  // Select People
  imgUrlHover = "https://pis2018blobaccount.blob.core.windows.net/images/95b32692-c2ad-41c8-a7fc-a7fe3258a947";
  imgUrlClick = "https://pis2018blobaccount.blob.core.windows.net/images/10d4e571-455e-4b17-88b7-72b2796a41a9";
  hoverAndClick(area, tutoImage, imgUrlHover, imgUrlClick);

  // Remove People
  imgUrlHover = "https://pis2018blobaccount.blob.core.windows.net/images/3e04e830-c7ea-4fe8-8c99-efd8806dd4ef";
  imgUrlClick = "https://pis2018blobaccount.blob.core.windows.net/images/9fe1c720-041f-4682-aba7-d43cc0472a8f";
  hoverAndClick(area, tutoImage, imgUrlHover, imgUrlClick);
})

test("Add a new file", async () => {
  // Add button
  imgUrlHover = "https://pis2018blobaccount.blob.core.windows.net/images/e025b622-98a7-40bb-9226-3bdb7922989e";
  imgUrlClick = "https://pis2018blobaccount.blob.core.windows.net/images/239172b5-604f-4736-ad4f-fc5f5c376f00";
  hoverAndClick(area, tutoImage, imgUrlHover, imgUrlClick);

  // Add Text file
  imgUrlHover = "https://pis2018blobaccount.blob.core.windows.net/images/5d9d9320-c4c6-4f46-8eba-6a55395626be";
  imgUrlClick = "https://pis2018blobaccount.blob.core.windows.net/images/fc9ce892-ad41-4413-b5f5-9148a1974ef8";
  hoverAndClick(area, tutoImage, imgUrlHover, imgUrlClick);

  // Select "Global Superstore (...)"
  imgUrlHover = "https://pis2018blobaccount.blob.core.windows.net/images/7183aee3-9f49-4672-b2d1-19f4f9004aa6";
  imgUrlClick = "https://pis2018blobaccount.blob.core.windows.net/images/2c67589f-2a76-4e34-85b0-b8a95aa7c8fe";
  hoverAndClick(area, tutoImage, imgUrlHover, imgUrlClick);

  // Open file
  imgUrlHover = "https://pis2018blobaccount.blob.core.windows.net/images/78d8c701-031b-4fbd-9ac8-918beb6a34af";
  imgUrlClick = "https://pis2018blobaccount.blob.core.windows.net/images/9466cb56-9b53-4e04-af6c-33277ac545ac";
  hoverAndClick(area, tutoImage, imgUrlHover, imgUrlClick);

});

test("Playing with types", async () => {
  // Change type of row
  imgUrlHover = "https://pis2018blobaccount.blob.core.windows.net/images/7813e77c-b1b9-47d3-ba7d-b39b11e84e41";
  imgUrlClick = "https://pis2018blobaccount.blob.core.windows.net/images/d5311d96-dbb0-40eb-9dc0-e729948becba";
  hoverAndClick(area, tutoImage, imgUrlHover, imgUrlClick);

  // To String
  imgUrlHover = "https://pis2018blobaccount.blob.core.windows.net/images/d1482b5c-bf48-4151-a0a8-5357750fe705";
  imgUrlClick = "https://pis2018blobaccount.blob.core.windows.net/images/9b970161-d413-4717-b508-e14127bc07b1";
  hoverAndClick(area, tutoImage, imgUrlHover, imgUrlClick);

  // Select column Order ID
  imgUrlHover = "https://pis2018blobaccount.blob.core.windows.net/images/d0b2142b-245a-4bea-8fb3-2d6e0668dd59";
  imgUrlClick = "https://pis2018blobaccount.blob.core.windows.net/images/fe8b117a-452b-4dd2-b26c-599fa64e93e0";
  hoverAndClick(area, tutoImage, imgUrlHover, imgUrlClick);
  
  // Custom split
  imgUrlHover = "https://pis2018blobaccount.blob.core.windows.net/images/6321d673-7944-4e46-a690-19fff54bc86a";
  imgUrlClick = "https://pis2018blobaccount.blob.core.windows.net/images/14c1c433-f17a-40e2-807d-bcd72511a820";
  hoverAndClick(area, tutoImage, imgUrlHover, imgUrlClick);
  
  // OK
  imgUrlHover = "https://pis2018blobaccount.blob.core.windows.net/images/48d0df3c-ae27-4e3c-b932-2a406479a843";
  imgUrlClick = "https://pis2018blobaccount.blob.core.windows.net/images/135582c0-393b-4fa7-884a-62cbed4a5e66";
  hoverAndClick(area, tutoImage, imgUrlHover, imgUrlClick);

});

const hoverAndClick = (area, tutoImage, imgUrlHover, imgUrlClick) => {
    fireEvent.mouseOver(area);
    expect(tutoImage.src).toBe(
        imgUrlHover
    );
    fireEvent.click(area);
    expect(tutoImage.src).toBe(
        imgUrlClick
    );
}

const hoverDragAndDrop = (area, tutoImage, imgUrlHover, imgUrlDrag, imgUrlTransition, imgUrlDrop) => {
    fireEvent.mouseOver(area);
    expect(tutoImage.src).toBe(
        imgUrlHover
    );
    fireEvent.mouseDown(area);
    expect(tutoImage.src).toBe(
        imgUrlDrag
    );
    fireEvent.mouseOver(area);
    expect(tutoImage.src).toBe(
        imgUrlTransition
    );
    fireEvent.mouseUp(area);
    expect(tutoImage.src).toBe(
        imgUrlDrop
    );
}