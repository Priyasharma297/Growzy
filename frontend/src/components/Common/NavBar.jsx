import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { SearchBar } from "./SearchBar";
import { CartDrawer } from "../Layout/CartDrawer";
import { useSelector } from "react-redux";

export const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="text-2xl font-bold text-green-700">
          Growzy
        </Link>

        {/* desktop links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/collections/all"
            className="text-gray-700 hover:text-green-700 text-sm font-medium uppercase"
          >
            All
          </Link>
          <Link
            to="/collections/all?type=Indoor"
            className="text-gray-700 hover:text-green-700 text-sm font-medium uppercase"
          >
            Indoor Plants
          </Link>
          <Link
            to="/collections/all?type=Outdoor"
            className="text-gray-700 hover:text-green-700 text-sm font-medium uppercase"
          >
            Outdoor Plants
          </Link>
          <Link
            to="/weather-suggestions"
            className="text-gray-700 hover:text-green-700 text-sm font-medium uppercase"
          >
            <span>✨</span> 
          </Link>
        </div>

        {/* right icons */}
        <div className="flex items-center space-x-4">
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="bg-green-600 px-2 rounded text-sm text-white hover:bg-green-700"
            >
              Admin
            </Link>
          )}
          <Link to="/profile" className="hover:text-green-700">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="relative hover:text-green-700"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 bg-green-600 text-white text-xs rounded-full px-2 py-0.5">
                {cartItemCount}
              </span>
            )}
          </button>
          <SearchBar />
          <button
            onClick={() => setNavDrawerOpen(!navDrawerOpen)}
            className="md:hidden"
          >
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>

      <CartDrawer
        drawerOpen={drawerOpen}
        toggleCartDrawer={() => setDrawerOpen(!drawerOpen)}
      />

      {/* mobile menu */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setNavDrawerOpen(false)}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <nav className="p-4 space-y-4">
          <h2 className="text-xl font-semibold mb-4 text-green-700">Menu</h2>
          <Link
            to="/collections/all"
            className=" block text-gray-700 hover:text-green-700 "
          >
            All
          </Link>
          <Link
            to="/collections/all?type=Indoor"
            onClick={() => setNavDrawerOpen(false)}
            className="block text-gray-600 hover:text-green-700"
          >
            Indoor Plants
          </Link>
          <Link
            to="/collections/all?type=Outdoor"
            onClick={() => setNavDrawerOpen(false)}
            className="block text-gray-600 hover:text-green-700"
          >
            Outdoor Plants
          </Link>
          <Link
            to="/weather-suggestions"
             onClick={() => setNavDrawerOpen(false)}
            className="block text-gray-600 hover:text-green-700"
          >
            <span>✨</span> 
          </Link>
        </nav>
      </div>
    </>
  );
};
