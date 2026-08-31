import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'

function MainLayout() {
    return (
        <div className="min-h-screen bg-background">
            <div className="sticky top-0 z-50">
                <Nav />
            </div>
            <main className="lg:px-20 px-4">
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout
