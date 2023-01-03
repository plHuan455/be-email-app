import React from 'react';
// import { transitions, positions, Provider as AlertProvider } from 'react-alert';

import 'react-toastify/dist/ReactToastify.css';
import '@assets/styles/global.scss';
import './App.scss';
import './index.css';
import 'quill/dist/quill.snow.css';
import 'draft-js/dist/Draft.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// import "@assets/styles/tailwind.scss";
import MainRoute from './page/MainRoute';
import { Provider } from 'react-redux';
import { store } from '@redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import 'rc-slider/assets/index.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Toastify from '@components/molecules/Toastify';
import { LanguageProvider } from '@@packages/localization';
import MuiThemeCustomization from '@themes';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RefactorRoute from '@page/RefactorRoute';

// const options = {
//   // you can also just use 'bottom center'
//   position: positions.BOTTOM_CENTER,
//   timeout: 1500,
//   offset: '10px',
//   // you can also just use 'scale'
//   transition: transitions.SCALE,
//   containerStyle: {
//     fontSize: 12,
//     borderRadius: 10,
//   },
// };

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
          <MuiThemeCustomization>
            {/* {this.state.isReady ? <MainRoute /> : <WrapLoading>{SVG}</WrapLoading>} */}
            <LanguageProvider>
              <ProSidebarProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <QueryClientProvider client={queryClient}>
                    {/* <MainRoute /> */}
                    <RefactorRoute />
                  </QueryClientProvider>
                </LocalizationProvider>
              </ProSidebarProvider>
            </LanguageProvider>
            <Toastify />
          </MuiThemeCustomization>
        </PersistGate>
      </Provider>
    );
  }
}
