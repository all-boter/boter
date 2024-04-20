import React from 'react';
import { Provider } from "react-redux";
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import AppRouter from './router';
import store from './store'
import './index.css';
import { ThemeProvider, createTheme } from '@mui/system';

declare module '@mui/system' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
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
            tablet: 640,
            desktop: 1024,
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
