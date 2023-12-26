import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
const About = () => {
  return (
    <>
      <section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto flex flex-col">
    <div class="lg:w-4/6 mx-auto">
      {/* <div class="rounded-lg h-64 overflow-hidden">
        {/* <img alt="content" class="object-cover object-center h-full w-full" src={logo}/> */}
      {/* </div> */}
      <div class="flex flex-col sm:flex-row mt-10">
        <div class="sm:w-1/3 text-center sm:pr-8 sm:py-8">
          <div class="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
            {/* <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg> */}
            <img src={logo} alt="founder png" />
          </div>
          <div class="flex flex-col items-center text-center justify-center">
            <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">aqxplay | Founder</h2>
            <div class="w-12 h-1 bg-yellow-300 rounded mt-2 mb-4"></div>
            <p class="text-base">As the founder and driving force behind GenetiCraft, I is a visionary leader blending a profound passion for technological innovation with a keen business acumen. With a background in Ai, I embarked on a mission to reshape the landscape of Ai Industry.</p>
          </div>
        </div>
        <div class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
          <p class="leading-relaxed text-lg mb-4">GenetiCraft's AI-driven image generation capabilities cater to diverse user needs, ranging from personal creative pursuits to professional and industry-specific applications. Its versatility and flexibility empower users to explore and innovate in various domains requiring visual content creation and manipulation.
          Image Generation: Users can produce unique and original visuals for various purposes, including digital art, illustrations, and graphic design.
Style Transfer: Applying different artistic styles to images, allowing for artistic experimentation and creativity.Content Creation: Generating visuals for social media, websites, and marketing materials to enhance brand identity and engagement.
Custom Graphics: Crafting specialized graphics, logos, and branding assets tailored to specific marketing needs.





</p>

{location.pathname !== '/' && (
            <Link to={'/'} className="text-yellow-300 inline-flex items-center">
              Go Back
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default About
