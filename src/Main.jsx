import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import MainLayout from './MainLayout.jsx'
import SmoothScroll from './motion/SmoothScroll.jsx'
import AdminLayout from './AdminLayout.jsx'

const Home = lazy(() => import('./components/Home.jsx'))
const Projects = lazy(() => import('./components/Projects.jsx'))
const Contact = lazy(() => import('./components/Contact.jsx'))
const Products = lazy(() => import('./components/Products.jsx'))
const About = lazy(() => import('./components/About.jsx'))
const WorkWithMe = lazy(() => import('./components/WorkWithMe.jsx'))
const BlogEditorPage = lazy(() => import('./components/blogs/BlogEditorPage.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SmoothScroll>
        <Routes>
          <Route element={<MainLayout />} >
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/work-with-me" element={<WorkWithMe />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />} >
            <Route path="blog-editor" element={<BlogEditorPage />} />
          </Route>
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  </StrictMode>
);
