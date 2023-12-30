import { useState } from 'react'
import hero from '../assets/hero-img.webp'
import Pricing from '../components/Pricing'
import ShowCase from '../components/ShowCase'
import {Link } from 'react-router-dom'
import About from '../pages/About'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'
import Services from '../components/Services'

function Home() {

  return (
    <>
<section class="text-gray-600 body-font">
  <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center animate-fade-in-up">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Visualize Your Ideas:
        <br class="hidden lg:inline-block"/> GenetiCraft All in One Generative Ai Hub.
      </h1>
      <p class="mb-8 leading-relaxed animate-fade-in-down">"GenetiCraft: All in One Generative AI Hub" is a pioneering platform revolutionizing creative and technical endeavors. This comprehensive hub, developed by a visionary team, integrates cutting-edge generative AI tools. From art and design to code generation and content creation, GenetiCraft serves as a central nexus for diverse AI-powered solutions. Seamlessly merging innovation with accessibility, it empowers users across disciplines to explore, experiment, and excel in their creative and technical pursuits, setting new benchmarks in generative AI capabilities.</p>
      <div class="flex justify-center animate-fade-in">
        <button class="inline-flex text-white bg-yellow-300 border-0 py-2 px-6 focus:outline-none hover:bg-black rounded text-lg animate-hover"><Link to="/generate">Try Now</Link></button>
        <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg animate-hover"><Link to="/about">Learn More</Link></button>
      </div>
    </div>
    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 animate-fade-in-right">
      <img class="object-cover object-center rounded" alt="hero" src={hero} />
    </div>
  </div>
</section>
{/* <Pricing /> */}
{/* <ShowCase /> */}
<About/>
<Testimonials />
<Services />
<Newsletter />





    </>
  )
}

export default Home
