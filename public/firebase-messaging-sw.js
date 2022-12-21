import { unShiftNotificationList } from '@redux/Notify/reducer';
import { useDispatch } from 'react-redux';

importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: 'AIzaSyBPEfffrQ550RfuRJoTe3LL2xLGjW5rUKY',
  authDomain: 'token-app-2dafc.firebaseapp.com',
  databaseURL:
    'https://token-app-2dafc-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'token-app-2dafc',
  storageBucket: 'token-app-2dafc.appspot.com',
  messagingSenderId: '1068843538605',
  appId: '1:1068843538605:web:d8b9b77146604549f8ce24',
  measurementId: 'G-6M1TJJ81R6',
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

const dispatch = useDispatch();

messaging.onBackgroundMessage(function (payload) {
  if (payload) {
    console.log('Received background message ', payload);

    dispatch(unShiftNotificationList(payload.data));

    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.body,
    };
    runtime.register().then((registration) => {
      registration.showNotification(notificationTitle, notificationOptions);
    });
  }
});
