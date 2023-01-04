import { EmailResponse } from '@api/email';
import Email from '@components/organisms/Email';
import EmailsListActionsContainer from '@containers/EmailsListActionsContainer';
import { Box, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@redux/configureStore';
import { setCurrEmail } from '@redux/Email/reducer';
import { rem } from '@utils/functions';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useEmailCompose from '../../zustand/useEmailCompose';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useScrollInfinity from '@hooks/useScrollInfinity';

const EmailContainer = () => {
  const isCompose = useEmailCompose((state) => state.isCompose);
  const dispatch = useAppDispatch();

  const containerRef = useRef<HTMLDivElement>(null);
  const preEmailId = useRef<number>();
  const isFirstRender = useRef<boolean>(true);
  const intersectingEmailMessStack = useRef<
    { target: HTMLDivElement; emailData: EmailResponse }[]
  >([]);

  const { EmailsList } = useAppSelector((state) => state.email);
  const currEmail = useAppSelector((state) => state.email.currEmail);
  const [pageParams, setPageParams] = useState<{ page: number; limit: number }>({
    page: 1,
    limit: 3,
  });

  const [enabled, setEnabled] = useState<boolean>(true);

  const { scrollToPrePosition } = useScrollInfinity({
    scrollContainer: containerRef.current,
    enabled: enabled && (pageParams.page * pageParams.limit < EmailsList.length),
    thresholdTop: 400,
    onScrollTop: () => {
      setEnabled(false);
      console.count();
      setPageParams((preState) => ({...preState, page: preState.page + 1}));
      setTimeout(() => setEnabled(true), 3000);
    },
    onScroll: (target) => {
      const container = target as HTMLDivElement;
      const { scrollHeight, scrollTop, clientHeight } = container;
      setIsShowScrollButton(scrollTop + clientHeight + 100 < scrollHeight);
      handleChangeCurrEmail();
    }
  });

  const [isShowScrollBottom, setIsShowScrollButton] = useState<boolean>(false);

  const handleChangeCurrEmail = () => {
    const foundIntersecting = intersectingEmailMessStack.current.find((value) => {
      const rect = value.target.getBoundingClientRect();
      return (
        rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2
      );
    });

    if (foundIntersecting) {
      // console.log({preEmailId: preEmailId.current, foundIntersectingId: foundIntersecting.emailData.id});
      if (preEmailId.current !== foundIntersecting.emailData.id) {
        dispatch(setCurrEmail(foundIntersecting.emailData));
      }
      preEmailId.current = foundIntersecting.emailData.id;
    }
  };

  // update intersecting list when EmailList change
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    intersectingEmailMessStack.current = intersectingEmailMessStack.current.map(
      (value) => {
        const foundEmail = EmailsList.find(
          (email) => email.id === value.emailData.id,
        );
        if (foundEmail !== undefined && foundEmail?.id === currEmail?.id) {
          dispatch(setCurrEmail(foundEmail));
        }
        return { ...value, emailData: foundEmail ?? value.emailData };
      },
    );
    handleChangeCurrEmail();
  }, [EmailsList]);

  // WHEN SCROLL CONTAINER CHANGE SCROLL HEIGHT => SCROLL TO PREVIOUS EMAIL MESS 
  useEffect(() => {
    scrollToPrePosition();
  }, [pageParams]);

  // SCROLL BOTTOM TOP WHEN MOUNT
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [containerRef, EmailsList]);

  const handleInterSecting = (target: HTMLDivElement, emailData: EmailResponse) => {
    intersectingEmailMessStack.current.push({ target, emailData });
    // console.log(target, emailData.email.subject);
  };

  const handleEmailMessUnIntersect = (emailId) => {
    const stackIndex = intersectingEmailMessStack.current.findIndex(
      (value) => value.emailData.id === emailId,
    );
    if (stackIndex !== -1) {
      intersectingEmailMessStack.current.splice(stackIndex, 1);
    }
  };

  const handleScrollBottom = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      containerRef.current.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <Box
        sx={{
          flex: 1,
          overflow: 'scroll',
          padding: '120px 28px 28px 28px',
        }}
        ref={containerRef}>
        <Email
          pageParams={pageParams}
          onEmailMessIntersecting={handleInterSecting}
          onUnIntersecting={handleEmailMessUnIntersect}
        />
      </Box>
      {isShowScrollBottom && (
        <Button
          sx={{
            position: 'absolute',
            bottom: rem(60),
            left: 'calc(50% + 20px)',
            backgroundColor: 'white',
            borderRadius: '100%',
            margin: 0,
            padding: 0,
            zIndex: 80,
            minWidth: 'auto',
            boxShadow:
              '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
            width: rem(40),
            height: rem(40),
            '&.MuiButton-root:hover': {
              backgroundColor: '#d5d5d5',
              boxShadow:
                '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
            },
          }}
          onClick={handleScrollBottom}>
          <KeyboardArrowDownIcon sx={{ color: 'black', fontSize: rem(28) }} />
        </Button>
      )}
    </>
  );
};

export default memo(EmailContainer);
