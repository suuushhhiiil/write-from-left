import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, X } from 'lucide-react'
import projects from '../assets/projects'
import firstDraftImage from '../images/home/first-draft.png'
import project01 from '../images/projects/01.png'
import project02 from '../images/projects/02.png'
import project03 from '../images/projects/03.png'

const projectImages = {
    current: firstDraftImage,
    '01': project01,
    '02': project02,
    '03': project03,
}

const currentCard = {
    number: '00',
    title: projects.currentProject.project.title,
    tagline: projects.currentProject.project.tagline,
    description: projects.currentProject.project.description,
    details: projects.currentProject.project.details,
    role: projects.currentProject.project.role,
    categories: ['Currently Building'],
    status: projects.currentProject.project.status,
    cta: projects.currentProject.project.cta,
    sectionTitle: projects.currentProject.sectionTitle,
    imageKey: 'current',
}

const projectCards = [
    currentCard,
    ...projects.selectedProjects.projects.map((project) => ({
        ...project,
        imageKey: project.number,
    })),
]

const ProjectMedia = ({ project, className = '' }) => {
    const image = projectImages[project.imageKey]

    if (image) {
        return (
            <img loading="lazy"
                src={image}
                alt={project.title}
                className={`h-full w-full object-cover ${className}`}
            />
        )
    }

    return (
        <div className={`flex h-full w-full items-end bg-linear-to-br from-secondary via-secondary to-background p-6 ${className}`}>
            <span className="font-serif text-6xl leading-none text-accent/50">{project.number}</span>
        </div>
    )
}

