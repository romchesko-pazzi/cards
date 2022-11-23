import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const defaultDelay = 750;

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || defaultDelay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
