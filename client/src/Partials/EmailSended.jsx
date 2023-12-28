import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const EmailSended = () => {
//     const Navigate = useNavigate();
//   const Redirecting = async () => {
//     toast.loading("Redirecting...");

//     setTimeout(() => {
//       toast.dismiss();
//       Navigate("/login");
//     }, 2500);
//   };
//   useEffect(() => {
//     Redirecting();
//   }, []);
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Toaster />
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
              Verify Your Email
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-yellow-300 md:text-4xl dark:text-white">
             An Actiavtion Link Has been send to your Email, Click on The link to Activate your account
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              When You successfully verified your account please Login
            </p>
          </div>
        </div>
      </section>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  )
}

export default EmailSended
