import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import Appp from "./pages/App.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='/MangasAI'>
      <Routes>
        <Route path="/" element={<Appp />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
