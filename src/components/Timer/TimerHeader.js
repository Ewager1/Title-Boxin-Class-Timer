import React from "react";
import { Link } from "react-router-dom";

import { Wrapper } from "../UI/Wrapper";
import { Button } from "../UI/Button";
import { CurrentTime } from '../CurrentTime/CurrentTime'



import "./TimerHeader.scss";

export const TimerHeader = (props) => {

  
  return (
    <header className="timer-header">
      <Wrapper className="header-wrapper">
        {" "}
        <CurrentTime /> 
        <Link to="/">
          <Button onClick={()=> props.handleClearInterval()} className="x-btn">X</Button>
        </Link>
      </Wrapper>
    </header>
  );
};
