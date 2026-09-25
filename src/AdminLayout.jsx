import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <div className="min-h-screen">
            <div className="sticky top-0 left-0 w-full h-16 bg-white border-b p-4 z-50">
                <h1 className="text-2xl font-bold">Admin/Blog Editor</h1>
            </div>
            <div className="flex flex-col items-center justify-center">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout