import { useState, useEffect } from 'react';
import { useDefault } from '../../contexts/DefaultContext';

export default function Countdown() {
  const { t } = useDefault()
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
  }, []);//numara orele, minutele si secundele pana cand se reseteaza produsul zilei

  return (
    <div className="countdown-timer">
      {t('Main.Se resetează în')}:
      <div className="countdown-timer-item">
        {countdown.hours < 10 ? `0${countdown.hours}` : countdown.hours }:
        {countdown.minutes < 10 ? `0${countdown.minutes}` : countdown.minutes }:
        {countdown.seconds < 10 ? `0${countdown.seconds}` : countdown.seconds }
      </div>
    </div>
  );
}