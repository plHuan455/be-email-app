import { RefObject, useCallback, useEffect } from "react";

interface UseScrollInfinityProps {
  enabled?: boolean;
  isScrollBottom?: boolean;
  scrollContainerRef: RefObject<Element>;
  threshold?: number; // sai so (px)
  onScrollToLimit: () => void;
}

const useScrollInfinity = ({
  isScrollBottom = false, 
  scrollContainerRef,
  threshold = 80,
  onScrollToLimit,
  enabled = true,
}: UseScrollInfinityProps) => {
  
  const handleScroll = (e: Event) => {
    if(!enabled) return;
    const container = e.target as HTMLElement;
    if(isScrollBottom) {
      if(container.scrollTop + container.clientHeight + threshold >= container.scrollHeight) {
        onScrollToLimit();
      }
      return;
    }

    if(container.scrollTop - threshold <=  0) {
      onScrollToLimit();
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current;
    if(container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [scrollContainerRef])
}

export default useScrollInfinity;