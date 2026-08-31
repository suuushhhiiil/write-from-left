import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'

function MainLayout() {
    return (
        <div className="min-h-screen bg-background">
            <Nav />
            <Outlet />
        </div>
    )
}

export default MainLayout
