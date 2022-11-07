import { languageList, useTranslation } from '@@packages/localization';
import { useEffect, useState } from 'react';

// Need to call getSystemInfo only once
let globalInfo = { language: 'vi' };
export const useSystemInfo = () => {
  const [info, setInfo] = useState(globalInfo);
  //   useEffect(() => {
  //     if (!globalInfo && typeof __NEZHA_BRIDGE__ !== 'undefined') {
  //       _bridgeUtils.getSystemInfo().then((value) => {
  //         globalInfo = value;
  //         setInfo(value);
  //       });
  //     }
  //   }, []);
  return info;
};

const code2Lang = languageList.reduce((prev, next) => {
  // eslint-disable-next-line no-param-reassign
  prev[next.code.toLowerCase()] = next;
  return prev;
}, {});

const useInjectLocales = () => {
  const [injected, setInjected] = useState(false);
  const systemInfo = useSystemInfo();
  const { setLanguage } = useTranslation();
  useEffect(() => {
    const main = async () => {
      if (systemInfo) {
        const { language } = systemInfo;
        const currLanguage = code2Lang[language.toLowerCase()];

        if (currLanguage) {
          console.log({ currLanguage });
          setLanguage(currLanguage);
        }
        setInjected(true);
      }
    };
    main();
  }, [systemInfo, setLanguage]);
  return { injected };
};

export default useInjectLocales;
