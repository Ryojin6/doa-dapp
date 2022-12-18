/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import MblNavbar from "./mblNavbar";
import { useSelector, useDispatch } from "react-redux";
import { openMblMenu } from "../redux/counterSlice";
import { useRouter } from "next/router";

const Navbar = ({ onConnect }) => {
  const [scroll, setScroll] = useState(false);

  const { mblMenu } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const handleSticky = function () {
    if (window.scrollY >= 100) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  const router = useRouter();
  const pid = router.asPath;

  useEffect(() => {
    window.addEventListener("scroll", handleSticky);
  }, []);

  if (mblMenu) {
    return (
      <div>
        <header
          className={
            scroll
              ? "js-page-header fixed top-0 z-50 w-full backdrop-blur transition-colors js-page-header--is-sticky h-full"
              : "js-page-header fixed top-0 z-50 w-full backdrop-blur transition-colors h-full"
          }
        >
          <div className="flex items-center px-6 py-6 xl:px-24 ">
            {/* <!-- Logo --> */}

            <Link href="/">
              <a className="shrink-0 block">
                <img src="/images/logo.png" alt="" className="max-h-7 h-auto" />
              </a>
            </Link>

            {/* <!-- Menu / Actions --> */}
            <MblNavbar onConnect={onConnect} />

            {/* <!-- Mobile Menu Actions --> */}
            <div className="ml-auto flex lg:hidden">
              {/* <!-- Profile --> */}
              <Link href="/">
                <a
                  className="border-a-black hover:bg-accent focus:bg-accent group ml-2 flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:border-transparent focus:border-transparent border-transparent bg-white/[.15]"
                  aria-label="profile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-a-black h-4 w-4 transition-colors group-hover:fill-a-black group-focus:fill-a-black"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M11 14.062V20h2v-5.938c3.946.492 7 3.858 7 7.938H4a8.001 8.001 0 0 1 7-7.938zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6z" />
                  </svg>
                </a>
              </Link>

              {/* <!-- Mobile Menu Toggle --> */}
              <button
                className="js-mobile-toggle border-a-black hover:bg-accent focus:bg-accent group ml-2 flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:border-transparent focus:border-transparent border-transparent bg-white/[.15]"
                aria-label="open mobile menu"
                onClick={() => dispatch(openMblMenu())}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="fill-a-black h-4 w-4 transition-colors group-hover:fill-a-black group-focus:fill-a-black"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M18 18v2H6v-2h12zm3-7v2H3v-2h18zm-3-7v2H6V4h12z" />
                </svg>
              </button>
            </div>
          </div>
        </header>
      </div>
    );
  } else {
    return (
      <div>
        <header
          className={
            scroll
              ? "js-page-header page-header--transparent fixed top-0 z-50 w-full bg-white/[.15] backdrop-blur transition-colors js-page-header--is-sticky"
              : scroll
              ? "js-page-header fixed top-0 z-50 w-full backdrop-blur transition-colors js-page-header--is-sticky"
              : "js-page-header fixed top-0 z-50 w-full backdrop-blur transition-colors"
          }
        >
          <div className="flex items-center px-6 py-6 xl:px-24">
            {/* <!-- Logo --> */}
            <Link href="/">
              <a className="shrink-0">
                <img src="/images/logo.png" alt="" className="w-32 h-auto" />
              </a>
            </Link>

            {/* <!-- Menu / Actions --> */}
            <MblNavbar onConnect={onConnect} />

            {/* <!-- Mobile Menu Actions --> */}
            <div className="ml-auto flex lg:hidden">
              {/* <!-- Mobile Menu Toggle --> */}
              <button
                className="js-mobile-toggle border-a-black hover:bg-white group ml-2 flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:border-transparent focus:border-transparent border-transparent bg-white/[.15]"
                aria-label="open mobile menu"
                onClick={() => {
                  dispatch(openMblMenu());
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="fill-a-black h-4 w-4 transition-colors group-hover:fill-a-black group-focus:fill-a-black"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M18 18v2H6v-2h12zm3-7v2H3v-2h18zm-3-7v2H6V4h12z" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* <Wallet_modal /> */}
      </div>
    );
  }
};

export default Navbar;
