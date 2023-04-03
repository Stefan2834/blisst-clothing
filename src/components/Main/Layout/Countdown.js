import { useState, useEffect } from 'react';

export default function Countdown() {
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const hours = 24 - now.getHours() - 1;
      const minutes = 60 - now.getMinutes() - 1;
      const seconds = 60 - now.getSeconds();
      setCountdown({hours, minutes, seconds});
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="countdown-timer">
      Se reseteaza in:
      <div className="countdown-timer-item">
        {countdown.hours < 10 ? `0${countdown.hours}` : countdown.hours }:
        {countdown.minutes < 10 ? `0${countdown.minutes}` : countdown.minutes }:
        {countdown.seconds < 10 ? `0${countdown.seconds}` : countdown.seconds }
      </div>
    </div>
  );
}