import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchOrderDetails } from "../redux/slices/orderSlice";
import {
  fetchPlantCareTips,
  resetPlantCare,
} from "../redux/slices/plantCareSlice";

// Modal component for care tips
const CareModal = ({ plantName, instruction, loadingAI, onClose }) => (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
      <h3 className="text-xl font-semibold mb-3 text-green-700">
        Care Tips for {plantName}
      </h3>
      {loadingAI ? (
        <p className="text-gray-500 italic">Generating care tips...</p>
      ) : (
        <ul className="list-disc list-inside text-gray-700 space-y-2">
  {Array.isArray(instruction) ? (
    instruction.map((tip, i) => {
      const [heading, ...rest] = tip.split(":");
      const body = rest.join(":"); // Preserve any extra colons

      return (
        <li key={i} className="text-sm leading-relaxed">
          <span className="font-semibold">{heading.trim()}:</span>
          <span className="ml-1">{body.trim()}</span>
        </li>
      );
    })
  ) : (
    <li className="text-sm">{instruction}</li>
  )}
</ul>

      )}
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Close
      </button>
    </div>
  </div>
);

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  const {
    plantName,
    careTips,
    loading: loadingAI,
    error: aiError,
  } = useSelector((state) => state.plantCare);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  const getGeminiInstructions = (plant) => {
    dispatch(fetchPlantCareTips(plant));
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(resetPlantCare());
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>

      {!orderDetails ? (
        <p>No Order details found!</p>
      ) : (
        <div className="p-4 sm:p-6 rounded-lg border">
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                Order ID: #{orderDetails._id}
              </h3>
              <p className="text-gray-600">
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
              <span
                className={`${
                  orderDetails.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                } px-3 py-1 rounded-full text-sm font-medium mb-2`}
              >
                {orderDetails.isPaid ? "Approved" : "Pending"}
              </span>
              <span
                className={`${
                  orderDetails.isDelivered
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                } px-3 py-1 rounded-full text-sm font-medium`}
              >
                {orderDetails.isDelivered ? "Delivered" : "Pending"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
              <p>Method: {orderDetails.paymentMethod}</p>
              <p>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
              <p>
                Method: {orderDetails.shippingMethod || "Standard Delivery"}
              </p>
              <p>
                Address:{" "}
                {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}
              </p>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
  <h4 className="text-lg font-semibold mb-4">Plants Ordered</h4>
  <div className="min-w-full inline-block align-middle">
    <table className="table-auto w-full text-gray-600 border-collapse">
      <thead className="bg-gray-100">
        <tr className="text-left">

                  <th className="py-2 px-4 text-left">Plant</th>
                  <th className="py-2 px-4">Price</th>
                  <th className="py-2 px-4">Qty</th>
                  <th className="py-2 px-4">Total</th>
                  <th className="py-2 px-4">Care</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orderItems.map((item, index) => (
                  <tr
                    key={item.productId?.toString() || index}
                    className="border-b align-middle"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg mr-4"
                        />
                        <Link
                          to={`/product/${item.productId}`}
                          className="text-emerald-600 hover:underline"
                        >
                          {item.name}
                        </Link>
                      </div>
                    </td>
                    <td className="py-3 px-4">₹{item.price}</td>
                    <td className="py-3 px-4">{item.quantity}</td>
                    <td className="py-3 px-4">₹{item.price * item.quantity}</td>
                    <td className="py-3 px-4">
                      <button
                        disabled={loadingAI && plantName === item.name}
                        onClick={() => getGeminiInstructions(item.name)}
                        className="text-sm bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700 disabled:opacity-60"
                      >
                        {loadingAI && plantName === item.name
                          ? "Loading..."
                          : "AI Care Tips"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>

          <Link to="/my-orders" className="text-emerald-600 hover:underline">
            ← Back to My Orders
          </Link>
        </div>
      )}

      {showModal && (
        <CareModal
          plantName={plantName}
          instruction={aiError ? aiError : careTips}
          loadingAI={loadingAI}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default OrderDetailsPage;
