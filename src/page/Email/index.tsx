import EmailStatusBar from '@layouts/EmailStatusBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EmailMainWrapper from '@layouts/EmailMainWrapper';
import { useState } from 'react';
import { fetchToken, messaging, onMessageListener } from '@utils/NotifyRealtime';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { Outlet } from 'react-router-dom';
import EmailLayout from '@layouts/EmailLayout';

const Email = () => {
  const [show, setShow] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ title: string; body: string }>({
    title: '',
    body: '',
  });
  const [isTokenFound, setTokenFound] = useState<boolean>(false);
  const [getFcmToken, setFcmToken] = useState<string>('');

  // fetchToken(setTokenFound, setFcmToken);

  // onMessageListener()
  //   .then((payload: any) => {
  //     console.log(`line 27`, payload);

  //     setNotification({
  //       title: payload.notification.title,
  //       body: payload.notification.body,
  //     });
  //     setShow(true);
  //   })
  //   .catch((err) => console.log('failed', err));

  return (
    <div className="w-full flex items-center content-around">
      <EmailStatusBar />

      <EmailLayout>
        <Outlet />
      </EmailLayout>
      {/* <EmailMainWrapper /> */}
    </div>
  );
};

export default Email;
