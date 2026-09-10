import React from 'react'
import workWithMeContent from '../assets/workWithMe.js'
import workWithMeImage from '../images/work-with-me/hero.png'
import { ArrowDownRight, ArrowRightIcon } from 'lucide-react'

const WorkWithMe = () => {
    return (
        <section>
            <div className="lg:px-20 px-8 py-20">
                <div className="lg:h-[120vh] lg:grid lg:grid-cols-12 lg:grid-rows-10 flex flex-col gap-2">
                    <div className="lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3 relative">
                        <h2 className="lg:text-7xl font-bold text-5xl capitalize">{workWithMeContent.hero.title}</h2>
                        <ArrowDownRight className="lg:block hidden absolute bottom-0 right-0 w-20 h-20 text-primary" />
                    </div>

                    <div className="lg:col-start-9 lg:col-span-4 lg:row-start-1 lg:row-span-3">
                        <p className="">{workWithMeContent.hero.description[0]}</p>
                        <p className="mt-2 ">{workWithMeContent.hero.description[1]}</p>
                        <p className="mt-2 text-xl font-serif italic text-accent">{workWithMeContent.hero.statement}</p>
                    </div>

                    <div className='lg:col-start-1 lg:col-span-12 lg:row-start-5 lg:row-span-6 rounded-xl overflow-hidden'>
                        <img src={workWithMeImage} alt={workWithMeContent.hero.title} className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
            <hr className="border-secondary mx-20" />


            <div className="lg:px-20 px-8 py-20">
                <div className='h-screen flex flex-col gap-4'>
                    <div className='flex flex-col gap-4 lg:mb-16 items-center'>
                        <h2 className='lg:text-5xl text-4xl font-bol capitalize font-serif'>{workWithMeContent.services.title}</h2>
                    </div>
                    <div className='flex lg:flex-row flex-col justify-center gap-4 mt-8'>

                        {workWithMeContent.services.items.map((item) => (
                            <div key={item.id} className='flex flex-col gap-4  rounded-xl p-4 bg-secondary lg:w-[300px]'>
                                <div className='flex items-center gap-2'>
                                    {item.icon && <item.icon className='w-6 h-6 text-primary' />}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h3 className='text-2xl font-semibold capitalize'>{item.title}</h3>
                                    <p className='font-semibold'>{item.heading}</p>
                                    <ul>
                                        {item.content.map((content) => (
                                            <li key={content}>{content}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </section>
    )
}

export default WorkWithMe