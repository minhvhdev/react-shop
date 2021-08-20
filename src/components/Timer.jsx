import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Timer(props) {
  const seconds = props.seconds;
  const handleTimeOut = props.timeOut;
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (!timeLeft) {
      handleTimeOut();
      return;
    }
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [handleTimeOut,timeLeft]);

  return <span>{timeLeft}</span>;
}

Timer.propTypes = {
  seconds: PropTypes.number.isRequired,
  timeOut: PropTypes.func,
};

export default Timer;
