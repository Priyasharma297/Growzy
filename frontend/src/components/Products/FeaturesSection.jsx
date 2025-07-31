import React from 'react'
import { HiOutlineCreditCard, HiShoppingBag } from "react-icons/hi";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 bg-green-50">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="flex flex-col items-center">
          <div className="bg-green-200 text-green-900 p-4 rounded-full mb-4">
            <HiShoppingBag className="text-2xl" />
          </div>
          <h4 className="tracking-tight text-green-900 font-semibold mb-2">FREE SHIPPING PAN-INDIA</h4>
          <p className="text-gray-700 text-sm tracking-tight">
            On all orders over ₹999
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-green-200 text-green-900 p-4 rounded-full mb-4">
            <HiArrowPathRoundedSquare className="text-2xl" />
          </div>
          <h4 className="tracking-tight text-green-900 font-semibold mb-2">EASY 7-DAY RETURN</h4>
          <p className="text-gray-700 text-sm tracking-tight">
            Hassle-free replacement or refund
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-green-200 text-green-900 p-4 rounded-full mb-4">
            <HiOutlineCreditCard className="text-2xl" />
          </div>
          <h4 className="tracking-tight text-green-900 font-semibold mb-2">SECURE PAYMENTS</h4>
          <p className="text-gray-700 text-sm tracking-tight">
            UPI / Card / Netbanking available
          </p>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection;
