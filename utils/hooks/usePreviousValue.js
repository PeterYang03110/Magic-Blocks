import { useEffect, useRef } from 'react';

const usePreviousValue = value => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export default usePreviousValue;
