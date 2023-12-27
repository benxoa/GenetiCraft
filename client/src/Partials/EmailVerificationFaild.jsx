import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";


const EmailVerificationFaild = () => {
    const Navigate = useNavigate();
  const Redirecting = async () => {
    toast.loading("Redirecting...");

    setTimeout(() => {
      toast.dismiss();
      Navigate("/register");
    }, 2500);
  };
  useEffect(() => {
    Redirecting();
  }, []);

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
              Oops! Something went wrong
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-yellow-300 md:text-4xl dark:text-white">
              Your Email is not verfied!
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Now We are Redirecting you to Register page...
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

export default EmailVerificationFaild
