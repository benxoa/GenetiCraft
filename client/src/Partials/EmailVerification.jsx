import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const EmailVerification = () => {
  const [user, setuser] = useState({
    VERIFIED: false,
    UNVERIFIED: true
  })


  const Navigate = useNavigate();

  // const Check =async()=> {
  //   const res = await fetch('https://localhost:8080/api/verify', {
  //     method: 'POST',
  //   })
  //   if (res.status === 400){
  //     console.log("Wrong response")

  //   }else if (res.status === 200){
  //     user.VERIFIED = true
  //     console.log("chloo gee")
  //   }
  // }

  const Redirecting = async () => {
    toast.loading("Redirecting...");

    setTimeout(() => {
      toast.dismiss();
      Navigate("/login");
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
              Congratulation
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-yellow-300 md:text-4xl dark:text-white">
              Your Email is verfied!
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Now We are Redirecting you to Login page...
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
  );
};

export default EmailVerification;
