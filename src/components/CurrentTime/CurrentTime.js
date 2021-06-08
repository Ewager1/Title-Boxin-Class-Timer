import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

import './CurrentTime.scss'

//returns an updated time of hours and minutes every 10 seconds
export const CurrentTime = () => {
  const [time, setTime] = useState(dayjs().format("h:mm A"));

  useEffect(() => {
    setInterval(() => {
      setTime(dayjs().format("h:mm A"));
    }, 1000);
  }, []);

  return <h2 className="clock">{time}</h2>;
};
