import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

export const TopBar = () => {
  return (
    <div className="bg-[#2e7d32] text-white"> {/* Updated to dark green */}
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="hover:text-lime-300">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-lime-300">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-lime-300">
            <RiTwitterXLine className="h-4 w-4" />
          </a>
        </div>
        <div className="text-sm text-center flex-grow">
          <span>Your green companion — Fresh plants delivered to your door!</span>
        </div>
        <div className="text-sm hidden md:block">
          <a href="tel:+919876567899" className="hover:text-lime-300">
            +(91) 9876567899
          </a>
        </div>
      </div>
    </div>
  );
};
