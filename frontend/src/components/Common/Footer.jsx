import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="border-t py-12 bg-white">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
      {/* Newsletter */}
      <div>
        <h3 className="text-lg text-green-800 font-semibold mb-4">Newsletter</h3>
        <p className="text-gray-600 mb-4">
          Be the first to hear about new indoor & outdoor plant arrivals.
        </p>
        <p className="font-medium text-sm text-gray-700 mb-6">
          Sign up and get 10% off your first order.
        </p>
        <form className="flex">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 w-full text-sm border-t border-l border-b border-green-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 text-sm rounded-r-md hover:bg-green-700 transition-all"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Shop */}
      <div>
        <h3 className="text-lg text-green-800 font-semibold mb-4">Shop</h3>
        <ul className="space-y-2 text-gray-700">
          <li>
            <Link to="/collections/all?category=Indoor" className="hover:text-green-600 transition-colors">
              Indoor Plants
            </Link>
          </li>
          <li>
            <Link to="/collections/all?category=Outdoor" className="hover:text-green-600 transition-colors">
              Outdoor Plants
            </Link>
          </li>
        </ul>
      </div>

      {/* Support */}
      <div>
        <h3 className="text-lg text-green-800 font-semibold mb-4">Support</h3>
        <ul className="space-y-2 text-gray-700">
          <li>
            <Link to="#" className="hover:text-green-600 transition-colors">
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="#" className="hover:text-green-600 transition-colors">
              About Us
            </Link>
          </li>
          <li>
            <Link to="#" className="hover:text-green-600 transition-colors">
              Plant FAQs
            </Link>
          </li>
          <li>
            <Link to="#" className="hover:text-green-600 transition-colors">
              Care Tips
            </Link>
          </li>
        </ul>
      </div>

      {/* Social */}
      <div>
        <h3 className="text-lg text-green-800 font-semibold mb-4">Follow Us</h3>
        <div className="flex items-center space-x-4 mb-6 text-green-600">
          <a href="#" className="hover:text-green-700"><TbBrandMeta className="h-5 w-5" /></a>
          <a href="#" className="hover:text-green-700"><IoLogoInstagram className="h-5 w-5" /></a>
          <a href="#" className="hover:text-green-700"><RiTwitterXLine className="h-4 w-4" /></a>
        </div>
        <p className="text-gray-600">Call Us</p>
        <p className="text-green-700">
          <FiPhoneCall className="inline-block mr-2" />
          +(91) 98765‑67899
        </p>
      </div>
    </div>

    <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-green-200 pt-6">
      <p className="text-gray-500 text-sm tracking-tighter text-center">
        © 2025, Growzy. All Rights Reserved.
      </p>
    </div>
  </footer>
);
