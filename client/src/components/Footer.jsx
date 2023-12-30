import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const Footer = () => {
  return (
    <footer>
      

<footer class="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <Link to="/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src={logo} class="h-8" alt="Footer Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">GenetiCraft</span>
            </Link>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <Link to="/about" class="hover:underline me-4 md:me-6">About</Link>
                </li>
                <li>
                    <Link to="/contact" class="hover:underline me-4 md:me-6">Contact</Link>
                </li>
                <li>
                    <Link to="/store" class="hover:underline me-4 md:me-6">Pricing</Link>
                </li>
                <li>
                    <Link to="/ai-tools" class="hover:underline me-4 md:me-6">Generative Ai</Link>
                </li>

            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link to='/' class="hover:underline">GenetiCraft</Link>. All Rights Reserved.</span>
    </div>
</footer>


    </footer>
  )
}

export default Footer
