import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import { useCountdown } from './useCountdown';

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Expired moment</span>

    </div>
  );
};

const ShowCounter = ({ hours, minutes, seconds }) => {
  return (
    <div className="show-counter">
   <a
       
        className="countdown-link"
      >
          
Within 0 Days&nbsp;<span/><DateTimeDisplay value={hours}  isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={minutes}  isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={seconds}  isDanger={false} />
</a>
    </div>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter

        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;
