import { useCallback, useState } from 'react';

export type TabItem = { name: any; id: number };

const useHandleChangeTab = (tabList: Array<TabItem>) => {
  const [tabSelect, setTabSelect] = useState(tabList[0].id);

  const handleOnChangeTab = useCallback(
    (tab: number) => {
      setTabSelect(tab);
    },
    [tabSelect],
  );

  return [tabSelect, handleOnChangeTab] as [number, (tab: number) => void];
};

export default useHandleChangeTab;
