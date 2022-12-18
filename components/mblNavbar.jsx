import React, { useEffect } from "react";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import { closeMblMenu } from "../redux/counterSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

const MblNavbar = ({ onConnect }) => {
  const { mblMenu, signerAddress } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) {
        dispatch(closeMblMenu());
      }
    });
  }, [dispatch, router]);

  return (
    <div
      className={
        mblMenu
          ? "js-mobile-menu invisible fixed inset-0 z-50 ml-auto items-center bg-white opacity-0 lg:visible lg:relative lg:inset-auto lg:flex lg:bg-transparent lg:opacity-100 nav-menu--is-open"
          : "js-mobile-menu invisible fixed inset-0 z-50 ml-auto items-center bg-white opacity-0 lg:visible lg:relative lg:inset-auto lg:flex lg:bg-transparent lg:opacity-100 "
      }
    >
      {/* <!-- Mobile Logo / Menu Close --> */}
      <div className="t-0 bg-white fixed left-0 z-50 flex w-full items-center justify-between p-6 lg:hidden">
        {/* <!-- Mobile Logo --> */}

        <Link href="/">
          <a>
            <img
              src="/images/logo.png"
              className="max-h-7"
              alt="Dead or Alive | Mint"
            />
          </a>
        </Link>

        {/* <!-- Mobile Menu Close --> */}
        <button
          className="js-mobile-close border-jacarta-100 hover:bg-black focus:bg-black group ml-2 flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:border-transparent focus:border-transparent border-transparent bg-black/[.15]"
          onClick={() => dispatch(closeMblMenu())}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="fill-black h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
          </svg>
        </button>
      </div>

      {/* <!-- Placeholder for mobile  --> */}
      <div className="relative mt-16 mb-8 w-full lg:hidden"></div>

      {/* <!-- Primary Nav --> */}
      <nav className="navbar w-full !z-50 relative">
        <ul className="flex flex-col lg:flex-row">
          <li
            className={mblMenu ? "group mt-8 xl:mt-12" : "group ml-8 xl:ml-12"}
          >
            {signerAddress == "0" ? (
              <button
                className="connect-wallet group bg-white hover:bg-black hover:text-white text-black flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors border-2"
                style={{ width: "100%" }}
                onClick={() => onConnect()}
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 group-hover:stroke-white"
                  fill="none"
                  stroke="black"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  ></path>
                </svg>
                <span
                  className="font-display mt-1 text-sm"
                  style={{ width: "100%" }}
                >
                  Connect Wallet
                </span>
              </button>
            ) : (
              <button
                className="connect-wallet bg-black flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors"
                style={{ cursor: "auto", width: "100%" }}
              >
                <span
                  className="font-display text-white mt-1 text-sm"
                  style={{ width: "100%" }}
                >
                  {signerAddress.substring(0, 6)}...{signerAddress.slice(-4)}
                </span>
              </button>
            )}
          </li>
        </ul>
      </nav>

      {/* <!-- Mobile Connect Wallet / Socials --> */}
      <div className="mt-10 w-full lg:hidden">
        <hr className="bg-jacarta-600 my-5 h-px border-0" />

        {/* <!-- Socials --> */}
        <div className="flex items-center justify-center space-x-5">
          <a href="https://twitter.com/DeadOrAliveNFT" className="group">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="twitter"
              className="group-hover:fill-black fill-black h-5 w-5"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
            </svg>
          </a>
        </div>
      </div>

      {/* <!-- Actions --> */}
      <div className="ml-8 hidden lg:flex xl:ml-12"></div>
    </div>
  );
};

export default MblNavbar;
