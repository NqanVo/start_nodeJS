import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import store from "./redux/store"
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import Loading from './components/Loading';

const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.withCredentials = true

root.render(
  <CookiesProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <ToastContainer />
        <Loading />
      </Provider>
    </BrowserRouter>
  </CookiesProvider>
);
