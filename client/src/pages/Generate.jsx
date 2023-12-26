import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import preview from "../assets/preview.png";
import toast, { Toaster } from "react-hot-toast";

const Generate = () => {
  const [form, setform] = useState({
    prompt: "",
    photo: "",
  });
  const [generatingImg, setgeneratingImg] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["Authtoken"]);
  const [credits, setcredits] = useState(0);

  useEffect(() => {
    const fetchCredits = async () => {
      const userId = cookies.userId;
      try {
        const res = await fetch("http://localhost:8080/api/get-credits", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: userId
          })
        });
        if (res.status === 200) {
          const data = await res.json();
          setcredits(data.credits); 
        }
      } catch (error) {
        console.error("Error fetching credits:", error);
      }
    };
  
    const intervalId = setInterval(fetchCredits, 10000);
  
    return () => clearInterval(intervalId);
  }, [cookies.userId]);

  const Navigate = useNavigate();
  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = form.photo;
    link.download = "generated_image.jpg";
    link.click();
  };

  const generateImage = async (e) => {
    e.preventDefault();
    if (form.prompt) {
      if (credits < 3) {
        toast.error("Insufficient credits to generate more images");
      } else {
        try {
          setgeneratingImg(true);
          toast.loading("Generating image...");
          const response = await fetch("http://localhost:8080/api/generate", {
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
          const base64Image = `data:image/jpeg;base64,${data.photo}`;
          setform({ ...form, photo: base64Image });

          const res = await fetch("http://localhost:8080/api/deduct-credits", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: cookies.userId, amount: 3 }),
          });

          if (res.status === 200) {
            setcredits(credits - 4);
            toast.success("Image generated successfully");
          } else {
            toast.error("Failed to deduct credits");
          }
        } catch (error) {
          toast.error("There is an error processing the request!");
        } finally {
          setgeneratingImg(false);
          toast.dismiss();
        }
      }
    } else {
      toast.error("Please Enter The Prompt");
    }
  };
  

  function handleChange(e) {
    setform({ ...form, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    const token = cookies.Authtoken;
    if (!token) {
      Navigate("/login");
    }
  }, [cookies.Authtoken]);

  return (
    <>
      <Toaster />
      <div className="bg-gray-100 min-h-screen flex flex-col">
      <br />

        <main className="flex-1 flex items-center justify-center">
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
        </main>
        <br />
      </div>
    </>
  );
};

export default Generate;
