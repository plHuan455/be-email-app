import { RefObject, useEffect, useState } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null; // Tham chiếu đến một element sẽ làm root
  rootMargin?: string; // Khoảng cách giữa root và ref element
  threshold?: number | number[]; // Một mảng các ngưỡng (0 - 1) để xác định khi nào ref element sẽ hiển thị trên màn hình
};

const useIntersectionObserver = (
  ref: RefObject<Element>,
  callback?: () => void,
  options?: IntersectionObserverOptions
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // if (entry.boundingClientRect.y < -100) {
      //   setIsIntersecting(true);
      // } else {
      //   setIsIntersecting(false);
      // }
      setIsIntersecting(entry.isIntersecting);
      if(entry.isIntersecting && callback) {
        callback();
      } 
    }, options);
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
}

export default useIntersectionObserver;