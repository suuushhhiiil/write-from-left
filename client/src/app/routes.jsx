import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AdminLayout from "@/layouts/AdminLayout";
import AuthLayout from "@/layouts/AuthLayout";
import RequireAuth from "@/features/auth/components/RequireAuth";
import Loader from "@/components/common/Loader";

const Home = lazy(() => import("@/features/home/views/Home"));
const Projects = lazy(() => import("@/features/projects/views/Projects"));
const Contact = lazy(() => import("@/features/contact/views/Contact"));
const Products = lazy(() => import("@/features/products/views/Products"));
const About = lazy(() => import("@/features/about/views/About"));
const WorkWithMe = lazy(() => import("@/features/work-with-me/views/WorkWithMe"));
const Login = lazy(() => import("@/features/auth/views/Login"));
const AdminDashboard = lazy(() => import("@/features/blog/views/AdminDashboard"));
const AdminBlogList = lazy(() => import("@/features/blog/views/AdminBlogList"));
const AdminComments = lazy(() => import("@/features/blog/views/AdminComments"));
const BlogEditorPage = lazy(() => import("@/features/blog/views/BlogEditorPage"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/work-with-me" element={<WorkWithMe />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/admin/login" element={<Login />} />
        </Route>

        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="blogs" element={<AdminBlogList />} />
          <Route path="blogs/new" element={<BlogEditorPage />} />
          <Route path="blogs/:id/edit" element={<BlogEditorPage />} />
          <Route path="comments" element={<AdminComments />} />
          <Route path="blog-editor" element={<Navigate to="/admin/blogs/new" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
