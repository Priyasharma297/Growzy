import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBoxOpen, FaClipboardList, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/slices/cartSlice";
import { logout } from "../../redux/slices/authSlice";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* <div className="mb-6">
        <Link to="/admin" className="text-3xl font-bold text-green-800">
          Growzy
        </Link>
      </div> */}
      <h2 className="text-xl font-semibold mb-6 text-center text-green-700">Admin Dashboard</h2>

      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? "bg-green-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-green-900 hover:bg-green-200 hover:text-green-900 py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaUser />
          <span>Users</span>
        </NavLink>
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? "bg-green-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-green-900 hover:bg-green-200 hover:text-green-900 py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaBoxOpen />
          <span>Plants</span>
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? "bg-green-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-green-900 hover:bg-green-200 hover:text-green-900 py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>
      </nav>

      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center space-x-2"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
