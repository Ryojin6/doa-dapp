import Image from "next/image";
import Link from "next/link";
import React from "react";
import Meta from '../components/meta';

const Error_page = () => {
  return (
    <div>
      <Meta title="Dead or Alive | Error" />
      {/* <!-- 404 --> */}
      <section className="bg-jacarta-100 relative py-16 md:py-24 m-height">
          <div className="container">
            <div className="mx-auto max-w-lg text-center">
              <h1 className="text-black font-display mt-8 mb-6 text-4xl md:text-6xl">
                Page Not Found!
              </h1>
              <p className="text-black mb-12 text-lg leading-normal">
                Oops! The page you are looking for does not exist. It might have
                been moved or deleted.
              </p>
              <Link href="/">

                <button className="connect-wallet group hover:bg-black text-black hover:text-white flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors border-2"
                  style={{width: "100%"}}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:fill-white" viewBox="0 0 24 24" fill="#000000" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"/></svg>
                  <span className="font-display font-semibold mt-1" style={{width: "100%"}}>
                    Navigate Back Home
                  </span>
              </button>
              </Link>
            </div>
          </div>
      </section>
        {/* <!-- end 404 --> */}
    </div>
  );
};

export default Error_page;
