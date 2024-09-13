import React from "react";

export const Hero = () => {
  return (
    <div className="relative overflow-x-hidden bg-main-gradient min-h-screen">
      <div className="w-full flex flex-col md:flex-row justify-between items-center relative">
        {/* Brick pattern */}
        <div className="overflow-x-hidden hidden absolute -top-16 bg-[url(/brick-pattern.png)] bg-no-repeat bg-contain bg-top opacity-15 w-1/2 min-h-screen md:flex flex-col justify-center items-center z-0 pointer-events-none" />

        {/* World map */}
        <div className="overflow-x-hidden absolute -top-16 -right-80 bg-contain bg-[url(/world.svg)] self-end bg-no-repeat bg-right opacity-30 w-[70%] h-[80%] md:w-[70%] md:h-[80%] md:min-h-screen flex flex-col justify-center items-center z-0 pointer-events-none" />
      </div>

      {/* Navbar Logo */}
      <div className="w-full  shadow-sm flex justify-start items-center bg-transparent ">
        <h1 className="text-start text-white text-2xl font-semibold p-10">
          SecureNet
        </h1>
      </div>

      {/* Main Content Div */}
      <div className="flex flex-row gap-3 w-full items-center justify-center h-screen relative z-10 -mt-28">
        <input
          id="search-input"
          type="text"
          className="sm:w-[350px] flex gap-10 px-4 py-2 text-black rounded-md focus:outline-none focus:border-blue-500 z-20"
          placeholder="Search"
        />

        <button className="py-2 px-4 rounded-md cursor-pointer text-sm font-semibold bg-white z-20">
          Get Updates
        </button>
      </div>
    </div>
  );
};
