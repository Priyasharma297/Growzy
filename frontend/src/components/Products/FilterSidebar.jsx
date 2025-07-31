import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: "",
    sunlight: "",
    watering: "",
    maxPrice: 2000,
  });

  const [priceRange, setPriceRange] = useState(2000);

  const categories = ["Flowering", "Foliage", "Herbs", "Succulent", "Cactus"];
  const sunlightOptions = ["Full Sun", "Partial Shade", "Bright Light", "Indirect Light"];
  const wateringOptions = ["Low", "Medium", "Daily", "Once a week", "Twice a week"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || "",
      sunlight: params.sunlight || "",
      watering: params.watering || "",
      maxPrice: Number(params.maxPrice) || 2000,
    });
    setPriceRange(Number(params.maxPrice) || 2000);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const handlePriceChange = (e) => {
    const newPrice = parseInt(e.target.value);
    const newFilters = { ...filters, maxPrice: newPrice };
    setPriceRange(newPrice);
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== "") {
        params.set(key, value);
      }
    });
    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-green-800 mb-4">Filter Plants</h3>

      {/* Category */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Category</label>
        {categories.map((cat) => (
          <div key={cat} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={cat}
              checked={filters.category === cat}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-green-500 focus:ring-green-400 border-gray-300"
            />
            <span className="text-gray-800">{cat}</span>
          </div>
        ))}
      </div>

      {/* Sunlight */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Sunlight</label>
        {sunlightOptions.map((sun) => (
          <div key={sun} className="flex items-center mb-1">
            <input
              type="radio"
              name="sunlight"
              value={sun}
              checked={filters.sunlight === sun}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-green-500 focus:ring-green-400 border-gray-300"
            />
            <span className="text-gray-800">{sun}</span>
          </div>
        ))}
      </div>

      {/* Watering */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Watering</label>
        {wateringOptions.map((water) => (
          <div key={water} className="flex items-center mb-1">
            <input
              type="radio"
              name="watering"
              value={water}
              checked={filters.watering === water}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-green-500 focus:ring-green-400 border-gray-300"
            />
            <span className="text-gray-800">{water}</span>
          </div>
        ))}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Price Range (₹)</label>
        <input
          type="range"
          min={0}
          max={2000}
          value={priceRange}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 mt-2 text-sm">
          <span>₹0</span>
          <span>₹{priceRange}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
