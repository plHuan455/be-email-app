import Email from '@components/organisms/Email';
import EmailsListActionsContainer from '@containers/EmailsListActionsContainer';
import { Box } from '@mui/material';
import { useAppSelector } from '@redux/configureStore';
import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useEmailCompose from '../../zustand/useEmailCompose';

const EmailContainer = () => {
  const isCompose = useEmailCompose((state) => state.isCompose);
  const containerRef = useRef<HTMLDivElement>(null);
  const preContainerScrollHeight = useRef<number>();
  const { EmailsList } = useAppSelector((state) => state.email);
  const [pageParams, setPageParams] = useState<{page: number; limit: number}>({page: 1, limit: 3});

  useEffect(() => {
    const container = containerRef.current;
    if(container && preContainerScrollHeight.current !== undefined) {
      container.scrollTop = container.scrollHeight - preContainerScrollHeight.current;
    }
  }, [pageParams])

  useEffect(()=>{
    const container = containerRef.current;
    if(container) {
      container.scrollTop = container.scrollHeight;
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }

  }, [containerRef, EmailsList])

  function handleScroll (e: Event) {
    const container = e.target as HTMLDivElement;
    if (container.scrollTop === 0) {
      preContainerScrollHeight.current = container.scrollHeight;
      setPageParams(preState => ({...preState, page: preState.page + 1}));
    }
  }
  return (
    // <Box
    //   sx={{
    //     flex: 1,
    //     height: '100vh',
    //     overflow: 'scroll',
    //     position: 'relative',
    //     display: 'flex',
    //     flexDirection: 'column',
    //   }}>
    //   <EmailsListActionsContainer />

    <Box
      sx={{
        flex: 1,
        overflow: 'scroll',
        padding: '120px 28px 28px 28px',
      }}
      ref={containerRef}
    >
      <Email pageParams={pageParams}/>
    </Box>
    //   {/* {isCompose ? <EmailCompose /> : <Email />} */}
    // </Box>
  );
};

export default EmailContainer;
