import outdoorPlantsImg1 from "../../assets/outdoor-plants-1.webp";
import outdoorPlantsImg2 from "../../assets/outdoor-plants-2.webp";
import { Link } from "react-router-dom";

const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* First Plant Collection */}
        <div className="relative flex-1">
          <img
            src={outdoorPlantsImg1}
            alt="Outdoor Plants Collection 1"
            className="w-full h-[400px] md:h-[500px] lg:h-[550px] xl:h-[600px] object-cover rounded-xl"
          />
          <div className="absolute bottom-8 left-8 bg-white/90 p-4 rounded shadow-md">
            <h2 className="text-2xl font-bold text-green-800 mb-3">
              Lush Outdoor Picks
            </h2>
            <Link to="/collections/outdoor" className="text-green-700 underline font-medium">
              Shop Now
            </Link>
          </div>
        </div>

        {/* Second Plant Collection */}
        <div className="relative flex-1">
          <img
            src={outdoorPlantsImg2}
            alt="Outdoor Plants Collection 2"
            className="w-full h-[400px] md:h-[500px] lg:h-[550px] xl:h-[600px] object-cover rounded-xl"
          />
          <div className="absolute bottom-8 left-8 bg-white/90 p-4 rounded shadow-md">
            <h2 className="text-2xl font-bold text-green-800 mb-3">
              Evergreen Beauties
            </h2>
            <Link to="/collections/outdoor" className="text-green-700 underline font-medium">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
