import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'

function MainLayout() {
    return (
        <div className="min-h-screen bg-background">
            <div className="sticky top-0 z-50">
                <Nav />
            </div>
            <Outlet />
        </div>
    )
}

export default MainLayout
