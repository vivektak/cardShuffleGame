/* eslint-disable react/prop-types */
/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';

const Controls = (props) => {
  const { shuffle, reset } = props;

  return (
    <div className="text-left ml-5 mt-5">
      <button type="button" className="btn btn-primary" onClick={shuffle}>Play/Shuffle</button>
      <button type="button" className="btn btn-primary m-2" onClick={reset}>Reset high score</button>
    </div>
  );
};

export default Controls;
