import React from 'react'
import productsContent from '../assets/products.js'
import coursesImage from '../images/products/courses.png'
import journalsImage from '../images/products/journals.png'
import digitalProductsImage from '../images/products/digital-products.png'
import { Link } from 'react-router-dom';

const ComingSoon = (product) => {
    const image = product.type.toLowerCase() === 'courses' ? coursesImage : journalsImage;
    return (
        <div className="flex flex-col min-w-1/3 rounded-xl overflow-hidden border border-secondary">
            <div className="relative">
                <img src={image} alt={product.type} className="w-full h-full object-cover" />
                <p className="text-xs text-dark w-fit bg-secondary px-2 py-1 rounded-full text-nowrap whitespace-nowrap absolute bottom-2 right-2">{product.status}</p>
            </div>
            <div className="flex flex-col gap-1 p-4">
                <h2 className="text-2xl font-bold">{product.type}</h2>
                <h3 className="text-lg font-semibold text leading-tight mt-3">{product.heading}</h3>
                <p className="leading-tight text-dark-accent">{product.description}</p>

            </div>
        </div>
    )
}

const Products = () => {
    return (
        <section className="pb-12 p-4 flex flex-col gap-8">
            <div className="products-hero h-screen overflow-hidden rounded-[3rem]">
                <div className="lg:px-20 px-8 bg-linear-to-t from-dark to-transparent w-full h-full flex flex-col gap-8 pt-12">
                    <h1 className="lg:text-7xl text-5xl text-light font-serif lg:w-2/3">{productsContent.hero.title}</h1>
                    <Link to={productsContent.hero.cta.href} className="btn-primary">
                        {productsContent.hero.cta.label}
                    </Link>
                </div>
            </div>


            <div className="lg:px-20 px-4 lg:-mt-32 -mt-50 min-h-screen">
                <div className="bg-light rounded-2xl p-6 flex flex-col gap-8">
                    <div className="lg:grid lg:grid-cols-12 flex lg:grid-rows-4 flex-col lg:gap-2 gap-4">
                        <div className="lg:col-span-4 lg:row-span-4 flex flex-col justify-center gap-4">
                            <h3 className="text-2xl font-semibold">{productsContent.hero.description[0]}</h3>
                            <div className="flex lg:flex-col items-start flex-wrap gap-1">
                                <ul className="flex flex-col gap-2 list-disc px-6">
                                    {productsContent.hero.description.map((description, index) => (
                                        index !== 0 && <li key={index} className="text-dark">{description}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="digital-products-card lg:col-span-7 lg:-col-start-8 lg:row-span-4 bg-dark overflow-hidden rounded-xl relative h-full p-6 flex flex-col justify-between gap-8 mt-4 lg:mt-0">
                            <div className="flex flex-col justify-between gap-6">
                                <h1 className="text-4xl text-light font-semibold">{productsContent.digitalProducts.title}</h1>
                                <ul className="flex flex-col gap-2 list-disc px-6">
                                    <li className="text-light">{productsContent.digitalProducts.description[0]}</li>
                                    <li className="text-light">{productsContent.digitalProducts.description[1]}</li>
                                    <li className="text-light">{productsContent.digitalProducts.description[2]}</li>
                                </ul>
                            </div>
                            <Link to={productsContent.digitalProducts.cta.href} className="btn-primary-invert mt-2">
                                {productsContent.digitalProducts.cta.label}
                            </Link>
                        </div>
                    </div>
                    <hr className="border-secondary" />
                    <div className="flex flex-col gap-4" id="collection">
                        <h2 className="text-4xl font-semibold">{productsContent.comingSoon.title}</h2>
                        <div className="flex lg:flex-row flex-col gap-4 overflow-x-auto overflow-y-hidden">
                            {productsContent.comingSoon.products.map((product, index) => (
                                <ComingSoon key={index} {...product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:px-20 p-4">
                <div className="lg:grid lg:grid-cols-12 flex flex-col border border-dark rounded-2xl">
                    <div className="lg:col-span-6 lg:row-span-4 flex flex-col gap-1 bg-dark rounded-2xl p-8 pt-8 text-light">
                        <h2 className="text-4xl font-semibold">{productsContent.philosophy.title}</h2>
                        <p className="text-dark-accent mt-3">{productsContent.philosophy.opening}</p>
                        <p className="text-dark-accent">{productsContent.philosophy.statement}</p>
                        <p className="text-dark-accent">{productsContent.philosophy.description}</p>
                        <p className="text-dark-accent">{productsContent.philosophy.closing}</p>
                    </div>
                    <div className="lg:col-span-6 lg:row-span-4 flex flex-col gap-1 rounded-2xl p-8 pt-8">
                        <h2 className="text-4xl font-semibold">{productsContent.contact.title}</h2>
                        <p className="text-dark-accent">{productsContent.contact.description}</p>
                        <p className="text-dark-accent">{productsContent.contact.statement}</p>
                        <Link to={productsContent.contact.cta.href} className="btn-primary mt-2">
                            {productsContent.contact.cta.label}
                        </Link>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Products;