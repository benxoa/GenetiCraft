import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";
import { PayPalButton } from "react-paypal-button-v2";
import { Link, useNavigate } from "react-router-dom";

const CreditStore = () => {
  const [credits, setCredits] = useState("");

  const [cookies, setCookie, removeCookie] = useCookies([
    "Authtoken",
    "userId",
  ]);
  const Navigate = useNavigate();
  useEffect(() => {
    const userId = cookies.userId;
    const token = cookies.Authtoken;
    if (!userId || !token) {
      Navigate("/login");
    }
  }, []);

  const cardcredits = {
    PRO: 120,
    PRO_MAX: 230,
    BUSINESS: 340,
  };

  const handleBuyNow = async (creditsToBuy) => {
    try {
      const userId = cookies.userId;
      if (!userId || userId === undefined || userId === null) {
        toast.error("Please reLogin to purchase!");
      } else if (creditsToBuy <= 0) {
        toast.error("Please specify credits to purchase");
      } else {
        const res = await fetch("http://localhost:8080/api/purchase-credits", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            userId: userId,
            purchasedTokens: Number(creditsToBuy),
          }),
        });
        if (res.status === 200) {
          toast.loading("Purchasing credits...");

          setTimeout(() => {
            toast.dismiss();
            toast.success("Purchased successfully");
          }, 1600);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }
    } catch (error) {
      toast.error("There was an error processing the purchase");
    }
  };

  const handlePayment = async () => {
    try {
      const paymentResponse = await fetch(
        "http://localhost:8080/api/create-payment",
        {
          method: "POST",
        }
      );
      if (!paymentResponse.ok) {
        throw new Error("Network response was not ok.");
      }
      const paymentData = await paymentResponse.json();
      if (!paymentData || !paymentData.redirectUrl) {
        throw new Error("Redirect URL not found in the response.");
      }
      window.location.href = paymentData.redirectUrl;
      console.log(paymentResponse.status);
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  const createOrder_PRO = (data) => {
    return fetch("http://localhost:8080/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
     
          
            PlanName: "PRO",
            credits: cardcredits.PRO,
            price: 5.99,

          

      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };

  const onApprove_PRO = async (data) => {
    const res = await fetch(
      `http://localhost:8080/api/orders/${data.orderID}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      }
    );
    const order = await res.json();
    console.log(order.status);
    if (order.status === "COMPLETED") {
      await handleBuyNow(cardcredits.PRO);
    } else {
      toast.error("There was an error in purchasing credits");
    }
  };

  const createOrder_PRO_MAX = (data) => {
    return fetch("http://localhost:8080/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

            PlanName: "PRO MAX",
            credits: cardcredits.PRO_MAX,
            price: 9.99,

    
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };
  const onApprove_PRO_MAX = async (data) => {
    const res = await fetch(
      `http://localhost:8080/api/orders/${data.orderID}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      }
    );
    const order = await res.json();
    console.log(order.status);
    if (order.status === "COMPLETED") {
      await handleBuyNow(cardcredits.PRO_MAX);
    } else {
      toast.error("There was an error in purchasing credits");
    }
  };

  const createOrder_BUSINESS = (data) => {
    return fetch("http://localhost:8080/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        PlanName: "BUSINESS",
        credits: cardcredits.BUSINESS,
        price: 14.99,
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };
  const onApprove_BUSINESS = async (data) => {
    const res = await fetch(
      `http://localhost:8080/api/orders/${data.orderID}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      }
    );
    const order = await res.json();
    console.log(order.status);
    if (order.status === "COMPLETED") {
      await handleBuyNow(cardcredits.BUSINESS);
    } else {
      toast.error("There was an error in purchasing credits");
    }
  };

  return (
    <>
      <Toaster />

      <section class="text-gray-600 body-font overflow-hidden">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-20">
            <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
              Credits Store
            </h1>
            <div class="flex mx-auto border-2 border-yellow-500 rounded overflow-hidden mt-6"></div>
          </div>
          <div class="flex flex-wrap -m-4">
          <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
        <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
          <h2 className="text-sm tracking-widest title-font mb-1 font-medium">START</h2>
          <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">Free</h1>
          <p className="flex items-center text-gray-600 mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Free 15 Credits
          </p>
          <p className="flex items-center text-gray-600 mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Max 3 Image Generations
          </p>
          <p className="flex items-center text-gray-600 mb-6">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Valid upto 1 mount
          </p>
          <Link ><button className="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">Free
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button></Link>
        </div>
        </div>
            <div class="p-4 xl:w-1/4 md:w-1/2 w-full">
              <div class="h-full p-6 rounded-lg border-2 border-yellow-500 flex flex-col relative overflow-hidden">
                <span class="bg-yellow-300 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                  POPULAR
                </span>
                <h2 class="text-sm tracking-widest title-font mb-1 font-medium">
                  PRO
                </h2>
                <h1 class="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                  <span>$5.99</span>
                </h1>
                <p class="flex items-center text-gray-600 mb-2">
                  <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  120 Credits
                </p>
                <p class="flex items-center text-gray-600 mb-2">
                  <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Max 30 Image Generations
                </p>
                <p class="flex items-center text-gray-600 mb-2">
                  <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Valid Upto 5 years
                </p>

                <p class="flex items-center text-gray-600 mb-6">
                  <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  High Quality Images
                </p>

                <PayPalButton
                  createOrder={(data, actions) =>
                    createOrder_PRO(data, actions)
                  }
                  onApprove={(data, actions) => onApprove_PRO(data, actions)}
                />
              </div>
            </div>
            <div class="p-4 xl:w-1/4 md:w-1/2 w-full">
              <div class="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                <h2 class="text-sm tracking-widest title-font mb-1 font-medium">
                  PRO MAX
                </h2>
                <h1 class="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                  <span>$9.99</span>
                </h1>
                <p class="flex items-center text-gray-600 mb-2">
                  <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  230 Credits
                </p>
                <p class="flex items-center text-gray-600 mb-2">
                  <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Max 50+ Image Generations
                </p>
                <p class="flex items-center text-gray-600 mb-2">
                  <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Valid upto 5 years
                </p>
                <p class="flex items-center text-gray-600 mb-2">
                  <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  4k Image Quality
                </p>
                <p class="flex items-center text-gray-600 mb-6">
                  <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  24/7 Support
                </p>
                <PayPalButton
                  createOrder={(data, actions) =>
                    createOrder_PRO_MAX(data, actions)
                  }
                  onApprove={(data, actions) =>
                    onApprove_PRO_MAX(data, actions)
                  }
                />
              </div>
            </div>
            <div class="p-4 xl:w-1/4 md:w-1/2 w-full">
              <div class="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                <h2 class="text-sm tracking-widest title-font mb-1 font-medium">
                  BUSINESS
                </h2>
                <h1 class="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                  <span>$14.99</span>
                </h1>
                <p class="flex items-center text-gray-600 mb-2">
                  <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  340 Credits
                </p>
                <p class="flex items-center text-gray-600 mb-2">
                  <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Max 80+ Image Generations
                </p>
                <p class="flex items-center text-gray-600 mb-2">
                  <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Valid upto 5 years
                </p>
                <p class="flex items-center text-gray-600 mb-2">
                  <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  4k Image Quality
                </p>
                <p class="flex items-center text-gray-600 mb-6">
                  <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  24/7 Support
                </p>
                <PayPalButton
                  createOrder={(data, actions) =>
                    createOrder_BUSINESS(data, actions)
                  }
                  onApprove={(data, actions) =>
                    onApprove_BUSINESS(data, actions)
                  }
                />
              </div>

            </div>
          </div>

          
        </div>

      </section>
    </>
  );
};

export default CreditStore;
