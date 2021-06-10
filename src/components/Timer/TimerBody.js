import React from "react";
import { Wrapper } from "../UI/Wrapper";

import rewindIcon from "../../assets/rewind.png";

import "./TimerBody.scss";

//take the props object and the setObject. replace let currentRound with props object current round, and ++.
// in the countDown function, if num of rounds === input of rounds, go to gloves off

export const TimerBody = (props) => {
  return (
    <main>
      <Wrapper className="itBody">
        <h1
          className={props.isPaused ? "glow" : ""}
          onClick={props.isPaused ? () => props.play() : () => props.pause()}
        >
          {props.displayedTime}
        </h1>
        <button className="emptyBtn" onClick={() => props.rewind()}>
          {" "}
          <img src={rewindIcon} alt="Button that rewinds timer 15 seconds" />
        </button>
      </Wrapper>
    </main>
  );
};
