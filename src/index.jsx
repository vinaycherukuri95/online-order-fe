import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Cart from "./Cart.jsx";  
import Checkout from "./Checkout.jsx";
import OrderPage from "./OrderPage.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <React.StrictMode>
    <BrowserRouter>
        <Routes>
        {/* Main app (login, home, upload, etc.) */}
        <Route path="/*" element={<App />} />

        {/* Cart page */}
        <Route path="/cart/:userId" element={<Cart />} />
        <Route path="/checkout/:userId" element={<Checkout />} />
         <Route path="/orders/:userId" element={<OrderPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
