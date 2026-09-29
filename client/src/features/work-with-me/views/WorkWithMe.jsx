import workWithMeContent from '../content/workWithMe.js'
import workWithMeImage from '@/assets/images/work-with-me/hero.webp'
import { ArrowDownRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import OptimizedImage from '@/components/common/OptimizedImage'

const WorkWithMe = () => {
    return (
        <section>
            <div className="lg:px-20 px-4 page-hero-offset pb-20 ">
                <div className="lg:h-screen lg:grid lg:grid-cols-12 lg:grid-rows-10 flex flex-col gap-2">
                    <div className="lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3 relative">
                        <h2 className="lg:text-7xl font-semibold font-display text-5xl capitalize">{workWithMeContent.hero.title}</h2>
                        <ArrowDownRight className="lg:block hidden absolute bottom-0 right-0 w-20 h-20 text-primary" />
                    </div>

                    <div className="lg:col-start-9 lg:col-span-4 lg:row-start-1 lg:row-span-3 font-light">
                        <p className="">{workWithMeContent.hero.description[0]}</p>
                        <p className="mt-2 ">{workWithMeContent.hero.description[1]}</p>
                        <p className="mt-2 text-xl font-display italic text-accent">{workWithMeContent.hero.statement}</p>
                    </div>

                    <div className='lg:col-start-1 lg:col-span-12 lg:row-start-5 lg:row-span-6 rounded-xl overflow-hidden'>
                        <OptimizedImage src={workWithMeImage} alt={workWithMeContent.hero.title} priority className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
            <hr className="border-secondary mx-20" />

            <div className='lg:px-20 px-4 py-20'>
                <div className="min-h-screen lg:grid lg:grid-cols-10 lg:grid-rows-9 flex flex-col gap-4">
                    <div className="col-span-4">
                        <h2 className='lg:text-5xl text-4xl font-bold capitalize '>{workWithMeContent.services.title}</h2>
                    </div>

                    <div className="col-span-3 row-span-3 col-start-5 row-start-1 bg-primary rounded-xl gap-2 p-8 flex flex-col justify-center">
                        <ul className='list-disc px-16'>
                            {workWithMeContent.services.skills.map((skill) => (
                                <li key={skill} className='text-light'>
                                    <p className='text-xl font-light font-capitalize'>{skill}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {workWithMeContent.services.items.map((item, index) => {
                        const colStart = index % 2 === 0 ? 8 : 5;
                        return <div key={item.id} className={`relative min-h-100 col-span-3 row-span-3 col-start-${colStart} flex flex-col bg-secondary rounded-xl p-6`} >

                            <div className='absolute top-0 left-0 flex items-center gap-2 w-fit p-3 rounded-tl-xl rounded-br-xl bg-primary'>
                                {item.icon && <item.icon strokeWidth={1.5} size={24} className=' text-light' />}
                            </div>

                            <div className='flex flex-col gap-4 mt-14'>
                                <h3 className='text-2xl font-bold capitalize'>{item.title}</h3>
                                <div className='flex flex-col gap-1'>

                                    <p className='font-semibold'>{item.heading}</p>
                                    <ul className='flex flex-wrap items-start gap-2 font-light'>
                                        {item.content.map((content) => (
                                            <li key={content}>{content}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    }
                    )}
                </div>

            </div>
            <hr className="border-secondary mx-20" />

            <div className='lg:px-20 px-4 py-20 flex flex-col gap-16'>
                <div className="lg:grid lg:grid-cols-10 lg:grid-rows-8 flex flex-col lg:gap-4 gap-16">
                    <div className="col-span-4">
                        <h2 className='lg:text-5xl text-4xl font-bold capitalize '>{workWithMeContent.process.title}</h2>
                    </div>
                    <div className="col-span-10 row-span-6 row-start-3 flex h-full flex-col justify-center lg:gap-4 gap-16 rounded-xl lg:flex-row lg:items-stretch">
                        {workWithMeContent.process.steps.map((step) => (
                            <div
                                key={step.id}
                                className="group relative flex w-full cursor-pointer flex-col rounded-xl bg-secondary p-6 transition-[flex-grow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:h-full lg:w-40 lg:shrink-0 lg:grow-0 lg:hover:grow"
                            >
                                <div className="absolute -top-8 -left-4 flex w-full items-center lg:left-0 lg:justify-center">
                                    <p className="text-8xl font-bold text-accent">{step.number}</p>
                                </div>

                                <div
                                    className="hidden lg:block lg:min-h-0 lg:grow lg:transition-[flex-grow,min-height] lg:duration-500 lg:ease-[cubic-bezier(0.22,1,0.36,1)] lg:group-hover:min-h-16 lg:group-hover:grow-0"
                                    aria-hidden
                                />

                                <div className="mt-16 flex flex-col gap-2 rounded-xl p-4 lg:mt-0">
                                    <h3 className="text-2xl lg:text-center font-display font-bold capitalize lg:rotate-90 lg:group-hover:rotate-0 transition-all duration-300">{step.title}</h3>
                                    <div className="lg:max-h-0 lg:overflow-hidden lg:transition-[max-height] lg:duration-0 lg:delay-0 lg:group-hover:max-h-96 lg:group-hover:delay-500">
                                        <div className="flex flex-col gap-2 lg:translate-y-1 lg:opacity-0 lg:transition-[opacity,transform] lg:duration-300 lg:ease-out lg:delay-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-hover:delay-500">
                                            <p className="font-light">{step.description}</p>
                                            {step.questions && <ul className="flex flex-col gap-2 list-disc px-6">
                                                {step.questions?.map((question) => (
                                                    <li key={question} className="">{question}</li>
                                                ))}
                                            </ul>
                                            }
                                            {step.content && <ul className="flex flex-col gap-2 list-disc px-6">
                                                {step.content?.map((content) => (
                                                    <li key={content} className="">{content}</li>
                                                ))}
                                            </ul>
                                            }
                                            {step.focus && <ul className="flex gap-1 flex-wrap">
                                                {step.focus?.map((focus) => (
                                                    <li key={focus} className="bg-primary text-light font-light w-fit px-4 py-2 rounded-full">{focus}</li>
                                                ))}
                                            </ul>
                                            }
                                            <p className="font-medium">{step.statement}</p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="hidden lg:block lg:grow lg:transition-[flex-grow] lg:duration-500 lg:ease-[cubic-bezier(0.22,1,0.36,1)] lg:group-hover:grow-0"
                                    aria-hidden
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <hr className="border-secondary mx-20" />

            <div className='lg:px-20 px-4 py-20'>

                <div className="flex flex-col gap-8 bg-secondary rounded-xl p-4">
                    <div className="flex flex-col gap-2">
                        <h2 className='lg:text-5xl text-4xl font-bold capitalize '>{workWithMeContent.toolkit.title}</h2>
                        <p className='text-lg font-light lg:w-1/3'>{workWithMeContent.toolkit.philosophy}</p>
                    </div>
                    <div className="col-span-10 row-span-7 row-start-3  flex lg:flex-row flex-col h-full gap-4 rounded-xl lg:items-stretch">
                        {workWithMeContent.toolkit.categories.map((category) => (
                            <div key={category.id} className="flex flex-col gap-4 bg-primary rounded-md p-4 lg:w-1/3">
                                <h3 className='text-2xl text-light font-display capitalize'>{category.title}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {category.tools?.map((tool) => {
                                        return <div key={tool} className='flex flex-col items-center gap-2 bg-secondary rounded-lg px-2 py-1'>
                                            <p className=''>{tool}</p>
                                        </div>
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <hr className="border-secondary mx-20" />
            <div className='lg:px-20 px-4 py-20'>
                <div className="rounded-3xl bg-primary p-6 text-background lg:p-12">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-4xl font-bold lg:text-5xl capitalize">
                                {workWithMeContent.contact.title}
                            </h2>
                            <p className="text-xl leading-tight font-light text-secondary">
                                {workWithMeContent.contact.description}
                            </p>
                            <p className="font-display font-semibold text-xl italic text-accent mt-8">
                                {workWithMeContent.contact.statement}
                            </p>
                            <Link to="/contact" className="w-fit rounded-md bg-background px-4 py-2 text-sm text-primary transition-all duration-300 hover:bg-secondary uppercase">
                                {workWithMeContent.contact.cta.label} <span>→</span>
                            </Link>
                        </div>
                        <div className="mt-8 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:flex lg:justify-end">
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default WorkWithMe