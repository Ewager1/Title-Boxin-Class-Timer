import React from "react";
import { Wrapper } from "../UI/Wrapper";

import logo from "../../assets/titleLogo.png";

import './TimerFooter.scss'

export const TimerFooter = (props) => {
  return (
    <footer>
      <Wrapper className='timerFooter'>
        <h2>{props.classSegment}</h2> 
      </Wrapper>
    </footer>
  );
};
