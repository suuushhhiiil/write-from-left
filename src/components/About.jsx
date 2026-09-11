import { ArrowUpRightIcon, FileQuestionIcon } from 'lucide-react'
import aboutContent from '../assets/about.js'
import aboutMotion from '../motion/about.js'
import aboutImage from '../images/about/04.png'
import aboutMeImage from '../images/about/07.png'
import childhoodImage from '../images/about/me.png'
import { Link } from 'react-router-dom'

const About = () => {
    // aboutMotion();

    return (
        <section className="">
            <div className="h-screen lg:grid lg:grid-cols-12 lg:grid-rows-12 flex flex-col lg:items-start px-8 lg:px-20 pt-10">
                <div className="lg:col-span-6 lg:row-span-2 lg:row-start-1 gap-2 flex flex-col">
                    <p className="hero-tagline text-xl text-primary leading-none">{aboutContent.hero.tagline}</p>
                    <h1 className="hero-title variable-hero-text text-5xl font-medium font-display leading-none capitalize">{aboutContent.hero.title}</h1>
                </div>

                <div className="lg:-col-start-6 lg:col-span-5 lg:row-span-2 lg:row-start-5 flex flex-col gap-2 lg:mt-0 mt-4">
                    <p className="hero-paragraph text-lg leading-tight">{aboutContent.hero.paragraph}</p>
                </div>

                <div className="lg:col-span-6 lg:col-start-1 lg:row-span-9 lg:row-start-4 h-full gap-2 flex flex-col rounded-xl overflow-hidden lg:mt-0 mt-8">
                    <img loading="lazy" src={aboutImage} alt="about" className="w-full h-full object-cover" />
                </div>

                <div className="lg:-col-start-6 lg:col-span-4 lg:row-start-8 lg:row-span-4 flex flex-col ustify-center gap-4 lg:mt-0 mt-8  ">
                    <ul className="flex flex-col gap-2 bg-secondary p-8 rounded-2xl">
                        {aboutContent.hero.philosophy.map((item, index) => (
                            <li key={index} className="philosophy-item text-lg text-nowrap flex items-center gap-2 leading-tight text-dark font-medium"><span><item.Icon size={18} strokeWidth={2} className="text-primary" /></span>{item.title}</li>
                        ))}
                    </ul>
                    <p className="hero-closing text-primary text-xl font-display leading-tight italic text-center">{aboutContent.hero.closing}</p>
                </div>
            </div>

            <hr className="mt-10 border-secondary mx-20" />

            <div className="lg:px-20 px-8 pt-20">
                <div className="lg:h-screen lg:grid lg:grid-cols-12 lg:grid-rows-10 flex flex-col lg:gap-4 gap-8">

                    <div className="lg:col-start-1 lg:col-span-5 lg:row-start-4 lg:row-span-2 gap-2 flex flex-col">
                        <h1 className="lg:text-5xl text-4xl font-semibold capitalize">{aboutContent.aboutMe.title}</h1>
                    </div>

                    <div className="relative lg:col-start-7 lg:col-span-6 lg:row-start-2 lg:row-span-8 gap-2 flex flex-col mt-4 lg:mt-0">
                        <img loading="lazy" src={aboutMeImage} alt="about" className="w-full h-full object-cover rounded-xl" />
                        <p className="lg:block hidden absolute lg:top-[30%] top-[80%] lg:left-0 left-[75%] lg:text-sm text-xs leading-tight translate-[-50%] w-[40%] bg-secondary font-medium shadow-xl p-4 rounded-xl">{`"${aboutContent.aboutMe.closing}"`}</p>
                    </div>

                    <div className="lg:col-start-1 lg:col-span-5 lg:row-start-5 lg:row-span-6 gap-2 flex flex-col">
                        {aboutContent.aboutMe.paragraphs.map((paragraph, index) => (
                            <p key={index} className="text-lg leading-tight">{paragraph}</p>
                        ))}
                        <p className="text-lg italic font-bold leading-tight">{aboutContent.aboutMe.quote}</p>
                    </div>

                </div>
            </div>

            <hr className="mt-10 border-secondary mx-20" />

            <div className="lg:px-20 px-8 py-20">
                <div className="lg:grid lg:grid-cols-12 lg:grid-rows-25 flex flex-col gap-8 lg:gap-4">

                    {/* Childhood */}
                    <div className="lg:col-start-5 lg:col-span-4 lg:row-start-2 lg:row-end-4 h-fit flex flex-col gap-2 justify-center border border-secondary lg:p-8 p-4 bg-secondary rounded-xl">
                        <div className="flex flex-col gap-2 ">
                            <h2 className="text-2xl font-semibold capitalize">{aboutContent.childhood.title}</h2>
                            <p className="text-lg leading-tight">{aboutContent.childhood.paragraph}</p>
                            <p className="text-lg leading-tight italic font-bold">{aboutContent.childhood.closing}</p>
                        </div>
                    </div>

                    {/* Childhood Image */}
                    <div className="lg:col-start-1 lg:col-span-4 lg:row-start-1 lg:row-span-25 flex flex-col gap-2">
                        <div className="w-full lg:sticky lg:top-28 flex flex-col items-center justify-start gap-4">
                            <img loading="lazy" src={childhoodImage} alt={aboutContent.childhood.image.alt} className="object-cover rounded-xl" />
                        </div>
                    </div>


                    {/* Writing */}
                    <div className="lg:col-start-9 lg:col-span-4 lg:row-start-4 lg:row-span-7 h-fit flex flex-col gap-2 justify-center border border-secondary lg:p-8 p-4 bg-secondary rounded-xl">
                        <div className="flex flex-col gap-2 ">
                            <h2 className="text-2xl font-semibold capitalize">{aboutContent.writing.title}</h2>
                            <p className="text-lg leading-tight">{aboutContent.writing.paragraph}</p>
                            <p className="font-display text-xl italic text-accent leading-tight">{aboutContent.writing.poem}</p>
                            <p className="text-lg leading-tight italic">{aboutContent.writing.poemClosing}</p>
                            <p className="text-lg leading-tight italic font-bold">{aboutContent.writing.closing}</p>
                        </div>
                    </div>

                    {/* Project Management */}
                    <div className="lg:col-start-5 lg:col-span-4 lg:row-start-7 lg:row-end-12 h-fit flex flex-col gap-2 justify-center border border-secondary lg:p-8 p-4 bg-secondary rounded-xl">
                        <div className="flex flex-col gap-2 ">
                            <h2 className="text-2xl font-semibold capitalize">{aboutContent.projectManagement.title}</h2>
                            <p className="text-lg leading-tight">{aboutContent.projectManagement.paragraph}</p>
                            <ul className="flex flex-col gap-1">
                                {aboutContent.projectManagement.questions.map((question) => (
                                    <li key={question} className="text-lg leading-tight">{question}</li>
                                ))}
                            </ul>
                            <p className="text-lg leading-tight italic font-bold">{aboutContent.projectManagement.closing}</p>
                            <p className="font-display text-xl italic text-accent leading-tight mt-2">{aboutContent.projectManagement.connection}</p>
                            {aboutContent.projectManagement.combination.map((item) => (
                                <p key={item.title} className="text-lg leading-tight">{item.title}</p>
                            ))}
                            <p className="text-lg leading-tight italic font-bold">{aboutContent.projectManagement.final}</p>
                        </div>
                    </div>

                    {/* Learning */}
                    <div className="lg:col-start-9 lg:col-span-4 lg:row-start-13 lg:row-end-17 h-fit flex flex-col gap-2 justify-center border border-secondary lg:p-8 p-4 bg-secondary rounded-xl">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-2xl font-semibold capitalize">{aboutContent.learning.title}</h2>
                            {aboutContent.learning.paragraphs.map((paragraph) => (
                                <p key={paragraph} className="text-lg leading-tight">{paragraph}</p>
                            ))}
                            <ul className="flex flex-col gap-1">
                                {aboutContent.learning.things.map((thing) => (
                                    <li key={thing} className="text-lg leading-tight italic font-bold">{thing}</li>
                                ))}
                            </ul>
                            <p className="text-lg leading-tight">{aboutContent.learning.statement}</p>
                            <p className="text-lg leading-tight italic font-bold">{aboutContent.learning.closing}</p>
                        </div>
                    </div>

                    {/* Why Write From Left */}
                    <div className="lg:col-start-5 lg:col-span-4 lg:row-start-17 lg:row-end-21 h-fit flex flex-col gap-2 justify-center border border-secondary lg:p-8 p-4 bg-secondary rounded-xl">
                        <div className="flex flex-col gap-2 ">
                            <h2 className="text-2xl font-semibold capitalize">{aboutContent.whyWriteFromLeft.title}</h2>
                            <p className="text-lg leading-tight">{aboutContent.whyWriteFromLeft.paragraphs[0]}</p>
                            <ul className="flex flex-col gap-1">
                                {aboutContent.whyWriteFromLeft.paragraphs.slice(1).map((item) => (
                                    <li key={item} className="text-lg leading-tight italic font-bold">{item}</li>
                                ))}
                            </ul>
                            <p className="text-lg leading-tight">{aboutContent.whyWriteFromLeft.description}</p>
                            <p className="font-display text-xl italic leading-tight text-accent">{aboutContent.whyWriteFromLeft.closing}</p>
                            <p className="text-lg leading-tight italic font-bold">{aboutContent.whyWriteFromLeft.statement}</p>
                        </div>
                    </div>

                    {/* Outside Work */}
                    <div className="lg:col-start-9 lg:col-span-4 lg:row-start-21 lg:row-end-25 h-fit flex flex-col gap-2 justify-center border border-secondary lg:p-8 p-4 bg-secondary rounded-xl">
                        <div className="flex flex-col gap-2 ">
                            <h2 className="text-2xl font-semibold capitalize">{aboutContent.outsideWork.title}</h2>
                            {aboutContent.outsideWork.paragraphs.map((paragraph) => (
                                <p key={paragraph} className="text-lg leading-tight">{paragraph}</p>
                            ))}
                            <p className="text-lg leading-tight">{aboutContent.outsideWork.description}</p>
                            <ul className="flex flex-col gap-1">
                                {aboutContent.outsideWork.statement.map((item) => (
                                    <li key={item} className="text-lg leading-tight italic font-bold">{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

            <hr className="border-secondary mx-20" />
            <div className="lg:px-20 px-8 py-20">
                <div className="flex flex-col gap-8  bg-primary text-white p-8 rounded-xl">
                    <h2 className="lg:text-6xl text-4xl font-semibold text-center capitalize">{aboutContent.footer.title}</h2>
                    <ul className="flex flex-col lg:flex-row justify-center items-center gap-4">
                        {aboutContent.footer.links.map((link) => (
                            <li key={link.label} ><Link className="text-sm hover:text-light hover:underline transition-all duration-300 text-secondary flex items-center gap-2" to={link.href}>{link.label} <ArrowUpRightIcon size={18} strokeWidth={2} /></Link></li>
                        ))}
                    </ul>

                </div>
            </div>
        </section >
    )
}

export default About