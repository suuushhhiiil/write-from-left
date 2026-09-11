import React, { useEffect, useRef, useState } from 'react'
import logo from '../images/nav/logo-full.png'
import { Menu } from 'lucide-react'
import { navItems } from '../assets/nav'
import { Link, useLocation } from 'react-router-dom'


const Nav = () => {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    const isActive = (page) => (location.pathname.includes(page))

    const navRef = useRef(null)
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        if (!navRef.current) return
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    return (
        <div ref={navRef} className="relative backdrop-blur-lg flex justify-between items-center py-4 px-8 lg:px-20">
            <div className="flex flex-col items-center gap-2">
                <Link to="/">
                    <img loading="lazy" src={logo} alt="Write-from-left" className="w-20 lg:w-28 object-contain hover:scale-105 transition-all duration-300 cursor-pointer" />
                </Link>
            </div>
            <ul className="items-center gap-4 hidden lg:flex text-sm">
                <Link to="/" className={`text-sm cursor-pointer hover:text-primary transition-all duration-300 ${location.pathname === "/" ? 'text-primary font-bold' : 'text-dark'}`}>Home</Link>
                {navItems.map((item) => (
                    <Link key={item.to} to={item.to} className={`text-sm cursor-pointer hover:text-primary transition-all duration-300 ${isActive(item.to) ? 'text-primary font-bold' : 'text-dark'}`}>{item.label}</Link>
                ))}

            </ul>

            <div onClick={toggleMenu} className="lg:hidden flex items-center gap-4 text-primary p-2 rounded-md hover:bg-secondary">
                <Menu size={24} className="cursor-pointer " strokeWidth={2.5} />
            </div>

            {isOpen && <div className="lg:hidden w-full mt-2 pl-8 absolute top-full right-4">
                <div className="bg-primary text-light rounded-md p-4 w-full">
                    <ul className="flex flex-col items-end gap-4 text-2xl">
                        {navItems.map((item) => (
                            <Link key={item.to} to={item.to} className="text-2xl" onClick={toggleMenu}>{item.label}</Link>
                        ))}
                    </ul>
                </div>
            </div>}

        </div>
    )
}

export default Nav