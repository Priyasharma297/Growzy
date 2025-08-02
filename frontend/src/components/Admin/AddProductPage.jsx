import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/slices/adminProductSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const initialEmptyFormData = {
  name: "",
  scientificName: "",
  description: "",
  price: "",
  discountPrice: "",
  countInStock: "",
  sku: "",
  type: "Indoor",
  category: "",
  sunlight: "",
  watering: "",
  difficulty: "",
  idealFor: [],
  petFriendly: true,
  isFeatured: false,
  isPublished: true,
  tags: "",
  metaTitle: "",
  metaKeywords: "",
  dimensions: {
    height: "",
    width: "",
    potSize: "",
  },
  weight: "",
  images: [],
};

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ ...initialEmptyFormData });
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("dimensions.")) {
      const dimKey = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        dimensions: {
          ...prev.dimensions,
          [dimKey]: value,
        },
      }));
    } else if (["petFriendly", "isFeatured", "isPublished"].includes(name)) {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "idealFor") {
      const updated = formData.idealFor.includes(value)
        ? formData.idealFor.filter((i) => i !== value)
        : [...formData.idealFor, value];
      setFormData((prev) => ({ ...prev, idealFor: updated }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedImages = [];

    try {
      setUploading(true);
      for (let file of files) {
        const formData = new FormData();
        formData.append("image", file);

        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        uploadedImages.push({ url: data.imageUrl, altText: file.name });
      }

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedImages],
      }));
      toast.success("✅ Images uploaded successfully!");
    } catch (error) {
      console.error("Image upload failed", error);
      toast.error("❌ Failed to upload image(s)");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const cleanedData = {
        ...formData,
        tags: formData.tags.split(",").map((t) => t.trim()),
        price: Number(formData.price),
        discountPrice: Number(formData.discountPrice),
        countInStock: Number(formData.countInStock),
        weight: Number(formData.weight),
        dimensions: {
          height: Number(formData.dimensions.height),
          width: Number(formData.dimensions.width),
          potSize: formData.dimensions.potSize,
        },
      };

      await dispatch(createProduct(cleanedData)).unwrap();
      toast.success("✅ Product added successfully!");
      setFormData({ ...initialEmptyFormData });
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to add product");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-2xl rounded-xl">
      <h2 className="text-3xl font-bold mb-10 text-center text-green-700">Add New Plant Product</h2>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Basic Information */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Plant Name", name: "name", required: true, placeholder: "Ex: Snake Plant" },
              { label: "Scientific Name", name: "scientificName", placeholder: "Ex: Sansevieria trifasciata" },
              { label: "SKU Code", name: "sku", required: true, placeholder: "Unique SKU" },
              { label: "Category", name: "category", placeholder: "Ex: Succulent" },
            ].map(({ label, name, required, placeholder }) => (
              <div key={name}>
                <label className="block mb-1 font-medium text-gray-700">{label}</label>
                <input
                  name={name}
                  placeholder={placeholder}
                  onChange={handleChange}
                  required={required}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Pricing & Inventory</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Price (₹)", name: "price", type: "number", required: true },
              { label: "Discount Price (₹)", name: "discountPrice", type: "number" },
              { label: "Stock Count", name: "countInStock", type: "number", required: true },
              { label: "Weight (g)", name: "weight", type: "number" },
            ].map(({ label, name, type = "text", required }) => (
              <div key={name}>
                <label className="block mb-1 font-medium text-gray-700">{label}</label>
                <input
                  type={type}
                  name={name}
                  onChange={handleChange}
                  required={required}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Product Description</label>
          <textarea
            name="description"
            onChange={handleChange}
            required
            className="w-full min-h-[120px] px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Describe the plant..."
          />
        </div>

        {/* Care Attributes */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Care Attributes</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                label: "Type",
                name: "type",
                options: ["Indoor", "Outdoor"],
                required: true,
              },
              {
                label: "Sunlight",
                name: "sunlight",
                options: ["Full Sun", "Partial Shade", "Bright Light", "Indirect Light"],
              },
              {
                label: "Watering",
                name: "watering",
                options: ["Low", "Medium", "Daily", "Once a week", "Twice a week"],
              },
              {
                label: "Difficulty",
                name: "difficulty",
                options: ["Easy", "Moderate", "Hard"],
              },
            ].map(({ label, name, options, required }) => (
              <div key={name}>
                <label className="block mb-1 font-medium text-gray-700">{label}</label>
                <select
                  name={name}
                  onChange={handleChange}
                  required={required}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="">Select</option>
                  {options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4"> Preferences</h3>
          <div className="flex flex-wrap gap-6">
            {["Home", "Office"].map((label) => (
              <label key={label} className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" name="idealFor" value={label} onChange={handleChange} />
                {label}
              </label>
            ))}
            {[
              { label: "Pet Friendly", name: "petFriendly" },
              { label: "Featured", name: "isFeatured" },
              { label: "Published", name: "isPublished" },
            ].map(({ label, name }) => (
              <label key={name} className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" name={name} checked={formData[name]} onChange={handleChange} />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Metadata */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">SEO Metadata</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "tags", placeholder: "Tags (comma-separated)" },
              { name: "metaTitle", placeholder: "Meta Title" },
              { name: "metaKeywords", placeholder: "Meta Keywords" },
            ].map(({ name, placeholder }) => (
              <input
                key={name}
                name={name}
                placeholder={placeholder}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            ))}
          </div>
        </div>

        {/* Dimensions */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Dimensions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "dimensions.height", placeholder: "Height (cm)" },
              { name: "dimensions.width", placeholder: "Width (cm)" },
              { name: "dimensions.potSize", placeholder: "Pot Size" },
            ].map(({ name, placeholder }) => (
              <input
                key={name}
                name={name}
                placeholder={placeholder}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            ))}
          </div>
        </div>

        {/* Image Upload */}
        
         <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="file:bg-gray-300 file:text-gray-800 file:border file:border-gray-400 file:px-4 file:py-2 file:rounded file:cursor-pointer"
          />
          {uploading && <p className="text-sm text-blue-500 mt-2">Uploading...</p>}
          <div className="flex gap-4 mt-4 flex-wrap">
            {formData.images.map((image, index) => (
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

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-40 bg-green-600 text-white py-3 px-6 rounded-lg font-medium text-lg hover:bg-green-700 transition"
          >
             Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
