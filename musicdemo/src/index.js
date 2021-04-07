import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 重置样式
import './assets/css/reset.css'
import './assets/css/public.css'

// rem
import './assets/js/index'

import App from './App';

// 引入react-router-dom依赖
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
