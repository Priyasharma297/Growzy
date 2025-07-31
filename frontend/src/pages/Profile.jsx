import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/slices/cartSlice';
import { logout } from '../redux/slices/authSlice';
import MyOrdersPage from './MyOrdersPage';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <div className="container mx-auto p-4 md:p-6 flex-grow">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          
          {/* Profile Info */}
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-lg rounded-xl p-6 bg-white text-center">
            <div className="text-6xl mb-4">👤</div>
            <h1 className="text-2xl font-bold mb-1 text-green-700">{user?.name}</h1>
            <p className="text-md text-gray-600 mb-4">{user?.email}</p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>

            {/* Plant Inspiration */}
<div className="mt-6 space-y-4">
  <div className="bg-green-50 border border-green-300 rounded-xl p-4 shadow-sm text-green-700 italic">
    “Grow through what you go through.” 🌱
  </div>
  <div className="bg-green-50 border border-green-300 rounded-xl p-4 shadow-sm text-green-700 italic">
    “Be like a cactus. Strong, resilient, and blooming.” 🌵
  </div>
  <div className="bg-green-50 border border-green-300 rounded-xl p-4 shadow-sm text-green-700 italic">
    “Stay rooted, but reach for the sky.” 🌿
  </div>
</div>

          </div>

          {/* Order History */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <MyOrdersPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
