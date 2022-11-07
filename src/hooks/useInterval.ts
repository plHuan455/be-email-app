import React from 'react';

const useInterval = (callback: () => void, delay: number) => {
  React.useEffect(() => {
    if (delay) {
      const id = setInterval(callback, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [callback, delay]);
};

export default useInterval;
