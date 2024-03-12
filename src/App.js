import React from 'react';
import { Provider as StoreProvider, useDispatch } from 'react-redux';
import { useLocation } from 'wouter';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Router from './router';
import { apps } from './shared/js/apps';
import createTheme from './shared/react-pure/createTheme';
import AppContainer from './shared/react/AppContainer';
import Toast from './shared/react/Toast';
import { HooksOutsieWrapper, setHook } from './shared/react/hooksOutside';
import initShared from './shared/react/initShared';
import store from './store';

initShared({
  logo: 'https://static.peng37.com/faviconapi/52190fe8-4549-4a16-b25b-3b42954128bc/ca6d853a23622be4a303555bcfb52138/icon-192.png',
  app: apps.Encrypt37.name,
  encryptionUrl: 'https://encrypt37.com/encryption/',
  privacyUrl: 'https://encrypt37.com/privacy/',
  termsUrl: 'https://encrypt37.com/terms/',
});

setHook('location', useLocation);
setHook('dispatch', useDispatch);

const theme = createTheme(apps.Encrypt37.color);

function App() {
  return (
    <StoreProvider store={store}>
      <AppContainer theme={theme}>
        <NavBar />
        <Router />
        <Footer />

        <Toast />
      </AppContainer>
      <HooksOutsieWrapper />
    </StoreProvider>
  );
}

export default App;
