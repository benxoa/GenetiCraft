import 'flowbite';

import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.jsx'
import './index.css'
import Navbar from './components/Navbar.jsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Login from './auth/Login.jsx';
import Register from './auth/Register.jsx';
import Footer from './components/Footer.jsx';
import Generate from './pages/Generate.jsx';
import CreditStore from './pages/CreditStore.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/generate' element={<Generate />} />
      <Route path='/store' element={<CreditStore />} />




    </Routes>
    <Footer />
  </BrowserRouter>
)
