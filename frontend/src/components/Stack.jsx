import React from "react";
import './Stack.css';


const logos = [
  "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg",
  "https://cdn.worldvectorlogo.com/logos/react-2.svg",
  "https://cdn.worldvectorlogo.com/logos/sass-1.svg",
  "https://cdn.worldvectorlogo.com/logos/npm-square-red-1.svg",
  "https://cdn.worldvectorlogo.com/logos/visual-studio-code-1.svg",
  "https://cdn.worldvectorlogo.com/logos/next-js.svg",
  "https://cdn.worldvectorlogo.com/logos/javascript-1.svg",
  "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg",
  "https://cdn.worldvectorlogo.com/logos/firebase-1.svg",
  "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg",
  "https://cdn.worldvectorlogo.com/logos/docker.svg",
  "https://cdn.worldvectorlogo.com/logos/linux-tux.svg",
  "https://cdn.worldvectorlogo.com/logos/git-icon.svg",
];

const Stack = () => {
  return (
    <div className="relative bg-[#1E293B] py-16 overflow-hidden">
      {/* Fading edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#1E293B] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#1E293B] to-transparent z-10" />

      <div className="whitespace-nowrap overflow-hidden">
        <div className="animate-marquee flex items-center space-x-16">
          {[...logos, ...logos].map((src, i) => (
            <img
              key={i}
              src={src}
              alt="logo"
              className="h-12 object-contain opacity-80 hover:opacity-100 transition"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stack;
