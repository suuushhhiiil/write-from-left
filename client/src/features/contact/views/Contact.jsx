import { useState } from 'react'
import { Coffee } from 'lucide-react'
import contactContent from '../content/contact'
import heroImage from '@/assets/images/contact/hero.png'
import OptimizedImage from '@/components/common/OptimizedImage'
import { sendContactMessage } from '@/services/contact/contact.api'

const { hero, coffee, form, email } = contactContent

const fieldList = Object.values(form.fields)

const initialValues = Object.fromEntries(fieldList.map((field) => [field.name, '']))

const inputClassName =
    'w-full rounded-lg border border-secondary bg-light px-4 py-3 text-sm text-dark outline-none transition-colors duration-300 placeholder:text-dark-accent/70 focus:border-primary'

const labelClassName = 'text-xs font-medium tracking-wider text-dark-accent uppercase mb-2'

const Contact = () => {
    const [values, setValues] = useState(initialValues)
    const [status, setStatus] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target
        setValues((current) => ({ ...current, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')
        setStatus('')
        setIsSubmitting(true)

        try {
            await sendContactMessage(values)
            setStatus('Message sent. I will get back to you soon.')
            setValues(initialValues)
        } catch (err) {
            setError(err.response?.data?.message || 'Could not send your message. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="contact page-hero-offset pb-20 lg:px-20 px-4">
            <div className="rounded-3xl bg-light p-4 lg:p-6">
                <div className="grid items-stretch gap-6 lg:grid-cols-12 lg:gap-10">
                    <div className="relative min-h-105 overflow-hidden rounded-2xl lg:col-span-5 lg:min-h-180">
                        <OptimizedImage
                            src={heroImage}
                            alt={hero.title}
                            priority
                            className="absolute inset-0 h-full w-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-transparent  to-dark" />

                        <div className="relative z-10 flex h-full min-h-105 flex-col justify-between p-6 text-light lg:min-h-180 lg:p-10">
                            <h1 className="max-w-[14ch] font-display text-4xl leading-none font-medium lg:text-5xl">
                                {hero.title}
                            </h1>

                            <div className="flex max-w-md flex-col gap-3">
                                <p className="text-lg leading-tight font-light text-secondary">
                                    {hero.description} {""}
                                    <span className="font-display text-lg leading-tight italic text-accent">{hero.intro}</span></p>
                                <p className="text-sm leading-tight font-light text-secondary/90">
                                    {hero.closing}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center gap-8 py-2 lg:col-span-7 lg:py-6 lg:pr-6">
                        <div className="flex flex-col gap-2">
                            <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Coffee size={18} strokeWidth={1.75} />
                            </span>

                            <div className="flex flex-col gap-2">
                                <h2 className="font-display text-4xl leading-none font-medium lg:text-5xl">
                                    {coffee.title}
                                </h2>

                                <div className="mt-2 flex flex-col gap-1">
                                    {coffee.paragraphs.map((paragraph) => (
                                        <p key={paragraph} className="text-lg leading-tight font-light text-dark-accent">
                                            {paragraph}
                                        </p>
                                    ))}
                                    <p className="text-sm font-medium text-primary">
                                        {coffee.cta.label}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <hr className="border-secondary" />

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            {fieldList.map((field) => {
                                if (field.type === 'radio') {
                                    return (
                                        <fieldset key={field.name} className="flex flex-col">
                                            <legend className={labelClassName}>{field.label}</legend>
                                            <div className="flex flex-wrap gap-2">
                                                {field.options.map((option) => {
                                                    const selected = values[field.name] === option
                                                    return (
                                                        <label
                                                            key={option}
                                                            className={`cursor-pointer rounded-full border px-3 py-2 text-sm transition-colors duration-300 ${selected
                                                                ? 'border-primary bg-primary text-light'
                                                                : 'border-secondary bg-background text-dark hover:border-primary/40'
                                                                }`}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name={field.name}
                                                                value={option}
                                                                checked={selected}
                                                                onChange={handleChange}
                                                                required={field.required}
                                                                className="sr-only"
                                                            />
                                                            {option}
                                                        </label>
                                                    )
                                                })}
                                            </div>
                                        </fieldset>
                                    )
                                }

                                return (
                                    <div key={field.name} className="flex flex-col">
                                        <label htmlFor={field.name} className={labelClassName}>
                                            {field.label}
                                        </label>
                                        {field.type === 'textarea' ? (
                                            <textarea
                                                id={field.name}
                                                name={field.name}
                                                value={values[field.name]}
                                                onChange={handleChange}
                                                placeholder={field.placeholder}
                                                required={field.required}
                                                rows={5}
                                                className={`${inputClassName} resize-none`}
                                            />
                                        ) : (
                                            <input
                                                id={field.name}
                                                name={field.name}
                                                type={field.type}
                                                value={values[field.name]}
                                                onChange={handleChange}
                                                placeholder={field.placeholder}
                                                required={field.required}
                                                className={inputClassName}
                                            />
                                        )}
                                    </div>
                                )
                            })}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-2 w-full rounded-md bg-primary px-4 py-3 text-sm text-white transition-all duration-300 hover:bg-primary-dark disabled:opacity-60"
                            >
                                {isSubmitting ? 'Sending...' : form.submit.label}
                            </button>
                            {status && <p className="text-sm text-primary">{status}</p>}
                            {error && <p className="text-sm text-primary">{error}</p>}
                        </form>

                        <p className="text-sm text-dark-accent">
                            Prefer email?{' '}
                            <a
                                href={email.href}
                                className="font-medium text-dark underline underline-offset-4 transition-colors duration-300 hover:text-primary"
                            >
                                {email.address}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
