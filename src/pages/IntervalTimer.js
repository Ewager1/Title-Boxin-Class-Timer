import React, { useState, useEffect, useContext } from "react";

import { TimerHeader } from "../components/Timer/TimerHeader";
import { TimerBody } from "../components/Timer/TimerBody";
import { TimerFooter } from "../components/Timer/TimerFooter";

import TimerContext from "../store/timer-context";

export const IntervalTimer = () => {
  // holds all the data used to decide how many rounds, time of each round, etc.
  const ctx = useContext(TimerContext);

  //holds current round. used to trigger useEffect for next round
  const [classSegment, setClassSegment] = useState("Warmup");

  // made setInterval clearable globally
  const [intervalId, setIntervalId] = useState();

  //holds current time state
  const [timer, setTimer] = useState({
    displayedTime: ctx.isTrainingMode
      ? "3:00"
      : `${ctx.userChoice.warmUpTime}:00`,
    minutes: 0,
    seconds: 0,
    maxRoundTime: 7,
  });
  // pause state
  const [isPaused, setIsPaused] = useState(false);


  useEffect(() => {
    //Training mode has its own logic function
    if (ctx.isTrainingMode) {
      switch (classSegment) {
        case "Warmup":
          setClassSegment("Continuous Rounds");
          break;
        case "Continuous Rounds":
          setTimer((prevState) => ({
            ...prevState,
            maxRoundTime: 3,
          }));

          countdown(3, 0);
          break;
        case `Continuous Active Rest`:
          setTimer((prevState) => ({
            ...prevState,
            maxRoundTime: 1,
          }));
          countdown(1, 0);
          break;
        default:
      }
    } else {
      //regular class timers (not training mode)
      switch (classSegment) {
        case "Warmup":
          setTimer((prevState) => ({
            ...prevState,
            maxRoundTime: ctx.userChoice.warmUpTime,
          }));
          countdown(ctx.userChoice.warmUpTime, 0);

          break;
        case "Gloves On":
          setTimer((prevState) => ({
            ...prevState,
            maxRoundTime: ctx.userChoice.glovesOnOffTime,
          }));
          countdown(ctx.userChoice.glovesOnOffTime, 0);

          break;
        case `Round ${ctx.userChoice.currentRound}`:
          setTimer((prevState) => ({
            ...prevState,
            maxRoundTime: ctx.userChoice.roundTime,
          }));
          countdown(ctx.userChoice.roundTime, 0);

          break;
        case "Active Rest":
          setTimer((prevState) => ({
            ...prevState,
            maxRoundTime: ctx.userChoice.activeRestTime,
          }));
          countdown(ctx.userChoice.activeRestTime, 0);

          break;
        case "Gloves Off":
          setTimer((prevState) => ({
            ...prevState,
            maxRoundTime: ctx.userChoice.glovesOnOffTime,
          }));
          countdown(ctx.userChoice.glovesOnOffTime, 0);

          break;
        case "Core":
          setTimer((prevState) => ({
            ...prevState,
            maxRoundTime: ctx.userChoice.coreTime,
          }));
          countdown(ctx.userChoice.coreTime, 0);

          break;
        default:
      }
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [classSegment ]);


  //inputs minutes and seconds and outputs a timer in conjunction with state
  const countdown = (numOfMinutes, numOfSeconds) => {
    let minutes = numOfMinutes;
    let seconds = numOfSeconds;

    const interval = setInterval(() => {
      let digit = seconds < 10 ? "0" : "";

      setTimer((prevState) => ({
        ...prevState,
        minutes: minutes,
        seconds: seconds,
        displayedTime: `${minutes}:${digit}${seconds}`,
      }));

      seconds--;

      if (minutes === 0 && seconds < 0) {
        clearInterval(interval);
        ctx.isTrainingMode ? handleTrainingMode() : handleClassSegment();
      }

      if (minutes > 0 && seconds < 0) {
        minutes--;
        seconds = 59;
      }
    }, 1000);
    setIntervalId(interval);
  };

  //handles natural logic flow
  const handleClassSegment = () => {
    switch (classSegment) {
      case "Warmup":
        setClassSegment("Gloves On");
        break;
      case "Gloves On":
        setClassSegment(`Round ${ctx.userChoice.currentRound}`);
        break;
      case `Round ${ctx.userChoice.currentRound}`:
        if (ctx.userChoice.currentRound === ctx.userChoice.totalRounds) {
          setClassSegment("Gloves Off");
        } else {
          ctx.setuserChoice({
            ...ctx.userChoice,
            currentRound: (ctx.userChoice.currentRound += 1),
          });
          setClassSegment("Active Rest");
        }
        break;
      case "Active Rest":
        setClassSegment(`Round ${ctx.userChoice.currentRound}`);

        break;
      case "Gloves Off":
        setClassSegment("Core");
        break;
      case "Core":
        console.log("class done, this will reroute to home page ");
        break;
      default:
    }
  };

  const handleTrainingMode = () => {
    switch (classSegment) {
      case "Warmup":
        setClassSegment("Continuous Rounds");
        break;
      case "Continuous Rounds":
        setClassSegment("Continuous Active Rest");
        break;
      case "Continuous Active Rest":
        setClassSegment("Continuous Rounds");
        break;
      default:
    }
  };

  const pause = () => {
    clearInterval(intervalId);
    setIsPaused(true);
  };

  const play = () => {
    countdown(timer.minutes, timer.seconds);
    setIsPaused(false);
  };

  const rewind = () => {
    let addedMinute = timer.minutes + 1;
    let addedSeconds = timer.seconds + 15 - 60;
    let digit = timer.seconds < 10 ? "0" : "";

  
    clearInterval(intervalId);
  
    if(timer.minutes === timer.maxRoundTime && timer.seconds === 0 && isPaused){
      //break statement fix later 
    }
    //stops rewind from going over rounds maximum time
    else if (timer.minutes === timer.maxRoundTime) {
      countdown(timer.minutes, timer.seconds);
      if (isPaused) {
        setTimer((prevState) => ({
          ...prevState,
          minutes: timer.minutes,
          seconds: timer.seconds,
          displayedTime: `${timer.minutes}:${digit}${timer.seconds}`,
        }));
      } 
    }
    //stop rewind from going over rounds maximum time
    else if (timer.minutes + 1 === timer.maxRoundTime && timer.seconds > 45) {
      if (isPaused) {
        setTimer((prevState) => ({
          ...prevState,
          minutes: timer.maxRoundTime,
          seconds: 0,
          displayedTime: `${timer.maxRoundTime}:00`,
        }));
      } else {
        countdown(timer.maxRoundTime, 0);
      }
    }
    else if (timer.minutes <= 1 && timer.seconds <= 1){
     //break, stopping user from pausing at 0. Fix cleaner later 
    }
    // go up a minute if 15 seconds pushes over 60
    else if (timer.seconds > 45) {
      if (isPaused) {
        setTimer((prevState) => ({
          ...prevState,
          minutes: addedMinute,
          seconds: addedSeconds,
          displayedTime: `${addedMinute}:${addedSeconds < 10 ? "0" : ''}${addedSeconds}`,
        }));
      } else {
        countdown(addedMinute, addedSeconds);
      }
    }
    // go up a minute with no added seconds at 45
    else if (timer.seconds === 45) {
      if (isPaused) {
        setTimer((prevState) => ({
          ...prevState,
          minutes: addedMinute,
          seconds: 0,
          displayedTime: `${addedMinute}:00`,
        }));
      } else {
        countdown(addedMinute, 0);
      }
    }
    // else add 15 seconds
    else {
      if (isPaused) {
        
        setTimer((prevState) => ({
          ...prevState,
          minutes: timer.minutes,
          seconds: timer.seconds + 15,
          displayedTime: `${timer.minutes}:${timer.seconds + 15 < 10 ? "0" : ''}${timer.seconds +15 }`,
        }));
      } else {
        countdown(timer.minutes, timer.seconds + 15);
      }
    }
  };


  return (
    <>
      <TimerHeader handleClearInterval={() => clearInterval} />
      <TimerBody
        displayedTime={timer.displayedTime}
        play={play}
        pause={pause}
        isPaused={isPaused}
        rewind={rewind}
      />
      <TimerFooter classSegment={classSegment} />
    </>
  );
};
