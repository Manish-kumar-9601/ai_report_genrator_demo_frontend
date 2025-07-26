import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'

import {BrowserRouter as Router, Route, Routes } from 'react-router';
import { Templates } from './pages/templates';
import { Navbar } from './components/Navbar';
import { TemplateList } from './pages/TemplateList';

 


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Router>
    <Navbar/>
    <Routes>
      <Route path="/" index element={<Templates />} />
      <Route path="/template" element={<Templates />} />
      <Route path="/templateList" element={<TemplateList />} />
    </Routes>
  </Router>
  </StrictMode>,
)
