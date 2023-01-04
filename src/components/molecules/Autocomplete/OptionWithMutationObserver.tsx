import React, { PropsWithChildren, useId } from "react";


interface OptionWithMutationObserverProps extends PropsWithChildren {
  mutationCallback: MutationCallback;
  config?: MutationObserverInit
}

const OptionWithMutationObserver: React.FC<OptionWithMutationObserverProps> = ({
  mutationCallback,
  config,
  children
}) => {
  const id = useId();
  const ref = React.useRef<any>(null);
  const observer = new MutationObserver(mutationCallback);

  React.useEffect(() => {
    if (ref.current) {
      observer.disconnect();
      observer.observe(ref.current, config);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref.current]);

  const NewChildRen = React.cloneElement(children as any, { ref, key: id });

  return NewChildRen;
};


export default OptionWithMutationObserver