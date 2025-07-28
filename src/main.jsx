import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter as Router, Route, Routes } from 'react-router';
 
import { Navbar } from './components/Navbar';
import { TemplateList } from './pages/TemplateList';
import { App } from './App';
import { ContactUsPage } from './pages/ContactUs';
import { Footer } from './components/Footer';
import { Templates } from './pages/Templates';

 


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Router>
    <Navbar/>
    <Routes>
      <Route path="/" index element={<App />} />
      <Route path="/templateCreate" element={<Templates />} />
      <Route path="/templateList" element={<TemplateList />} />
      <Route path="/contactUs" element={<ContactUsPage />} />
    </Routes>
  
  </Router>
  </StrictMode>,
)
