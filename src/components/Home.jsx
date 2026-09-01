import React from 'react'
import heroImage from '../images/home/hero.png'
import firstDraftImage from '../images/home/first-draft.png'

import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <section className="home">
            <div className="lg:grid lg:grid-cols-12 h-screen gap-8 flex flex-col items-center">
                <div className="lg:col-span-6 flex flex-col lg:h-full justify-center gap-16 lg:py-20 pt-10">
                    <div className="">
                        <h1 className="font-script text-primary text-2xl">Hi, I'm</h1>
                        <div className="flex flex-col items-start gap-4 ">
                            <h1 className="variable-hero-text text-6xl font-medium font-serif leading-none lg:text-nowrap">Khushboo,</h1>
                            <p className="text-primary-dark w-fit font-medium bg-accent px-2 py-1 rounded-md">Creative Project Manager & Content Strategist.</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className='lg:text-2xl text-xl font-medium leading-none'>I believe your life is the <span className="italic text-primary">biggest</span> project you'll ever manage.</p>
                        <p className='lg:text-xl text-xl font-serif mt-2 italic text-accent'>So, What are you building?</p>
                        <Link to="/projects" className="btn-primary mt-1">Work With Me</Link>
                    </div>
                </div>

                <div className="lg:col-span-6 border-b border-secondary">
                    <img src={heroImage} alt="Hero" className="lg:w-full object-cover rounded-xl" />
                </div>
            </div>

            {/* First Draft */}
            <div className="h-screen lg:grid lg:grid-cols-12 flex flex-col justify-between lg:gap-16 gap-6 py-10">
                <div className="lg:col-span-5 flex flex-col gap-12 items-start justify-center lg:h-full">
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-medium text-accent uppercase underline underline-offset-4 tracking-wider">What I am building</p>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-5xl lg:text-6xl font-medium font-serif uppercase">FIRST DRAFT</h1>
                            <h2 className="font-semibold text-primary text-xs tracking-widest uppercase ">Founder · Creative Project Manager</h2>
                        </div>
                        <p className="text-lg mt-2 leading-tight text-justify">A focused writing meetup built around time, accountability and making real progress on the thing you’ve been meaning to write.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-lg font-serif italic text-accent">Write your book & make your author dreams come true! </p>
                        <Link to="/projects" className="btn-secondary">Join the Next Meetup <span className="">→</span></Link>
                    </div>
                </div>

                <div className="lg:col-span-7 flex items-center justify-center h-full bg-test">
                    <img src={firstDraftImage} alt="First Draft" className="w-full h-full lg:h-2/3 object-cover rounded-xl" />
                </div>
            </div>
        </section>
    )
}

export default Home;