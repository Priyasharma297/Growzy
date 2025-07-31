import { useState, useEffect } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slices/productsSlice";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);

  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts(productFetchId));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleQuantityChange = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => {
        toast.success("Plant added to cart!", { duration: 1000 });
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      {selectedProduct && (
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow">
          <div className="flex flex-col md:flex-row">
            {/* Thumbnails */}
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {selectedProduct.images?.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                    mainImage === image.url
                      ? "border-green-600"
                      : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>

            {/* Main image */}
            <div className="md:w-1/2">
              <div className="mb-4">
                {mainImage && (
                  <img
                    src={mainImage}
                    alt="Main Plant"
                    className="w-full h-auto object-cover rounded-lg"
                  />
                )}
              </div>
            </div>

            {/* Mobile thumbnails */}
            <div className="md:hidden flex overflow-x-auto space-x-4 mb-4">
              {selectedProduct.images?.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                    mainImage === image.url
                      ? "border-green-600"
                      : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 md:ml-10">
              <h1 className="text-3xl font-semibold text-green-800 mb-2">
                {selectedProduct.name}
              </h1>
              
              {selectedProduct.discountPrice && (
                <p className="text-lg text-gray-500 line-through mb-1">
                  ₹{selectedProduct.price}
                </p>
              )}
              
              <p className="text-2xl text-green-700 font-semibold mb-2">
                ₹{selectedProduct.discountPrice || selectedProduct.price}
              </p>

              <p className="text-gray-600 mb-4">
                {selectedProduct.description}
              </p>

              {/* Quantity Selector */}
              <div className="mb-6">
                <p className="text-gray-700">Quantity:</p>
                <div className="flex items-center space-x-4 mt-2">
                  <button
                    onClick={() => handleQuantityChange("minus")}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded text-lg"
                  >
                    −
                  </button>
                  <span className="text-lg">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("plus")}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                disabled={isButtonDisabled}
                onClick={handleAddToCart}
                className={`bg-green-700 text-white py-2 px-6 rounded w-full mb-4 ${
                  isButtonDisabled
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-green-800"
                }`}
              >
                {isButtonDisabled ? "Adding..." : "ADD TO CART"}
              </button>

              {/* Plant Characteristics */}
              <div className="mt-10 text-gray-700">
                <h3 className="text-xl font-bold mb-4">Plant Details:</h3>
                <table className="w-full text-left text-sm">
                  <tbody>
                    <tr>
                      <td className="py-1 font-medium">Category</td>
                      <td className="py-1">
                        {selectedProduct.category || "Plant"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium">Pot Material</td>
                      <td className="py-1">
                        {selectedProduct.material || "Ceramic"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium">Sunlight</td>
                      <td className="py-1">
                        {selectedProduct.sunlight || "Indirect Light"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium">Watering</td>
                      <td className="py-1">
                        {selectedProduct.watering || "Twice a week"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Related Plants */}
          <div className="mt-20">
            <h2 className="text-2xl text-center font-medium text-green-800 mb-4">
              You May Also Like
            </h2>
            <ProductGrid
              products={similarProducts}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
