import React from "react";

export const Hero = () => {
  return (
    <div className=" relative overflow-x-hidden bg-main-gradient h-1/2  md:min-h-screen">
      <div className="w-full flex flex-col  md:flex-row justify-between items-center ">
        {/* Brick pAttern */}
        <div className="overflow-x-hidden  hidden absolute -top-16  bg-[url(/brick-pattern.png)] bg-no-repeat bg-contain bg-top   opacity-5 w-1/2 min-h-screen md:flex flex-col justify-center items-center" />

        {/* world map */}
        <div className="overflow-x-hidden absolute -top-16 -right-80 bg-contain  bg-[url(/world.svg)]  self-end  bg-no-repeat bg-right opacity-50  w-1/2 h-1/2 mt-20 md:mt-0  md:min-h-screen flex flex-col justify-center items-center pl-[1000px]" />
      </div>

      {/* Navbar Logo */}
      <div className="w-full h-16 shadow-sm flex justify-start items-center bg-transparent  p-10">
        <h1 className="text-start text-white text-2xl font-semibold">
          SecureNet
        </h1>
      </div>

      {/* Main Content Div */}
      <div className="flex flex-row gap-1 w-full items-center justify-center h-screen  ">
        <input
          id="search-input"
          type="text"
          className="sm:w-[350px]   flex gap-10 px-4 py-2 text-red-500 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter your E-mail address"
        />

        <button className="py-2 px-4 rounded-lg bg-white">Get Updates</button>
      </div>
    </div>
  );
};
