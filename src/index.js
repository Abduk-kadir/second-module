import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css'
import ProductMain from './components/productMain';
import { BrowserRouter } from 'react-router-dom';
import EmpMain from './components/empMain';
import BankMain from './components/bankMain';
import StMain from './components/stMain';
import CMain from './components/cMain';
import DemoMain from './components/demoMain';
import Demo2Main from './components/demo2Main';
import PostMan from './components/postMan';
import StoreMain from './components/storeMain';
import RComp from './components/aComp'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
       
         <RComp/>
        
    </BrowserRouter>
   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
