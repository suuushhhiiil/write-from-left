import React from 'react'
import heroImage from '../images/home/hero.png'

const Home = () => {
    return (
        <div className="grid lg:grid-cols-12 h-screen">
            <div className="lg:col-span-6 flex flex-col lg:py-20 py-10">
                <h1 className="font-script text-primary text-2xl">Hi, I'm</h1>
                <h1 className="variable-hero-text font-bold leading-none font-serif">Khushboo Sangwan</h1>
            </div>
            <div className="lg:col-span-6">
                <img src={heroImage} alt="Hero" className="lg:w-full  lg:h-full object-cover" />
            </div>
        </div>
    )
}

export default Home