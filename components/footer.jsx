import React from "react";
import Link from "next/link";

const footer = () => {
  return (
    <>
      {/* <!-- Footer --> */}
      <footer className="bg-black page-footer">
        <div className="container">
          <div className="grid grid-cols-6 gap-x-7 gap-y-14 pt-12 pb-12 md:grid-cols-12">
            <div className="col-span-3 md:col-span-4">
              {/* <!-- Socials --> */}
              <div className="flex space-x-5">
                <Link href="https://twitter.com/DeadOrAliveNFT">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group cursor-pointer"
                  >
                    <svg className="icon group-hover:fill-black fill-black h-5 w-5">
                      <use xlinkHref={`/icons.svg#icon-twitter`}></use>
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default footer;
