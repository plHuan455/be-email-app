import React, { RefObject, useCallback, useEffect, useRef } from "react";

interface UseScrollInfinityProps {
  scrollContainer: HTMLElement | null,
  enabled: boolean,
  thresholdTop?: number,
  onScrollTop?: (e: HTMLElement) => void,
  onScroll?: (e: HTMLElement) => void,
}

const useScrollInfinity = ({
  scrollContainer,
  enabled = true,
  thresholdTop = 100,
  onScrollTop,
  onScroll,
}: UseScrollInfinityProps) => {
  const preContainerScroll = useRef<{height: number, top: number}>();
  const scrollTimeOut = useRef<NodeJS.Timeout>();


  useEffect(() => {
    const scrollEventFuc = () => {
      if(!scrollContainer) return;
      preContainerScroll.current = {
        height: scrollContainer.scrollHeight,
        top: scrollContainer.scrollTop,
      };
      onScroll && onScroll(scrollContainer);

      if(enabled && scrollContainer.scrollTop - thresholdTop <= 0) {
        if(scrollTimeOut.current){
          clearTimeout(scrollTimeOut.current);
        }
        onScrollTop && onScrollTop(scrollContainer);
      }
    }

    if(enabled) {
      scrollTimeOut.current = setTimeout(() =>  scrollEventFuc(), 200)
    }

    if(scrollContainer) {
      scrollContainer.addEventListener('scroll', scrollEventFuc);
    }

    return () => {
      scrollContainer?.removeEventListener('scroll', scrollEventFuc);
      if(scrollTimeOut.current) clearTimeout(scrollTimeOut.current);
    };
  }, [scrollContainer, enabled]);

  const scrollToPrePosition = () => {
    if (scrollContainer && preContainerScroll.current !== undefined) {
      scrollContainer.scrollTop =
        scrollContainer.scrollHeight - preContainerScroll.current.height + preContainerScroll.current.top;
    }
  }

  return {scrollToPrePosition}
}

export default useScrollInfinity;