import React from 'react';

import './Button.scss'

export const Button = (props) => {
  return (
    <button
      className={`button ${props.className}`} //allows adding classes as props
      type={props.type || 'button'} //allows submit button option
      onClick={props.onClick} //adds onClick 
      value={props.value}
      ref={props.ref}
    >
      {props.children}
    </button>
  );
};

