import React from 'react'
import heroImage from '../images/home/hero.png'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="grid lg:grid-cols-14 h-screen flex flex-col justify-between">
            <div className="lg:col-span-8 flex flex-col justify-center gap-16 lg:py-20 py-10">
                <div className="">
                    <h1 className="font-script text-primary text-2xl">Hi, I'm</h1>
                    <h1 className="variable-hero-text font-bold leading-none font-serif">Khushboo</h1>
                    <p className="text-lg text-accent leading-none">Creative Project Manager & Content Strategist.</p>
                </div>
                <div className="flex flex-col items-start gap-2">
                    <p className='lg:text-3xl font-medium'>I believe your life is the <span className="italic text-primary">biggest</span> project you'll ever manage.</p>
                    <p className='lg:text-2xl font-medium italic text-dark-accent'>So, What are you building?</p>
                    <Link to="/projects" className="btn-primary">Work With Me</Link>
                </div>
            </div>


            <div className="lg:col-span-6 lg:relative">
                <img src={heroImage} alt="Hero" className="lg:absolute bottom-0 left-0 lg:w-full lg:h-auto object-contain rounded-xl" />
            </div>
        </div>
    )
}

export default Home;