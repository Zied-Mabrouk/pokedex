import React, { useEffect, useState } from 'react';

const Loader = () => {
  const [numberOfDots, setNumberOfDots] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setNumberOfDots((prev) => (prev % 3) + 1);
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex w-full justify-center flex-col items-center">
      <img className="w-44" src="./loader.gif" alt="Loading..." />
      <span className="text-4xl w-44 font-aero uppercase">
        Loading
        {Array.from({ length: numberOfDots }).fill('.').join('')}
      </span>
    </div>
  );
};

export default Loader;
