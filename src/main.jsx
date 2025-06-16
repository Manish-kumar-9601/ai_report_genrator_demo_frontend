import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'

import {BrowserRouter as Router, Route, Routes } from 'react-router';
import { Templates } from './pages/templates';
import { Navbar } from './components/Navbar';

 


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Router>
    <Navbar/>
    <Routes>
      <Route path="/" index element={<App />} />
      <Route path="/template" element={<Templates />} />
    </Routes>
  </Router>
  </StrictMode>,
)
