import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
var firebaseConfig = {
  apiKey: 'AIzaSyCLvxRkPCmGf2YeJshvG4o-pAJpxSHTphA',
  authDomain: 'emven-7e130.firebaseapp.com',
  projectId: 'emven-7e130',
  storageBucket: 'emven-7e130.appspot.com',
  messagingSenderId: '679730429229',
  appId: '1:679730429229:web:83edd99af06414862b27a4',
  measurementId: 'G-R3LFRZKPYT',
};
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound, setFcmToken) => {
  return getToken(messaging, {
    vapidKey:
      'BGVsS2SVP7O-0rqf0vfG1p8PQHUxAUziCs_m4BXegTdmDHDFeJIdrp6QQXburUmXJDTAHfYafo7pak-QUXjjLJQ',
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);
      } else {
        console.log('No token found');
        setTokenFound(false);
        setFcmToken('');
      }
    })
    .catch((err) => {
      console.log('Error occured', err);
    });
};

export const onMessageListener = () => {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
      console.log(payload);
    });
  });
};
