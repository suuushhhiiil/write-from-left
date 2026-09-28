import { Suspense, useLayoutEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'

function ScrollToTop() {
    const { pathname, hash } = useLocation()

    useLayoutEffect(() => {
        if (hash) {
            const target = document.querySelector(hash)
            if (target) {
                target.scrollIntoView()
                return
            }
        }

        window.scrollTo(0, 0)
        window.dispatchEvent(new Event('lenis:scrollToTop'))
    }, [pathname, hash])

    return null
}

function MainLayout() {
    return (
        <div className="bg-background">
            <div className="fixed top-0 z-50 w-full">
                <Nav />
            </div>
            <main className="overflow-x-hidden">
                <Suspense fallback={<div className="min-h-screen" > Loading... </div >}>
                    <ScrollToTop />
                    <Outlet />
                </Suspense>
            </main>
            <div className="">
                <Footer />
            </div>
        </div>
    )
}

export default MainLayout
