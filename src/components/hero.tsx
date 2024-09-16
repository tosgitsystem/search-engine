import Image from "next/image";
import React from "react";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden h-[40vh] md:min-h-[70vh] ">
      <div className="w-full flex flex-col md:flex-row justify-between items-center relative">
        {/* Brick pattern */}
        <div className="overflow-x-hidden  absolute -top-16 bg-[url(/brick-pattern.png)] bg-no-repeat bg-contain bg-top opacity-10 w-1/2 min-h-screen md:flex flex-col justify-center items-center z-0 pointer-events-none" />

        {/* World map */}
        <div className="overflow-x-hidden absolute md:-top-20 md:-right-80 min-h-[50vh] bg-contain bg-[url(/world.svg)] self-end bg-no-repeat bg-right opacity-20 md:opacity-30 w-[70%] h-[80%] md:w-[60%] md:h-[80%] md:min-h-screen flex flex-col justify-center items-center z-0 pointer-events-none" />
      </div>

      {/* Navbar Logo */}
      <div className="w-full  shadow-sm flex justify-start items-center bg-transparent ">
        {/* <h1 className="text-start text-white text-2xl font-semibold p-10">
          SecureNet
        </h1> */}
        <div className="px-5 pl-1 -mt-8 md:px-10 md:-mt-8">

      <Image src="/eek-monk-logo.png"  alt="eek-monk"  width={180} height={180} className=""/>
        </div>
      </div>

      {/* Main Content Div */}
      <div className="flex flex-row gap-3 w-full items-center justify-center h-[50vh] md:h-screen relative z-10  -mt-16 md:-mt-28 px-4">
        <input
          id="search-input"
          type="text"
          className="w-[250px] sm:w-[350px] flex gap-10 px-4 py-2 text-black rounded-md focus:outline-none focus:border-blue-500 z-20"
          placeholder="Search"
        />

        <button className="py-2 px-4 rounded-md cursor-pointer text-sm font-semibold bg-white z-20 text-nowrap">
          Get Updates
        </button>
      </div>
    </div>
  );
};
