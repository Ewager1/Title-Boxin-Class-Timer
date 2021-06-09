import React, { useState } from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import TimerContext from "./store/timer-context";
import { IntervalTimer } from "./pages/IntervalTimer";
import { Homepage } from "./pages/Homepage";

function App() {
  const [userChoice, setUserChoice] = useState({
    totalRounds: 8,
    currentRound: 1,
    warmUpTime: 7,
    activeRestTime: 1,
    glovesOnOffTime: 1,
    roundTime: 3,
    coreTime: 7,
  });

  const [isTrainingMode, setIsTrainingMode] = useState(false);

  const updateUserChoice = (userChoice) => {
    setIsTrainingMode(false);
    setUserChoice(userChoice);
  };

  return (
    <>
      <TimerContext.Provider
        value={{
          userChoice,
          isTrainingMode,
          updateUserChoice: updateUserChoice,
          updateTrainingMode: setIsTrainingMode,
        }}
      >
        <HashRouter>
          <Switch>
            <Route path="/timer">
              <IntervalTimer />
            </Route>
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
        </HashRouter>
      </TimerContext.Provider>
    </>
  );
}

export default App;
