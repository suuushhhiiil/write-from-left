import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainLayout from './MainLayout.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home.jsx'
import SmoothScroll from './motion/SmoothScroll.jsx'
<<<<<<< HEAD
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
=======
import Products from './components/Products.jsx'
>>>>>>> 6f3471f43bf0ce580f2564d06c24fdc42278b5ee



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SmoothScroll>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />} >
            <Route path="/" element={<Home />} />
<<<<<<< HEAD
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
=======
            <Route path="/products" element={<Products />} />
>>>>>>> 6f3471f43bf0ce580f2564d06c24fdc42278b5ee
          </Route>
        </Routes>
      </BrowserRouter>
    </SmoothScroll>
  </StrictMode>
);
