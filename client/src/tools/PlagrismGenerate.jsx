import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";

const PlagrismGenerate = () => {
  const [userInput, setUserInput] = useState("");
  const [plgper, setplgper] = useState("Plagrism N/A");
//   const [unique, setunique] = useState(0);
  const [TextSorce, setTextSorce] = useState("");

  const [serverData, setServerData] = useState("");

  const [cookies, setCookie, removeCookie] = useCookies(["Authtoken"]);
  const [credits, setcredits] = useState(0);

  useEffect(() => {
    const fetchCredits = async () => {
      const userId = cookies.userId;
      try {
        const res = await fetch("http://localhost:8080/api/get-credits", {
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
        toast.error("Insufficient credits to generate more text plagrism");
        return;
      }

      if (wordCount === 0) {
        toast.error("Word count must be greater than zero!");
        return;
      } else if (wordCount >= 500) {
        toast.error("Word count must be less than 500!");
        return;
      }

      toast.loading("Checking Plagrism...");

      const response = await fetch(
        "http://localhost:8080/api/plagrismchecker",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },

          body: JSON.stringify({ text: userInput }),
        }
      );

      if (response.status === 200) {
        toast.dismiss();
        const data = await response.json();
        toast.success("Text Plagrism Checked Successfully!");

        setServerData(
          data.message.winstonai.items[0].candidates[0].plagiarized_text
        );

        setplgper(data.message.winstonai.items[0].candidates[0].prediction);
        // setunique(data.message.winstonai.plagia_score);
        setTextSorce(data.message.winstonai.items[0].candidates[0].url);

        const res = await fetch("http://localhost:8080/api/deduct-credits", {
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
      } else if (res.status === 500) {
        toast.dismiss();
        toast.error("Failed to check text Plagrism. Please try again later.");
      }
    } catch (error) {
      toast.dismiss();
      console.error("Error fetching data:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const wordCount = userInput.split(/\s+/).filter(Boolean).length;

  const handleUserInputChange = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-yellow-300 font-extrabold text-3xl">Plagrism Checker</h1>

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

        <button
          onClick={fetchDataFromServer}
          className="bg-yellow-300 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-gray-700"
        >
          Check Plagrism
        </button>
        <br />
        <h2>Plagrized Text</h2>

        <div className="bg-white p-4 m-2 rounded-md w-3/4 h-40vh border-spacing-1 border border-slate-900 overflow-y-auto">
          <p>{serverData}</p>
        </div>
        <div className="flex space-x-2">
          {/* <button className="bg-blue-400 text-white px-4 py-2 rounded-md focus:outline-none">
            Unique {unique}%
          </button> */}
          <button className="bg-green-400 text-white px-4 py-2 rounded-md focus:outline-none">
            {plgper}
          </button>
        </div>
        <h2>Plagrized Text Source</h2>

        <div className="bg-white p-4 m-2 rounded-md w-3/4 h-40vh border-spacing-1 border border-slate-900 overflow-y-auto">
          <p>{TextSorce}</p>
        </div>
      </div>
    </>
  );
};

export default PlagrismGenerate;
