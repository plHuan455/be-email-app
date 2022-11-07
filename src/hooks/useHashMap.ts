import React from 'react';

const useHashMap = <T>(
  value: T[],
): [[T[], Map<T, T>], React.Dispatch<React.SetStateAction<T[]>>] => {
  const [rawData, setRawData] = React.useState(value);
  const [hashData, setHashData] = React.useState<Map<T, T>>(new Map());

  React.useEffect(() => {
    if (!rawData) return;
    rawData.forEach((data) => {
      hashData.set(data, data);
    });

    setHashData(new Map(hashData));
  }, [rawData.length]);

  return [[rawData, hashData], setRawData];
};

export default useHashMap;
