import * as React from 'react';
import Box from '@mui/material/Box';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';

export interface InnerHeaderTabsType {
  id: number;
  value: string;
  path: string;
}

interface Props {
  tabs: InnerHeaderTabsType[];
  typeOpenTabLink?: 'continue' | 'replace';
}

const InnerLayoutHeaderTabs: React.FC<Props> = ({
  tabs,
  typeOpenTabLink = 'continue',
}) => {
  const [tabsList, setTabsList] = React.useState<InnerHeaderTabsType[]>(tabs);

  // useLocation
  const location = useLocation();

  // useEffect
  React.useEffect(() => {
    if (typeOpenTabLink === 'continue') return;
    else {
      const convertTabs = tabs.map((tab) => {
        const pathToArr = `${location.pathname}${tab.path}`.split('/');

        pathToArr.splice(-2, 1);

        const newPath = pathToArr.join('/');

        console.log(newPath);

        return { ...tab, path: newPath };
      });
      setTabsList(convertTabs);
    }
  }, [tabs, location]);

  return (
    <Box className="flex-1">
      <Box className="flex gap-2 justify-end">
        {tabsList.map((tab) => (
          <NavLink to={tab.path}>
            {({ isActive }) => (
              <Button
                className={`${
                  isActive ? 'bg-[#494490]' : 'bg-[#464950]'
                } hover:bg-[#494490]`}>
                {tab.value}
              </Button>
            )}
          </NavLink>
        ))}
      </Box>
    </Box>
  );
};

export default InnerLayoutHeaderTabs;
