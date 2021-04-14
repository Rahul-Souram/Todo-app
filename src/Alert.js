import React, { useEffect } from "react";

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 2000);
    //cleanup
    return () => clearTimeout(timeout);
  }, [list]);
  return <h4 className={`${type}`}>{msg}</h4>;
};

export default Alert;
