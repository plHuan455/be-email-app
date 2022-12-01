import { initializeApp } from 'firebase/app';
import { collection, getDocs } from 'firebase/firestore/lite';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const config = {
  apiKey: 'AIzaSyCLvxRkPCmGf2YeJshvG4o-pAJpxSHTphA',
  authDomain: 'emven-7e130.firebaseapp.com',
  databaseURL:
    'https://emven-7e130-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'emven-7e130',
  storageBucket: 'emven-7e130.appspot.com',
  messagingSenderId: '679730429229',
  appId: '1:679730429229:web:311a27a96904cea62b27a4',
  measurementId: 'G-2MMWHVE8F5',
};

const firebaseConfig = config;

const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound, setFcmToken) => {
  return getToken(messaging, {
    vapidKey:
      'BC2ZO9n2sVkm37CQiqs90oAO0E0PyqZ1sX8t1qfy3Mp_eHJ2rHg5bD_a2O4dZDBSn9IIx-JxCpT3xGACCaITLbY',
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
  console.log('---------is listening notify-------');
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
      console.log({ payload }, '---------line 50 on lister messeage-------');
    });
  });
};
