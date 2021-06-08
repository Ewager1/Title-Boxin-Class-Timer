import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../components/UI/Button";
import { Wrapper } from "../components/UI/Wrapper";
import TimerContext from "../store/timer-context";

import {
  fourRounds30Min,
  eightRounds45Min,
  eightRounds60Min,
  twelveRounds75Min,
} from "../data/presetRounds.js";

import "./Homepage.scss";


export const Homepage = () => {
  const ctx = useContext(TimerContext);

  let history = useHistory();

// user chooses a preset round
  const pickRounds = (roundChoice) => {
    ctx.updateUserChoice(roundChoice);
    history.push("./timer");

  }

//user chooses training mode
  const pickTrainingMode = () => {
    ctx.updateTrainingMode(true)
      history.push("./timer")
    
  };

  return (
    <main className="homepage">
        <h1>Choose a Class to Start</h1>
      <Wrapper className="flexWrapper">
        <Button
          className={"homePageBtn"}
          onClick={() => pickRounds(fourRounds30Min)}
        >
          4 Rounds
          <div>
            <small>30 Mins</small>
          </div>{" "}
        </Button>

        <Button
          className={"homePageBtn"}
          onClick={() => pickRounds(eightRounds45Min)}
        >
          8 Rounds
          <div>
            <small>45 Mins</small>
          </div>
        </Button>

        <Button
          className={"homePageBtn"}
          onClick={() => pickRounds(eightRounds60Min)}
        >
          8 Rounds
          <div>
            <small>60 Mins</small>
          </div>
        </Button>

        <Button
          className={"homePageBtn"}
          onClick={() => pickRounds(twelveRounds75Min)}
        >
          12 Rounds{" "}
          <div>
            {" "}
            <small>75 Mins</small>
          </div>
        </Button>

        <Button
          className={"homePageBtn"}
          onClick={() => pickTrainingMode()
          }
        >
          Training Mode <small>Continuous </small>
        </Button>
      </Wrapper>
    </main>
  );
};
