import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAdminProducts } from "../redux/slices/adminProductSlice";
import { fetchAllOrders } from "../redux/slices/adminOrderSlice";

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.adminProducts);
  const {
    orders,
    totalOrders,
    totalSales,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6">🌱 Admin Dashboard</h1>

      {productsLoading || ordersLoading ? (
        <p className="text-green-600">Loading...</p>
      ) : productsError ? (
        <p className="text-red-500">Error fetching products: {productsError}</p>
      ) : ordersError ? (
        <p className="text-red-500">Error fetching orders: {ordersError}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 shadow-lg rounded-xl bg-green-50 border border-green-200">
            <h2 className="text-xl font-semibold text-green-800 mb-1">Revenue</h2>
            <p className="text-2xl font-bold text-green-900">
              {formatCurrency(totalSales)}
            </p>
          </div>

          <div className="p-6 shadow-lg rounded-xl bg-green-50 border border-green-200">
            <h2 className="text-xl font-semibold text-green-800 mb-1">Total Orders</h2>
            <p className="text-2xl font-bold text-green-900">{totalOrders}</p>
            <Link to="/admin/orders" className="text-green-600 hover:underline text-sm mt-1 inline-block">
              Manage Orders
            </Link>
          </div>

          <div className="p-6 shadow-lg rounded-xl bg-green-50 border border-green-200">
            <h2 className="text-xl font-semibold text-green-800 mb-1">Total Products</h2>
            <p className="text-2xl font-bold text-green-900">{products.length}</p>
            <Link to="/admin/products" className="text-green-600 hover:underline text-sm mt-1 inline-block">
              Manage Products
            </Link>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Recent Orders</h2>
        <div className="overflow-x-auto border border-green-100 rounded-lg shadow-sm">
          <table className="min-w-full text-left text-gray-700">
            <thead className="bg-green-100 text-xs uppercase text-green-800">
              <tr>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Total Price</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-green-50 cursor-pointer"
                  >
                    <td className="p-4">{order._id}</td>
                    <td className="p-4">{order.user?.name || "N/A"}</td>
                    <td className="p-4">{formatCurrency(order.totalPrice)}</td>
                    <td className="p-4 capitalize">{order.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
