import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter as Router, Route, Routes } from 'react-router';
 
import { Navbar } from './components/Navbar';
import { TemplateList } from './pages/TemplateList';
import { App } from './App';
import { ContactUsPage } from './pages/ContactUs';
import { Templates } from './pages/Templates';
import { UserProvider } from '../context/UserContext';
import { SignupPage } from './pages/SignUp';
import { LoginPage } from './pages/login';
import { AboutPage } from './pages/About';
 

 


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Router>
    <UserProvider>
    <Navbar/>
    <Routes>
      <Route path="/" index element={<App />} />
      <Route path="/templateCreate" element={<Templates />} />
      <Route path="/templateList" element={<TemplateList />} />
      <Route path="/contactUs" element={<ContactUsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/about" element={<AboutPage/>} />
    </Routes>
  </UserProvider>
  </Router>
  </StrictMode>,
)
