import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Summarize = () => {
  const Navigate = useNavigate();
  

  const [userInput, setUserInput] = useState("");
  const [firstDropdownValue, setFirstDropdownValue] = useState("");
  const [secondDropdownValue, setSecondDropdownValue] = useState("");
  const [serverData, setServerData] = useState("");

  const [cookies, setCookie, removeCookie] = useCookies(["Authtoken"]);
  const [credits, setcredits] = useState(0);
  useEffect(() => {
    const token = cookies.Authtoken;
    if (!token) {
      Navigate("/login");
    }
  }, [cookies.Authtoken]);


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
      } else if (wordCount >= 500) {
        toast.error("Word count must be less than 500!");
        return;
      }

      toast.loading("Summarizing your text...");

      const response = await axios.post(
        "/api/summerygenerator",
        {
          text: userInput,
          lang: firstDropdownValue,
          lines: secondDropdownValue,
        }
      );

      if (response.status === 200) {
        toast.dismiss();
        toast.success("Text Summarized Successfully!");
        setServerData(response.data.summary.microsoft.result);

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

  const handleFirstDropdownChange = (event) => {
    setFirstDropdownValue(event.target.value);
  };

  const handleSecondDropdownChange = (event) => {
    setSecondDropdownValue(event.target.value);
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-yellow-300 font-extrabold text-3xl">Summary Generator</h1>
        <div className="flex justify-between w-3/4 mt-4">
          <p>{wordCount} words</p>
          <p className="text-bg-zinc-300">Max 500 words</p>
        </div>
        <textarea
          placeholder="Enter text"
          value={userInput}
          onChange={handleUserInputChange}
          className="border-2 border-gray-400 p-2 m-2 rounded-md focus:outline-none focus:border-gray-600 w-3/4 h-40vh" // Set width to 75% and height to 40% of viewport height
        />
        <div className="flex">
          <select
            value={firstDropdownValue}
            onChange={handleFirstDropdownChange}
            className="border-2 border-gray-400 p-2 m-2 rounded-md focus:outline-none focus:border-gray-600"
          >
            <option value="en">English</option>
            <option value="ar">Arabic</option>
            <option value="hi">Hindi</option>
            <option value="es">Spanish</option>
            <option value="ur">Urdu</option>
            <option value="de">German</option>
            <option value="pt">Portuguese</option>
            <option value="zh">Chinese</option>
            <option value="tr">Turkish</option>
            <option value="ko">Korean</option>
            <option value="ja">Japanese</option>
          </select>

          <select
            value={secondDropdownValue}
            onChange={handleSecondDropdownChange}
            className="border-2 border-gray-400 p-2 m-2 rounded-md focus:outline-none focus:border-gray-600"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <button
          onClick={fetchDataFromServer}
          className="bg-yellow-300 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-gray-700"
        >
          Summarize
        </button>

        <div className="bg-white p-4 m-2 rounded-md w-3/4 h-40vh border-spacing-1 border border-slate-900 overflow-y-auto">
          <p>{serverData}</p>
        </div>
        <button
          onClick={copyToClipboard}
          className="bg-green-300 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-green-500 ml-2"
        >
          Copy Summarized Text
        </button>
      </div>
    </>
  );
};

export default Summarize;
