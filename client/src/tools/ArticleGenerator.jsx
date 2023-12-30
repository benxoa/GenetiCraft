import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const ArticleGenerator = () => {
  const Navigate = useNavigate();
  

  const [userInput, setUserInput] = useState("");
  const [serverData, setServerData] = useState("");

  const [cookies, setCookie, removeCookie] = useCookies(["Authtoken"]);
  const [credits, setcredits] = useState(0);

  useEffect(() => {
    const fetchCredits = async () => {
      const userId = cookies.userId;
      try {
        const res = await fetch("/api/get-credits", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
          }),
        });
        if (res.status === 200) {
          const data = await res.json();
          setcredits(data.credits);
        }
      } catch (error) {
        console.error("Error fetching credits:", error);
      }
    };

    const intervalId = setInterval(fetchCredits, 4000);

    return () => clearInterval(intervalId);
  }, [cookies.userId]);

  const fetchDataFromServer = async () => {
    try {
      if (credits < 4) {
        toast.error("Insufficient credits to generate more text summaries");
        return;
      }

      if (wordCount === 0) {
        toast.error("Word count must be greater than zero!");
        return;
      }

      toast.loading("Generating your Article...");

      const response = await axios.post(
        "/api/articlegenerator",
        {
          text: userInput,
        }
      );
    //   const data =await response.json();

      if (response.status === 200) {
        toast.dismiss();
        toast.success("Article Geneated Successfully!");
        setServerData(response.data.message
.mistral.generated_text);
        // console.log(response)
        // console.log(data)

        const res = await fetch("/api/deduct-credits", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: cookies.userId, amount: 4 }),
        });
        if (res.status === 200) {
            setcredits(credits - 4);
          } else {
            toast.error("Failed to deduct credits");
          }
      } else if(res.status === 500) {
        toast.dismiss();
        toast.error("Failed to summarize text. Please try again later.");
      }

    } catch (error) {
      toast.dismiss();
      console.error("Error fetching data:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(serverData);
    toast.success("Summarized text copied to clipboard!");
  };

  const wordCount = userInput.split(/\s+/).filter(Boolean).length;

  const handleUserInputChange = (event) => {
    setUserInput(event.target.value);
  };

  useEffect(() => {
    const token = cookies.Authtoken;
    if (!token) {
      Navigate("/login");
    }
  }, [cookies.Authtoken]);




  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-yellow-300 font-extrabold text-3xl">Article Generator</h1>
        <div className="flex justify-between w-3/4 mt-4">
          {/* <p>{wordCount} words</p> */}
          {/* <p className="text-bg-zinc-300">Max 500 words</p> */}
        </div>
        <textarea
          placeholder="Enter prompt..."
          value={userInput}
          onChange={handleUserInputChange}
          className="border-2 border-gray-400 p-2 m-2 rounded-md focus:outline-none focus:border-gray-600 w-3/4 h-40vh" // Set width to 75% and height to 40% of viewport height
        />
        {/*  */}
        <button
          onClick={fetchDataFromServer}
          className="bg-yellow-300 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-gray-700"
        >
          Generate Article
        </button>

        <div className="bg-white p-4 m-2 rounded-md w-3/4 h-40vh border-spacing-1 border border-slate-900 overflow-y-auto">
          <p>{serverData}</p>
        </div>
        <button
          onClick={copyToClipboard}
          className="bg-green-300 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-green-500 ml-2"
        >
          Copy Article
        </button>
      </div>
    </>
  );
};

export default ArticleGenerator;
