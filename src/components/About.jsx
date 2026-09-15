import { ArrowUpRightIcon, FileQuestionIcon } from 'lucide-react'
import aboutContent from '../assets/about.js'
import aboutMotion from '../motion/about.js'
import aboutImage from '../images/about/hero.webp'
import aboutMeImage from '../images/about/me.webp'
import childhoodImage from '../images/about/childhood.webp'
import { Link } from 'react-router-dom'
import OptimizedImage from './common/OptimizedImage.jsx'

const About = () => {
    aboutMotion();

    return (
        <section className="">
            <div className="lg:grid lg:grid-cols-12 lg:grid-rows-8 flex flex-col lg:items-start px-8 lg:px-20 py-10">
                <div className="lg:col-span-6 lg:row-span-2 lg:row-start-1 gap-2 flex flex-col">
                    <p className="hero-tagline text-xl text-primary leading-none">{aboutContent.hero.tagline}</p>
                    <h1 className="hero-title variable-hero-text text-5xl font-medium font-display leading-none capitalize overflow-hidden">{aboutContent.hero.title}</h1>
                </div>

                <div className="lg:-col-start-5 lg:col-span-5 lg:row-end-6 lg:row-start-3 flex flex-col gap-2 lg:mt-0 mt-4 overflow-hidden">
                    <p className="hero-paragraph text-lg font-light leading-tight">{aboutContent.hero.paragraph}</p>
                </div>

                <div className="lg:col-span-7 lg:col-start-1 lg:row-end-9 lg:row-start-3 gap-2 flex flex-col rounded-xl h-full overflow-hidden lg:mt-0 mt-8">
                    <OptimizedImage src={aboutImage} alt="about" priority className="hero-image w-full aspect-video object-cover rounded-xl" />
                </div>

                <div className="lg:-col-start-5 lg:col-span-4 lg:row-start-6 lg:row-end-9 mt- flex flex-col gap-4 lg:mt-0 mt-8  ">
                    <ul className="flex flex-col gap-2 bg-secondary p-8 rounded-2xl">
                        {aboutContent.hero.philosophy.map((item, index) => (
                            <li key={index} className="philosophy-item text-lg text-nowrap flex items-center gap-2 leading-tight text-dark font-medium"><span><item.Icon size={18} strokeWidth={2} className="text-primary" /></span>{item.title}</li>
                        ))}
                    </ul>
                    <p className="hero-closing text-primary font-display font-light leading-tight italic text-center">{aboutContent.hero.closing}</p>
                </div>
            </div>

            <hr className="mt-10 border-secondary mx-20" />

            <div className="lg:px-20 px-8 lg:py-0 py-20">
                <div className="lg:h-screen lg:grid lg:grid-cols-12 lg:grid-rows-10 flex flex-col lg:gap-4 gap-8">
                    <div className="lg:col-start-1 lg:col-span-5 lg:row-start-4 lg:row-span-2 gap-2 flex flex-col">
                        <h1 className="lg:text-5xl text-4xl font-semibold capitalize">{aboutContent.aboutMe.title}</h1>
                    </div>

                    <div className="relative lg:col-start-8 lg:col-span-5 lg:row-start-2 lg:row-end-10 gap-2 flex flex-col mt-4 lg:mt-0">
                        <OptimizedImage src={aboutMeImage} alt="about" className="w-full h-full object-cover rounded-xl" />

                        <p className="lg:block hidden absolute lg:top-[30%] top-[80%] lg:left-0 left-[75%] lg:text-sm text-xs leading-tight translate-[-50%] w-[40%] bg-secondary font-medium shadow-xl p-4 rounded-xl">{`"${aboutContent.aboutMe.closing}"`}</p>
                    </div>

                    <div className="lg:col-start-1 lg:col-span-5 lg:row-start-5 lg:row-span-6 gap-4 flex flex-col">
                        {aboutContent.aboutMe.paragraphs.map((paragraph, index) => (
                            <p key={index} className="text-lg font-light leading-tight">{paragraph}</p>
                        ))}
                        <p className="text-lg italic font-bold leading-tight">{aboutContent.aboutMe.quote}</p>
                    </div>

                </div>
            </div>

            <hr className="border-secondary mx-20" />

            <div className="lg:px-20 px-8 py-20">
                <div className="lg:grid lg:grid-cols-12 lg:grid-rows-8 flex flex-col gap-8 lg:gap-4">
                    <div className="lg:col-start-2 lg:col-span-4 lg:row-start-1 lg:row-end-9 flex flex-col gap-2">
                        <div className="w-full flex flex-col items-center justify-start gap-4">
                            <OptimizedImage src={childhoodImage} alt="childhood" className="object-cover rounded-xl" />
                        </div>
                    </div>
                    <div className="lg:col-start-7 lg:col-span-5 lg:row-start-1 lg:row-end-9 flex flex-col justify-center gap-4">
                        {aboutContent.aboutMe.childhood.content.map((content, index) => (
                            <p key={index} className="text-lg font-light leading-tight">{content}</p>
                        ))}
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