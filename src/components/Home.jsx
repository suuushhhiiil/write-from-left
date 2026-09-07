import React from 'react'
import heroImage from '../images/home/hero.png'
import firstDraftImage from '../images/home/first-draft.png'
import letsTalkImage from '../images/home/talk-01.png'
import homeContent from '../assets/home';
import { Link } from 'react-router-dom';
import { Handshake } from 'lucide-react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';


gsap.registerPlugin(ScrollTrigger);
const Home = () => {
    return (
        <section className="lg:px-20 px-8">
            <div className="lg:grid lg:grid-cols-12 h-screen gap-8 flex flex-col items-center ">
                <div className="lg:col-span-6 flex flex-col lg:h-full justify-center gap-16 lg:py-20 pt-10">
                    <div className="">
                        <h1 className="font-script text-primary text-2xl">Hi, I'm</h1>
                        <div className="flex flex-col items-start gap-4 ">
                            <h1 className="variable-hero-text text-6xl font-medium font-serif leading-none lg:text-nowrap">Khushboo Sangwan,</h1>
                            <p className="text-primary-dark w-fit font-medium bg-secondary px-2 py-1 rounded-md">Creative Project Manager & Content Strategist.</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className='lg:text-2xl text-xl font-light leading-none'>I believe your life is the <span className="italic text-primary">biggest</span> project you'll ever manage.</p>
                        <p className='text-2xl font-serif mt-2 italic text-accent'>So, What are you building?</p>
                        <Link to="/projects" className="btn-primary mt-1">Work With Me</Link>
                    </div>
                </div>

                <div className="lg:col-span-6 border-b border-secondary">
                    <img src={heroImage} alt="Hero" className="lg:w-full object-cover" />
                </div>
            </div>

            {/* What I am building */}
            <div className="h-screen lg:grid border-b border-secondary lg:grid-cols-12 flex flex-col items-center justify-between lg:gap-16 gap-6  py-20">
                <div className="lg:col-span-5 flex  flex-col lg:gap-24 items-start justify-center lg:h-full">
                    <div className="flex flex-col gap-4">
                        <p className="text-xs font-medium text-accent uppercase underline underline-offset-4 tracking-wider">What I am building</p>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-5xl font-medium font-serif capitalize">first draft</h1>
                            <h2 className="font-semibold text-primary text-xs tracking-widest uppercase ">Founder · Creative Project Manager</h2>
                            <p className="text-xl leading-tight font-light mt-2">A focused writing meetup built around time, accountability and making real progress on the thing you’ve been meaning to write.</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-16">
                        <p className="text-xl font-serif italic text-accent">Write your book & make your author dreams come true! </p>
                        <Link to="/projects" className="btn-secondary">Join the Next Meetup <span className="">→</span></Link>
                    </div>
                </div>
                <div className="lg:col-span-7 flex items-center justify-center h-full">
                    <img src={firstDraftImage} alt="First Draft" className="w-full h-full object-cover rounded-3xl shadow-2xl" />
                </div>
            </div>

            {/* What I Do */}
            <div className="flex flex-col gap-2 py-20  border-b border-secondary">
                <h3 className="text-xs font-medium text-accent uppercase underline underline-offset-4 tracking-wider">{homeContent.whatIDoSection.title}</h3>

                <div className="lg:grid lg:grid-cols-12 flex flex-col gap-4 mt-4 items-start">
                    <h1 className='lg:col-span-7 text-5xl font-medium font-serif capitalize '>{homeContent.whatIDoSection.hero.heading}<span className="italic text-primary"> {homeContent.whatIDoSection.hero.subheading}</span></h1>

                    <div className="lg:-col-start-5 lg:col-span-4 lg:text-right ">
                        <p className="lg:text-2xl text-xl leading-tight font-light">{homeContent.whatIDoSection.hero.description}</p>
                    </div>

                    <div className="lg:col-span-6 flex flex-col items-start justify-between gap-2 rounded-2xl p-6 lg:mt-16 mt-8 bg-accent/60 lg:h-64">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-4xl font-medium">{homeContent.whatIDoSection.hero.intro}</h2>
                            <p className="text-lg leading-tight">{homeContent.whatIDoSection.hero.statement}</p>
                        </div>
                        <Link to="/projects" className="btn-primary mt-4">{homeContent.whatIDoSection.hero.buttonText}<span className="">→</span></Link>
                    </div>

                    <div className="what-i-do-card lg:col-span-3 rounded-2xl lg:mt-16 lg:h-64 h-128 w-full" >
                    </div>
                    {homeContent.whatIDoSection.expertise.items.map((item, index) => (
                        <div key={index} className={`lg:col-span-3 flex w-full flex-col gap-2 rounded-2xl p-6 bg-secondary h-64  ${index === 0 ? 'lg:mt-16' : ''}`}>
                            {item.icon && <div className="text-primary mb-2 w-fit p-1 rounded-md">
                                <item.icon size={24} strokeWidth={1.5} />
                            </div>}
                            <h3 className="text-2xl font-medium leading-none">{item.title}</h3>
                            <p className="text-lg text-dark-accent leading-tight">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Proof */}
            <div className="mt-20 flex flex-col p-6 gap-4 pt-20 border-b border-secondary bg-primary text-background  rounded-3xl">
                <h3 className="text-xs font-medium text-accent uppercase underline underline-offset-4 tracking-wider">{homeContent.experienceSection.title}</h3>

                <h1 className='text-5xl font-medium font-serif capitalize '>{homeContent.experienceSection.heading}</h1>
                <div className="">
                    <p className="text-xl leading-tight font-light text-secondary">{homeContent.experienceSection.description}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                    {homeContent.experienceSection.items.map((item, index) => (
                        <div key={index} className="flex flex-col gap-2 rounded-xl p-6 bg-secondary h-64 relative overflow-hidden">
                            <h3 className="text-5xl font-semibold text-primary leading-none">{item.title}</h3>
                            <p className="text-lg text-dark-accent leading-tight">{item.description}</p>

                            <img src={item.image} alt={item.title} className="object-cover w-full h-full rounded-2xl absolute -rotate-12 top-[45%] left-[30%] shadow-2xl shadow-dark z-0" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Let's Talk */}
            <div className='h-screen relative flex flex-col items-center justify-center gap-4 pt-20 pb-8'>
                <div className='lg:grid lg:grid-cols-12 flex flex-col gap-4 '>
                    <div className='lg:col-span-3'>
                        <p className='text-xs font-medium text-accent uppercase underline underline-offset-4 tracking-wider'>Let's Talk</p>
                    </div>
                    <div className='lg:col-span-6 lg:row-2'>
                        <h1 className='variable-hero-text text-5xl font-medium font-serif capitalize'>{homeContent.letsTalkSection.heading}</h1>
                    </div>
                    <div className='lg:col-span-4 lg:row-3 flex flex-col gap-4 mt-16'>
                        <p className="text-xl font-light leading-tight">{homeContent.letsTalkSection.description[0]}{" "}
                            <span className="text-xl font-serif italic text-accent">{homeContent.letsTalkSection.description[1]}</span></p>
                        <Link to="/contact" className="btn-primary">{homeContent.letsTalkSection.buttonText}{" "}<span className="">→</span></Link>

                    </div>
                    <div className='lg:-col-start-7 lg:col-span-6 lg:row-start-1 lg:row-span-3 lg:mt-0 mt-16'>
                        <img src={letsTalkImage} alt="Let's Talk" className="w-full h-full object-cover rounded-3xl shadow-2xl" />
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Home;