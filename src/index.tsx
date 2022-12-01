import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

Notification.requestPermission();
// .then((permission) => {
//   if (permission === 'granted') {
//     console.log('line 28 Notification permission granted.');
//   }
//   if (permission === 'default') {
//     console.log('line 28 Notification permission default.');
//   }
//   if (permission === 'denied') {
//     console.log('line 28 Notification permission denied.');
//   }
// });

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
