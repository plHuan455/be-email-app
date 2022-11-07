import React from "react";

const useSize = () => {
  const [width, setWidth] = React.useState(0);
  const root = React.useMemo(
    () => document.getElementById("root") as HTMLDivElement,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [document.getElementById("root")]
  );

  React.useEffect(() => {
    const rz = new ResizeObserver(() => setWidth(root.clientWidth));
    rz.observe(root);

    return () => rz.disconnect();
  }, [root]);

  return width;
};

export default useSize;
