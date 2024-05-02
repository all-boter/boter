import React from 'react';
import { Provider } from "react-redux";
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/system';
import reportWebVitals from './reportWebVitals';
import AppRouter from './router';
import store from './store'
import './index.css';

declare module '@mui/system' {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: true;
    lg: false;
    xl: true;
    mobile: true;
    tablet: true;
    desktop: true;
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider
      theme={createTheme({
        breakpoints: {
          values: {
            mobile: 0,
            tablet: 768,
            md: 900,
            desktop: 1200,
            xl: 1500
          },
        },
      })}
    >
      <AppRouter />
    </ThemeProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
