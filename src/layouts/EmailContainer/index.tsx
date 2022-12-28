import { EmailResponse } from '@api/email';
import Email from '@components/organisms/Email';
import EmailsListActionsContainer from '@containers/EmailsListActionsContainer';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@redux/configureStore';
import { setCurrEmail } from '@redux/Email/reducer';
import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useEmailCompose from '../../zustand/useEmailCompose';

const EmailContainer = () => {
  const isCompose = useEmailCompose((state) => state.isCompose);
  const dispatch = useAppDispatch();

  const currEmail = useAppSelector(state => state.email.currEmail);

  const containerRef = useRef<HTMLDivElement>(null);
  const preContainerScrollHeight = useRef<number>();
  const intersectingEmailMessStack = useRef<{target: HTMLDivElement; emailData: EmailResponse}[]>([]);

  const { EmailsList } = useAppSelector((state) => state.email);
  const [pageParams, setPageParams] = useState<{page: number; limit: number}>({page: 1, limit: 3});

  const handleChangeCurrEmail = () => {
    const foundIntersecting = intersectingEmailMessStack.current.find(value => {
      const rect = value.target.getBoundingClientRect();
      return rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2}
    )

    if(foundIntersecting) {
      dispatch(setCurrEmail(foundIntersecting.emailData));
    }
  }

  useEffect(() => {
    const container = containerRef.current;
    if(container && preContainerScrollHeight.current !== undefined) {
      container.scrollTop = container.scrollHeight - preContainerScrollHeight.current;
    }
  }, [pageParams])

  useEffect(()=>{
    const container = containerRef.current;
    if(container) {
      setTimeout(() => {
        handleChangeCurrEmail();
      }, 200)
      container.scrollTop = container.scrollHeight;
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll)
        dispatch(setCurrEmail(undefined));
        intersectingEmailMessStack.current = []
      };
    }

  }, [containerRef, EmailsList])

  function handleScroll (e?: Event) {
    const container = e?.target as HTMLDivElement;
    if (container.scrollTop === 0) {
      preContainerScrollHeight.current = container.scrollHeight;
      setPageParams(preState => ({...preState, page: preState.page + 1}));
    }

    handleChangeCurrEmail();
  }
  
  const handleInterSecting = (target: HTMLDivElement, emailData: EmailResponse) => {
    intersectingEmailMessStack.current.push({target, emailData});
  }

  const handleEmailMessUnIntersect = (emailId) => {
    const stackIndex = intersectingEmailMessStack.current.findIndex(value => value.emailData.id === emailId);
    if(stackIndex !== -1 ) {
      intersectingEmailMessStack.current.splice(stackIndex, 1);
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
      <Email 
        pageParams={pageParams} 
        onEmailMessIntersecting={handleInterSecting} 
        onUnIntersecting={handleEmailMessUnIntersect}
      />
    </Box>
    //   {/* {isCompose ? <EmailCompose /> : <Email />} */}
    // </Box>
  );
};

export default EmailContainer;
