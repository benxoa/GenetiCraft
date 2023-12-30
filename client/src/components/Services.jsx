import React from "react";
import image from "../assets/download.jpg";
import text from "../assets/text.jpg";
import code from "../assets/code.jpg";
import summary from "../assets/summary.png";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <>
      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
          <div class="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Our Ai Tools
            </h2>
            <p class="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
              Explore the whole collection of our Ai tools.
            </p>
          </div>
          <div class="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">

            <div class="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">

              <Link to={"/imagegenerate"}>
                <img
                  class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                  src={image}
                  alt="Bonnie Avatar"
                />
              </Link>
              <div class="p-5">
                <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <Link to={"/imagegenerate"}>Ai Text to Image Generator</Link>
                </h3>
                <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                  Transforming textual concepts into vibrant visual
                  representations
                </p>
              </div>
            </div>
            <div class="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
              <Link to={"/article-generator"}>
                <img
                  class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg "
                  src={image}
                  alt="Jese Avatar"
                />
              </Link>

              <div class="p-5">
                <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <Link to={"/article-generator"}>Ai Article Generator</Link>
                </h3>
                <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                  The Ai Article Generator redefines Article Writing
                </p>
              </div>
            </div>
            <div class="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
            <Link to={"/summerygenerate"}>
                <img
                  class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                  src={image}
                  alt="Sofia Avatar"
                />
              </Link>
              <div class="p-5">
                <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <Link to={"/summerygenerate"}>Ai Summary Generator</Link>
                </h3>
                <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                  The Ai Summary Generator epitomizes efficiency in content
                  comprehension.
                </p>
              </div>
            </div>
            <div class="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
              <Link to={"/plagrism-checker"}>
                <img
                  class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                  src={image}
                  alt="Sofia Avatar"
                />
              </Link>
              <div class="p-5">
                <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <Link to={"/plagrism-checker"}>Ai Plagrism Checker</Link>
                </h3>
                <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                  The Ai Chat Bot stands as an interactive digital companion
                </p>{" "}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
