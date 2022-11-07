import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-web';
import { default as loadingJSON } from './loading-spinner.json';
import classNames from 'classnames';
export interface LoadingProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: GlobalTailWindClassName | string;
  isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ size, className, isLoading }) => {
  const sizeRender = React.useMemo(() => {
    switch (size) {
      case 'xs':
        return 60;
      case 'sm':
        return 70;
      case 'md':
        return 80;
      case 'lg':
        return 120;
      default:
        return 120;
    }
  }, [size]);

  useEffect(() => {
    if (document.getElementById('lottie')) {
      Lottie.loadAnimation({
        container: document.getElementById('lottie') as HTMLElement, // Required
        animationData: loadingJSON, // Required
        renderer: 'svg', // Required
        loop: true, // Optional
        autoplay: true, // Optional
        name: 'loading', // Name for future reference. Optional.
      });
    }
  }, [isLoading]);
  if (isLoading)
    return (
      <div
        className={classNames('flex justify-center items-center', className)}
        style={{ height: sizeRender }}>
        <div id="lottie" className="h-full"></div>
      </div>
    );

  return null;
};

export default Loading;
