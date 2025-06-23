import { Link } from "react-router-dom";
import React from "react";

const Hero = () => {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8 z-0">
        {/* Top Background Blur */}
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] sm:left-[calc(50%-30rem)] opacity-30"
            style={{
              width: "80rem",
              aspectRatio: "1155 / 678",
              transform: "translateX(-50%) rotate(30deg)",
              background: "linear-gradient(to top right, #ff80b5, #9089fc)",
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>

        {/* Hero Content */}
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <Link to='/learnmore'>
              <div className="relative rounded-full px-3 py-1 text-sm text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Revolutionizing the way the world votes.{" "}
                <a href="#" className="font-semibold text-indigo-600">
                  <span className="absolute inset-0" aria-hidden="true"></span>
                  Read more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
              Decentralized Voting For Modern Nepal.
            </h1>
            <p className="mt-8 text-lg text-gray-500 sm:text-xl">
              A secure and transparent voting system powered by blockchain
              technology. Ensuring tamper-proof elections, voter privacy, and
              verifiable results redefining trust in the voting process.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/vote">
                <a
                  href="#"
                  className="rounded-md bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Vote Now
                </a>
              </Link>
              <Link to="/learnmore">
                <a
                  href="#"
                  className="text-sm font-semibold text-gray-900 hover:text-indigo-600"
                >
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Background Blur */}
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] sm:left-[calc(50%+36rem)] opacity-30"
            style={{
              width: "43rem",
              aspectRatio: "1155 / 678",
              transform: "translateX(-50%)",
              background: "linear-gradient(to top right, #ff80b5, #9089fc)",
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
