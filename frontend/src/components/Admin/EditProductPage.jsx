import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct } from "../../redux/slices/adminProductSlice";
import { fetchProductDetails } from "../../redux/slices/productsSlice";
import axios from "axios";

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    plantType: "",
    potSizes: [],
    plantColors: [],
    sunlight: "",
    waterFrequency: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id) dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) setProductData(selectedProduct);
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProductData((prevData) => ({
        ...prevData,
        images: [...prevData.images, { url: data.imageUrl, altText: "" }],
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id, productData }));
    navigate("/admin/products");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-green-800">Edit Plant</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Plant Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            rows={4}
            required
          />
        </div>

        {/* Price */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            min="0"
          />
        </div>

        {/* Stock */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Stock Available</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            min="0"
          />
        </div>

        {/* SKU */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Pot Sizes */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Pot Sizes (comma-separated)</label>
          <input
            type="text"
            name="potSizes"
            value={productData.potSizes?.join(", ") || ""}
            onChange={(e) =>
              setProductData({
                ...productData,
                potSizes: e.target.value.split(",").map((s) => s.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Plant Colors */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Plant Colors (comma-separated)</label>
          <input
            type="text"
            name="plantColors"
            value={productData.plantColors?.join(", ") || ""}
            onChange={(e) =>
              setProductData({
                ...productData,
                plantColors: e.target.value.split(",").map((c) => c.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Plant Type */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Plant Type / Species</label>
          <input
            type="text"
            name="plantType"
            value={productData.plantType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Sunlight Requirement */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Sunlight Requirement</label>
          <input
            type="text"
            name="sunlight"
            value={productData.sunlight}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g., Full Sun, Partial Shade"
          />
        </div>

        {/* Watering Frequency */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Watering Frequency</label>
          <input
            type="text"
            name="waterFrequency"
            value={productData.waterFrequency}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g., Once a week"
          />
        </div>

        {/* Upload Images */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="file:bg-gray-300 file:text-gray-800 file:border file:border-gray-400 file:px-4 file:py-2 file:rounded file:cursor-pointer"
          />
          {uploading && <p className="text-sm text-blue-500 mt-2">Uploading...</p>}
          <div className="flex gap-4 mt-4 flex-wrap">
            {productData.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image.url}
                  alt={image.altText || "Plant Image"}
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Update Plant
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