const ProjectCard = ({ project, onOpen }) => (
    <article className="group flex flex-col gap-4">
        <button
            type="button"
            onClick={() => onOpen(project)}
            className="flex flex-col gap-4 text-left"
        >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary">
                <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
                    <ProjectMedia project={project} />
                </div>

                <span className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full bg-background text-primary shadow-sm transition-colors duration-300 group-hover:bg-primary group-hover:text-light">
                    <ArrowUpRight size={16} strokeWidth={2} />
                </span>

                {project.status && (
                    <span className="absolute bottom-4 left-4 rounded-md bg-background/90 px-2 py-1 text-[10px] font-medium tracking-widest text-primary uppercase">
                        {project.status}
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <h2 className="text-2xl leading-tight font-bold">
                    {project.title}
                </h2>
                <p className="text-lg leading-tight font-light text-dark-accent">
                    {project.description}
                </p>
                <div className="mt-1 flex flex-wrap gap-2">
                    {project.categories.map((category) => (
                        <span
                            key={category}
                            className="rounded-full border border-secondary bg-secondary/70 px-3 py-1 text-[10px] font-medium tracking-widest text-dark-accent uppercase"
                        >
                            {category}
                        </span>
                    ))}
                </div>
            </div>
        </button>
    </article>
)

const ProjectDialog = ({ project, onClose }) => {
    const dialogRef = useRef(null)
    const scrollRef = useRef(null)
    const image = projectImages[project.imageKey]

    useEffect(() => {
        const dialog = dialogRef.current
        const scrollRoot = scrollRef.current
        if (!dialog) return

        const scrollY = window.scrollY
        const html = document.documentElement
        const body = document.body

        dialog.showModal()
        html.classList.add('dialog-open')
        body.style.top = `-${scrollY}px`
        window.dispatchEvent(new Event('lenis:stop'))

        const isInsideDialogScroll = (target) => (
            scrollRoot instanceof HTMLElement && scrollRoot.contains(target)
        )

        const preventPageScroll = (event) => {
            if (isInsideDialogScroll(event.target)) {
                const canScroll = scrollRoot.scrollHeight > scrollRoot.clientHeight
                if (!canScroll) {
                    event.preventDefault()
                } else if (event.type === 'wheel') {
                    const atTop = scrollRoot.scrollTop <= 0 && event.deltaY < 0
                    const atBottom = scrollRoot.scrollTop + scrollRoot.clientHeight >= scrollRoot.scrollHeight - 1 && event.deltaY > 0
                    if (atTop || atBottom) event.preventDefault()
                }
                event.stopPropagation()
                return
            }

            event.preventDefault()
            event.stopPropagation()
        }

        const handleCancel = (event) => {
            event.preventDefault()
            onClose()
        }

        dialog.addEventListener('cancel', handleCancel)
        document.addEventListener('wheel', preventPageScroll, { passive: false, capture: true })
        document.addEventListener('touchmove', preventPageScroll, { passive: false, capture: true })

        return () => {
            dialog.removeEventListener('cancel', handleCancel)
            document.removeEventListener('wheel', preventPageScroll, { capture: true })
            document.removeEventListener('touchmove', preventPageScroll, { capture: true })
            if (dialog.open) dialog.close()
            html.classList.remove('dialog-open')
            body.style.top = ''
            window.dispatchEvent(new CustomEvent('lenis:start', { detail: { scrollY } }))
        }
    }, [onClose])

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) onClose()
    }

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby="project-dialog-title"
            className="project-dialog m-0 h-dvh max-h-none w-full max-w-none border-0 bg-transparent p-0 text-dark"
            onClick={handleBackdropClick}
        >
            <div
                className="flex h-full items-center justify-center overflow-hidden p-4 lg:p-8"
                onClick={handleBackdropClick}
            >
                <article
                    ref={scrollRef}
                    className="project-dialog-scroll relative max-h-full w-full max-w-5xl rounded-3xl bg-background shadow-2xl"
                    onClick={(event) => event.stopPropagation()}
                >
                    <div className="sticky top-0 z-10 h-0">
                        <div className="flex justify-end p-4 lg:p-6">
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Close project details"
                                className="flex size-10 items-center justify-center rounded-full bg-background text-primary shadow-sm transition-colors duration-300 hover:bg-primary hover:text-light"
                            >
                                <X size={20} strokeWidth={2} />
                            </button>
                        </div>
                    </div>

                    <div className={`relative overflow-hidden bg-secondary ${image ? 'aspect-[16/8]' : 'aspect-[16/7]'}`}>
                        <ProjectMedia project={project} />
                        {project.status && (
                            <span className="absolute bottom-4 left-4 rounded-md bg-background/90 px-2 py-1 text-[10px] font-medium tracking-widest text-primary uppercase lg:bottom-6 lg:left-6">
                                {project.status}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-8 p-6 lg:p-12">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-wrap items-center gap-3">
                                {project.sectionTitle && (
                                    <p className="text-xs font-medium tracking-wider text-accent uppercase underline underline-offset-4">
                                        {project.sectionTitle}
                                    </p>
                                )}
                                {project.number && project.number !== '00' && (
                                    <p className="text-xs font-medium tracking-widest text-accent uppercase">
                                        Project {project.number}
                                    </p>
                                )}
                            </div>

                            <h2 id="project-dialog-title" className="text-3xl leading-tight font-bold lg:text-5xl">
                                {project.title}
                            </h2>

                            {project.tagline && (
                                <p className="font-serif text-xl italic text-accent">
                                    {project.tagline}
                                </p>
                            )}

                            {project.role && (
                                <p className="text-xs font-semibold tracking-widest text-primary uppercase">
                                    {project.role}
                                </p>
                            )}

                            <p className="text-xl leading-tight font-light">
                                {project.description}
                            </p>

                            {project.details && (
                                <p className="text-lg leading-tight font-light text-dark-accent">
                                    {project.details}
                                </p>
                            )}

                            {project.categories?.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {project.categories.map((category) => (
                                        <span
                                            key={category}
                                            className="rounded-full border border-secondary bg-secondary/70 px-3 py-1 text-[10px] font-medium tracking-widest text-dark-accent uppercase"
                                        >
                                            {category}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {project.challenge && (
                            <div className="rounded-2xl bg-secondary p-6">
                                <p className="text-xs font-medium tracking-wider text-accent uppercase underline underline-offset-4">
                                    The challenge
                                </p>
                                <p className="mt-3 text-xl leading-tight font-light">
                                    {project.challenge}
                                </p>
                            </div>
                        )}
                        <hr className="border-secondary" />
                        {project.sections?.length > 0 && (
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                                {project.sections.map((section) => (
                                    <div key={section.title} className="flex flex-col gap-3 rounded-2xl bg-secondary/70 p-6">
                                        <h3 className="text-xs font-medium tracking-wider text-accent uppercase underline underline-offset-4">
                                            {section.title}
                                        </h3>
                                        <p className="text-lg leading-tight font-light text-dark">
                                            {section.content}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {project.cta?.label && (
                            <a href={project.cta.href} className="btn-primary">
                                {project.cta.label} <span>→</span>
                            </a>
                        )}
                    </div>
                </article>
            </div>
        </dialog>
    )
}

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null)
    const closeDialog = useCallback(() => setSelectedProject(null), [])

    return (
        <section className="projects pb-20 lg:px-20 px-4">
            <div className="lg:grid lg:grid-cols-12 flex flex-col items-start gap-6 pt-10 lg:pt-16 lg:gap-8">
                <div className="lg:col-span-6 flex flex-col gap-2">
                    <h1 className="variable-hero-text text-5xl font-medium font-serif leading-none">
                        {projects.hero.title}
                    </h1>
                </div>
                <div className="lg:col-span-5 lg:col-start-8 flex flex-col lg:pt-3">
                    <p className="text-2xl ">
                        {projects.hero.heading}
                    </p>
                    <p className="text-2xl font-serif italic text-accent leading-tight font-light">
                        {projects.hero.description}
                    </p>
                    <p className="text- leading-tight font-light text-dark-accent mt-4">
                        {projects.hero.intro}
                    </p>
                </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 lg:mt-14 lg:grid-cols-2">
                {projectCards.map((project) => (
                    <ProjectCard
                        key={project.number || project.title}
                        project={project}
                        onOpen={setSelectedProject}
                    />
                ))}
            </div>

            <div className="mt-24 border-t border-secondary pt-16 lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-full flex flex-col gap-4  border border-secondary rounded-2xl p-4 bg-secondary/70">
                    <p className="text-xs font-medium tracking-wider text-accent uppercase underline underline-offset-4">
                        {projects.note.title}
                    </p>
                    <div className="flex flex-col gap-1">

                        <p className="text-md italic leading-tight font-light">
                            {projects.note.paragraphs.join(' ')}
                        </p>
                        <p className="font-medium text-md italic">
                            {projects.note.conclusion}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-20 rounded-3xl bg-primary p-6 text-background lg:p-12">
                <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-8">
                    <div className="lg:col-span-7 flex flex-col gap-2">
                        <h2 className="text-4xl font-bold lg:text-5xl">
                            {projects.contact.title}
                        </h2>
                        <p className="text-xl leading-tight font-light text-secondary">
                            {projects.contact.paragraphs.join(' ')}
                        </p>
                        <p className="font-serif text-xl italic text-accent mt-8">
                            {projects.contact.statement}
                        </p>
                        <Link to="/contact" className="w-fit rounded-md bg-background px-4 py-2 text-sm text-primary transition-all duration-300 hover:bg-secondary">
                            {projects.contact.cta.label} <span>→</span>
                        </Link>
                    </div>
                    <div className="mt-8 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:flex lg:justify-end">
                    </div>
                </div>
            </div>

            {selectedProject && (
                <ProjectDialog
                    project={selectedProject}
                    onClose={closeDialog}
                />
            )}
        </section>
    )
}

export default Projects
