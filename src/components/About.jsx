import { FileQuestionIcon } from 'lucide-react'
import aboutContent from '../assets/about.js'
import aboutMotion from '../motion/about.js'
import aboutImage from '../images/about/04.png'
import aboutMeImage from '../images/about/07.png'

const About = () => {
    // aboutMotion();

    return (
        <section className="">
            <div className="h-screen lg:grid lg:grid-cols-12 lg:grid-rows-12 flex flex-col lg:items-start px-8 lg:px-20 pt-10">
                <div className="lg:col-span-6 lg:row-span-2 lg:row-start-1 gap-2 flex flex-col">
                    <p className="hero-tagline text-xl text-primary leading-none">{aboutContent.hero.tagline}</p>
                    <h1 className="hero-title variable-hero-text text-5xl font-medium font-serif leading-none capitalize">{aboutContent.hero.title}</h1>
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
                    <p className="hero-closing text-primary text-xl font-serif leading-tight italic text-center">{aboutContent.hero.closing}</p>
                </div>
            </div>

            <hr className="mt-10 border-secondary mx-20" />

            <div className="lg:px-20 px-4 pt-20">
                <div className="lg:h-screen lg:grid lg:grid-cols-12 lg:grid-rows-10 flex flex-col lg:gap-4 gap-8">
                    <div className="lg:col-start-1 lg:col-span-5 lg:row-start-4 lg:row-span-2 gap-2 flex flex-col">
                        <h1 className="lg:text-5xl text-4xl font-semibold capitalize">{aboutContent.aboutMe.title}</h1>
                    </div>

                    <div className="lg:col-start-1 lg:col-span-5 lg:row-start-5 lg:row-span-6 gap-2 flex flex-col">
                        {aboutContent.aboutMe.paragraphs.map((paragraph, index) => (
                            <p key={index} className="text-lg leading-tight">{paragraph}</p>
                        ))}
                        <p className="text-lg italic font-bold leading-tight">{aboutContent.aboutMe.quote}</p>
                    </div>

                    <div className="relative lg:col-start-7 lg:col-span-6 lg:row-start-2 lg:row-span-8 gap-2 flex flex-col mt-8 lg:mt-0">
                        <img loading="lazy" src={aboutMeImage} alt="about" className="w-full h-full object-cover rounded-xl" />
                        <p className="lg:block hidden absolute lg:top-[30%] top-[80%] lg:left-0 left-[75%] lg:text-sm text-xs leading-tight translate-[-50%] w-[40%] bg-secondary font-medium shadow-xl p-4 rounded-xl">{`"${aboutContent.aboutMe.closing}"`}</p>
                    </div>
                </div>
            </div>

            <div className="lg:px-20 px-8 pt-20">
                <div className="lg:h-screen lg:grid lg:grid-cols-12 lg:grid-rows-10 flex flex-col gap-4">

                </div>
            </div>

        </section>
    )
}

export default About