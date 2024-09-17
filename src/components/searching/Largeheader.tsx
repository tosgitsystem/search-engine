import { Settings, MoreVertical } from "lucide-react";
import { Header } from "./Header";
import { Nav } from "./Nav";

export const LargeHeader = () => {
  return (
    <div className="overflow-hidden">
      {/* Settings and More Vertical Icons for Small Screens */}
      <div className="absolute top-2 right-2 my-2 flex space-x-4 md:hidden">
        <Settings className="h-5 w-5 text-white" />
      </div>
      <div className="absolute top-2 left-2 my-2 flex space-x-4 md:hidden">
        <MoreVertical className="h-5 w-5 text-white" />
      </div>
      <div className=" h-auto bg-gray-600 md:block flex flex-col md:items-center md:mt-0 -mt-6 ">
        <Header />
        <div className="md:px-52 lg:px-52 py-4 -mt-5 md:-mt-10 ">
          <Nav />
        </div>
      </div>
    </div>
  );
};
