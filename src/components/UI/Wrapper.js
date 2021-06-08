import React from "react";

import './Wrapper.scss'

//Simple Flex Wrapper 

export const Wrapper = (props) => {
  return (
    <div className={`wrapper ${props.className}`}>{props.children}</div>
  );
};
