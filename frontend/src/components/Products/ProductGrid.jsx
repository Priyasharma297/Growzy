import React from 'react';
import { Link } from "react-router-dom";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product, index) => {
        const imageUrl = product?.images?.[0]?.url;
        const altText = product?.images?.[0]?.altText || product.name || "Plant";

        return (
          <Link key={index} to={`/product/${product._id}`} className="block">
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
              <div className="w-full h-96 mb-4">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={altText}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-lg text-gray-400 text-sm">
                    No Image Available
                  </div>
                )}
              </div>
              <h3 className="text-green-900 text-sm font-semibold mb-2">{product.name}</h3>
              <p className="text-green-700 font-medium text-sm tracking-tight">
                ₹ {product.price}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductGrid;
