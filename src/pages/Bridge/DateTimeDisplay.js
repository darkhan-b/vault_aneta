import React from 'react';

const DateTimeDisplay = ({ value,  isDanger }) => {
  return (
    <div className={isDanger ? 'countdown danger' : 'countdown'}>
      <p>{value}</p>

    </div>
  );
};

export default DateTimeDisplay;
