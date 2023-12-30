import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import icon from '../assets/icon.png'

const Navbars = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "Authtoken",
    "userId",
  ]);
  const [credits, setCredits] = useState(0);

  const isLoggedIn = cookies.Authtoken !== undefined;
  const HandleLogout = () => {
    removeCookie("Authtoken");
    removeCookie("userId");
    window.location.reload();
  };
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
          setCredits(data.credits);
        }
      } catch (error) {
        console.log(cookies.userId);
      }
    };

    fetchCredits();
  }, []);
  const [menuState, setMenuState] = useState("menu");

  function onToggleMenu() {
    setMenuState((prevState) => !prevState);
  }

  return (
    <header>
      <Navbar fluid rounded>
        <Navbar.Brand to="/">
          <img src={logo} className="mr-3 h-6 sm:h-9" alt="GenetiCraft Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            GenetiCraft
          </span>
        </Navbar.Brand>
        <div className=" flex md:order-2 ">
          {isLoggedIn ? (
            <>
              <Dropdown
                color="yellow"
                label="Ai Tools"
                className="focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                <Dropdown.Item>
                  <Link to={"/imagegenerate"}>Image Genereate</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to={"/summerygenerate"}>Summary Genereate</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to={"/article-generator"}>Article Genereate</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to={"/plagrism-checker"}>Plagrism Checker</Link>
                </Dropdown.Item>
              </Dropdown>

              <div className="mr-4"></div>

              <Dropdown
                className=""
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    alt="User settings"
                    img={icon}
                    rounded
                  />
                }
              >
                <Dropdown.Item><Link to={"/profile"}>User Profile</Link></Dropdown.Item>
                <Dropdown.Item><span className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-300 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Credits: {credits}
                </span></Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item><button
                  type="button"
                  onClick={HandleLogout}
                  className="block py-2 px-3 text-yellow-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Logout
                </button></Dropdown.Item>
              </Dropdown>

              <Navbar.Toggle />
            </>
          ) : (
            <>
              <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                <Link to={"/ai-tools"}>Try Now</Link>
              </button>

              <Navbar.Toggle />
            </>
          )}
        </div>
        <Navbar.Collapse>
          <li>
            <Link
              to="/"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-300 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-300 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-300 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Contact
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link
                  to="/store"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-300 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Credit Store
                </Link>
              </li>
              <li>
                <span className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-300 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Credits: {credits}
                </span>
              </li>
             
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-300 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-300 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Navbars;
