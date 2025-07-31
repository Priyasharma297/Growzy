import heroImg from "../../assets/rabbit-hero.webp"; // Replace with a plant-related hero image if possible
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative">
      <img
        src={heroImg}
        alt="Lush Green Plants"
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-center text-white p-6">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase mb-4 text-green-100">
            Plants <br /> that love you back
          </h1>
          <p className="text-sm tracking-tight md:text-lg mb-6 text-green-200">
            Explore handpicked indoor & outdoor plants that refresh your space.
          </p>
          <Link
  to="/collections/all"
  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md text-lg transition"
>
  Shop Now
</Link>

        </div>
      </div>
    </section>
  );
};
