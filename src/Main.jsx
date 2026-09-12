import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainLayout from './MainLayout.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy } from 'react'

const Home = lazy(() => import('./components/Home.jsx'))
const SmoothScroll = lazy(() => import('./motion/SmoothScroll.jsx'))
const Projects = lazy(() => import('./components/Projects.jsx'))
const Contact = lazy(() => import('./components/Contact.jsx'))
const Products = lazy(() => import('./components/Products.jsx'))
const About = lazy(() => import('./components/About.jsx'))
const WorkWithMe = lazy(() => import('./components/WorkWithMe.jsx'))


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SmoothScroll>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />} >
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/work-with-me" element={<WorkWithMe />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SmoothScroll>
  </StrictMode>
);
