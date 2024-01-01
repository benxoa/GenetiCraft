import { useEffect, useState } from 'react'
import hero from '../assets/hero-img.webp'
import Pricing from '../components/Pricing'
import {Link } from 'react-router-dom'
import About from '../pages/About'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'
import Services from '../components/Services'
import Generate from '../tools/Generate'

import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import preview from "../assets/preview.png";
import toast, { Toaster } from "react-hot-toast";


function Home() {
  const [form, setform] = useState({
    prompt: "",
    photo: "",
  });
  const [generatingImg, setgeneratingImg] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["Authtoken"]);
  const [credits, setcredits] = useState(0);


  const Navigate = useNavigate();
  const downloadImage = () => {
    if (!cookies.Authtoken) {
      toast.error("Login Or Register to Donwlaod Image");
    } else {
      const link = document.createElement("a");
      link.href = form.photo;
      link.download = "generated_image.jpg";
      link.click();
    }
  };

  const generateImage = async (e) => {
    e.preventDefault();
    if (form.prompt) {
      

       
        try {
          setgeneratingImg(true);
          toast.loading("Generating image...");
          const response = await fetch(`/api/imagegenerator`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: form.prompt }),
          });

          if (!response.ok) {
            toast.error(error.message);
          }
          const data = await response.json();
          const base64Image = `data:image/jpeg;base64,${data.photo.replicate.items[0].image}`;

          setform({ ...form, photo: base64Image });
          toast.success("Image generated successfully");

          const res = await fetch("/api/deduct-credits", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: cookies.userId, amount: 4 }),
          });

          
        } catch (error) {
          toast.error("There is an error processing the request!");
        } finally {
          setgeneratingImg(false);
          toast.dismiss();
        }
      }
     else {
      toast.error("Please Enter The Prompt");
    }
  };

  function handleChange(e) {
    setform({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <>
<section class="text-gray-600">
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
<h1 className='flex justify-center align-text-top text-4xl'>Try Now</h1>
<Toaster />
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <br />

        <main className="flex-1 flex items-center justify-center">
          <div className="w-1/4 p-4"></div>
          <div
            className="max-w-4xl w-full p-8 bg-white rounded-lg shadow"
            style={{ minHeight: "80vh" }}
          >
            <h1 className="text-3xl font-semibold mb-6">Generate Image</h1>

            <form onSubmit={generateImage} className="flex flex-col space-y-4">
              <label htmlFor="prompt" className="text-lg font-medium">
                Enter Prompt:
              </label>
              <textarea
                id="prompt"
                name="prompt"
                className="border border-gray-300 rounded-md p-2 h-24 resize-none"
                placeholder="Describe the image you want to generate..."
                value={form.prompt}
                onChange={handleChange}
              ></textarea>
              <button
                type="submit"
                className="bg-yellow-300 text-white py-2 px-4 rounded-md hover:bg-black transition duration-300"
              >
                Generate
              </button>
            </form>

            <br />

            <div className=" w-full h-screen relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-3  flex justify-center items-center">
              {form.photo ? (
                <>
                  <img
                    src={form.photo}
                    alt={form.prompt}
                    className="w-full h-full object-contain"
                  />
                </>
              ) : (
                <img
                  src={preview}
                  alt="preview"
                  className="w-9/12 h-9/12 object-contain opacity-40"
                />
              )}
            </div>

            {form.photo && (
              <>
                <br />
                <button
                  onClick={downloadImage}
                  className="w-full text-white bg-yellow-300 hover:bg-yellow-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Download
                </button>
              </>
            )}
          </div>

          {/* Right Column for Ads */}
          <div className="w-1/4 p-4"></div>
        </main>
        <br />
      </div>
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
