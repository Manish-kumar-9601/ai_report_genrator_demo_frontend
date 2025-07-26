import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter as Router, Route, Routes } from 'react-router';
import { Templates } from './pages/templates';
import { Navbar } from './components/Navbar';
import { TemplateList } from './pages/TemplateList';
import { App } from './App';

 


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Router>
    <Navbar/>
    <Routes>
      <Route path="/" index element={<App />} />
      <Route path="/templateCreate" element={<Templates />} />
      <Route path="/templateList" element={<TemplateList />} />
    </Routes>
  </Router>
  </StrictMode>,
)
