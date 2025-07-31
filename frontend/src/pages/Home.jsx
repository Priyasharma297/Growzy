import { Hero } from "../components/Layout/Hero"
import FeaturedCollection from "../components/Products/FeaturedCollection"
import GenderCollectionSection from "../components/Products/GenderCollectionSection"
import NewArrivals from "../components/Products/NewArrivals"
import ProductDetails from "../components/Products/ProductDetails"
import ProductGrid from "../components/Products/ProductGrid"
import FeaturesSection from "../components/Products/FeaturesSection"
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react"
import axios from "axios";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";

const Home = () => {

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    dispatch(
      fetchProductsByFilters({
        type: "Indoor", // 🌱 switched from 'Top Wear' to 'Indoor Plants'
        limit: 8,
      })
    );
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />
      <h2 className="text-3xl text-center font-bold mb-4">
       🌿 Best Seller Plant
      </h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">Loading best seller plants...</p>
      )}
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
           🌱 Indoor Plants Collection
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
      <FeaturedCollection />
      <FeaturesSection />
    </div>
  )
}

export default Home
