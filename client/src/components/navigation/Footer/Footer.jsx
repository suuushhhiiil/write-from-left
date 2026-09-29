import { Link } from 'react-router-dom'
import { LinkedInIcon, TikTokIcon } from './icons'

const socialLinks = [
    { name: 'TikTok', href: 'https://www.tiktok.com/@khushbooks', Icon: TikTokIcon },
    // { name: 'Instagram', href: 'https://www.instagram.com/writefromleft', Icon: InstagramIcon },
    { name: 'LinkedIn', href: ' https://www.linkedin.com/in/khushboo-sangwan', Icon: LinkedInIcon },
]

const Footer = () => {
    return (
        <footer className="border-t bg-primary px-4 py-4 lg:px-20">
            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-3">
                <Link to="/" className="flex items-center justify-center gap-3 lg:justify-start">
                    <span className="text-lg font-medium text-light">Write From Left</span>
                </Link>

                <nav aria-label="Social media" className="flex items-center justify-center gap-2">
                    {socialLinks.map(({ name, href, Icon }) => (
                        <a
                            key={name}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={name}
                            className="inline-flex size-9 items-center justify-center rounded-md text-light transition-colors duration-300 hover:bg-secondary hover:text-primary"
                        >
                            <Icon size={16} />
                        </a>
                    ))}
                </nav>

                <div className="flex items-center justify-center gap-3 text-xs text-secondary lg:justify-end">
                    <p>© 2026 All rights reserved.</p>
                    <span aria-hidden="true" className="h-3 w-px bg-secondary" />
                    <Link to="/privacy-policy" className="transition-colors duration-300 hover:text-light">
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer
