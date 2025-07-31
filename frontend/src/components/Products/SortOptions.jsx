import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  };

  return (
    <div className="mb-4 flex items-center justify-end">
      <label htmlFor="sort" className="mr-2 text-green-700 font-medium">Sort by:</label>
      <select
        onChange={handleSortChange}
        id="sort"
        value={searchParams.get("sortBy") || ""}
        className="border border-green-500 text-green-800 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
      >
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High (₹)</option>
        <option value="priceDesc">Price: High to Low (₹)</option>
      </select>
    </div>
  );
};

export default SortOptions;
