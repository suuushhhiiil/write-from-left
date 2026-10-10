import { Suspense, useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import Loader, { RouteImageLoadProvider } from "@/components/common/Loader";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView();
        return;
      }
    }

    window.scrollTo(0, 0);
    window.dispatchEvent(new Event("lenis:scrollToTop"));
  }, [pathname, hash]);

  return null;
}

function MainLayout() {
  return (
    <div className="bg-background">
      <div className="fixed top-0 z-50 w-full">
        <Navbar />
      </div>
      <main className="overflow-x-hidden">
        <Suspense fallback={<Loader />}>
          <ScrollToTop />
          <RouteImageLoadProvider>
            <Outlet />
          </RouteImageLoadProvider>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
