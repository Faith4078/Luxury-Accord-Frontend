import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import {
  Home,
  SingleProduct,
  Cart,
  Error,
  About,
  Products,
  AuthWrapper,
  Success,
  Cancel,
  Return,
  PrivateRoute,
  Login,
  Subscribed,
} from './pages';

import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <ToastContainer />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="products/:id" element={<SingleProduct />} />
          <Route path="/success" element={<Success />} />
          <Route path="/return" element={<Return />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/subscribed" element={<Subscribed />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </AuthWrapper>
  );
}

export default App;
