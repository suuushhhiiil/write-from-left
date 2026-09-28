import React from 'react'
import productsContent from '../assets/products.js'
import coursesImage from '../images/products/courses.webp'
import journalsImage from '../images/products/journals.webp'
import digitalProductsImage from '../images/products/digital-products.webp'
import productsHeroImage from '../images/products/hero.webp'
import { Link } from 'react-router-dom';
import OptimizedImage from './common/OptimizedImage'

const ComingSoon = (product) => {
    const image = product.type.toLowerCase() === 'courses' ? coursesImage : journalsImage;
    return (
        <div className="flex flex-col w-full rounded-xl overflow-hidden border border-secondary bg-secondary p-4">
            <div className="h-full relative">
                <OptimizedImage src={image} alt={product.type} className="h-full object-cover rounded-lg" />
                <p className="text-xs text-dark w-fit bg-secondary px-2 py-1 rounded-full text-nowrap whitespace-nowrap absolute bottom-2 right-2">{product.status}</p>
            </div>
            <div className="flex flex-col gap-1 pt-4">
                <h2 className="text-2xl font-bold">{product.type}</h2>
                <h3 className="text-lg font-medium text leading-tight mt-2">{product.heading}</h3>
                <p className="leading-tight text-dark-accent">{product.description}</p>

            </div>
        </div>
    )
}

const Products = () => {
    return (
        <section className="py-4 flex flex-col gap-8 ">
            <div className="relative h-[80vh] overflow-hidden rounded-3xl lg:mx-20 mx-4 flex flex-col justify-end items-center p-4">
                <OptimizedImage
                    src={productsHeroImage}
                    alt={productsContent.hero.title}
                    priority
                    className="absolute inset-0 h-full w-full object-cover object-left"
                />
                <div className="relative z-10 backdrop-blur-xs flex flex-col justify-center items-center gap-8 p-4 rounded-2xl bg-light/50">
                    <h1 className="lg:text-7xl text-5xl text-center font-semibold font-display">{productsContent.hero.title}</h1>
                    <Link to={productsContent.hero.cta.href} className="btn-primary">
                        {productsContent.hero.cta.label}
                    </Link>
                </div>
            </div>


            <div className="lg:px-20 px-4 h-scren">
                <div className="bg-primary-dark overflow-hidden rounded-2xl relative h-full p-4 flex flex-col justify-between gap-8 mt-4 lg:mt-0">
                    <div className="flex flex-col justify-between gap-6 lg:w-[70%]">
                        <h1 className="text-4xl text-light font-semibold">{productsContent.digitalProducts.title}</h1>
                        <ul className="flex flex-col gap-2 list-disc px-6">
                            <li className="text-light">{productsContent.digitalProducts.description[0]}</li>
                            <li className="text-light">{productsContent.digitalProducts.description[1]}</li>
                            <li className="text-light">{productsContent.digitalProducts.description[2]}</li>
                        </ul>
                    </div>
                    <Link to={productsContent.digitalProducts.cta.href} target="_blank" rel="noopener noreferrer" className="btn-primary-invert mt-2">
                        {productsContent.digitalProducts.cta.label}
                    </Link>
                    <OptimizedImage src={digitalProductsImage} alt={productsContent.digitalProducts.title} className="aspect-video object-cover rounded-lg w-full h-full" />
                </div>

            </div>
            <hr className="border-secondary lg:mx-20 mx-4" />
            <div className="flex flex-col gap-4 lg:px-20 px-4" id="collection">
                <h2 className="text-4xl font-semibold">{productsContent.comingSoon.title}</h2>
                <div className="flex lg:flex-row flex-col gap-4 overflow-x-auto overflow-y-hidden">
                    {productsContent.comingSoon.products.map((product, index) => (
                        <ComingSoon key={index} {...product} />
                    ))}
                </div>
            </div>

            <div className="lg:px-20 px-4 py-12">
                <div className="lg:grid lg:grid-cols-12 flex flex-col border border-primary overflow-hidden rounded-2xl">
                    <div className="lg:col-span-6 lg:row-span-4 flex flex-col gap-1 bg-primary p-8 pt-8 text-light/60">
                        <h2 className="text-4xl font-semibold text-light">{productsContent.philosophy.title}</h2>
                        <p className=" mt-3">{productsContent.philosophy.opening}</p>
                        <p className="">{productsContent.philosophy.statement}</p>
                        <p className="">{productsContent.philosophy.description}</p>
                        <p className="">{productsContent.philosophy.closing}</p>
                    </div>
                    <div className="lg:col-span-6 lg:row-span-4 flex flex-col justify-around gap-4 rounded-2xl p-12">
                        <h2 className="text-4xl font-semibold capitalize">{productsContent.contact.title}</h2>
                        <div className="flex flex-col">
                            <p className="text-dark-accent leading-tight text-lg">{productsContent.contact.description}</p>
                            <p className="text-dark-accent leading-tight text-lg">{productsContent.contact.statement}</p>
                            <Link to={productsContent.contact.cta.href} className="btn-primary mt-2">
                                {productsContent.contact.cta.label}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Products;