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
import Generate from './tools/Generate.jsx';
import CreditStore from './pages/CreditStore.jsx';
import NotFound from './Partials/NotFound.jsx';
import EmailSended from './Partials/EmailSended.jsx';
import Summarize from './tools/Summarize.jsx';
import UserProfile from './users/UserProfile.jsx';
import ResetPassword from './auth/ResetPassword.jsx';
import Services from './components/Services.jsx';
import  PlagrsimGenerate  from '../src/tools/PlagrismGenerate.jsx';
import ArticleGenerator from './tools/ArticleGenerator.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/imagegenerate' element={<Generate />} />
      <Route path='/store' element={<CreditStore />} />
      <Route path='/email-sent' element={<EmailSended />} />
      <Route path='/summerygenerate' element={<Summarize />} />
      <Route path='/profile' element={<UserProfile />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/ai-tools' element={<Services />} />
      <Route path='/plagrism-checker' element={<PlagrsimGenerate />} />
      <Route path='/article-generator' element={<ArticleGenerator />} />



      <Route path='*' element={<NotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>
)
