import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainLayout from './MainLayout.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home.jsx'
import SmoothScroll from './motion/SmoothScroll.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SmoothScroll>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />} >
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SmoothScroll>
  </StrictMode>
);
