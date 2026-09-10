import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'

function MainLayout() {
    return (
        <div className="min-h-screen bg-background">
            <div className="sticky top-0 z-50">
                <Nav />
            </div>
            <main className="">
                <Outlet />
            </main>
            <div className="">
                <Footer />
            </div>
        </div>
    )
}

export default MainLayout
