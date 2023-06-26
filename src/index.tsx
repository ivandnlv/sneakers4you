import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/index.tsx';
import { BrowserRouter } from 'react-router-dom';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App />
  </BrowserRouter>,
);