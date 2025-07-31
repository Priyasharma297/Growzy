import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductGrid from "../components/Products/ProductGrid";

const WeatherSuggestions = () => {
  const [city, setCity] = useState("");
  const [actualCity, setActualCity] = useState(""); // confirmed city (on Enter or from location)
  const [weather, setWeather] = useState(null);
  const [plants, setPlants] = useState([]);

  function getLocalReason(plant) {
    const reasons = [];

    if (
      weather?.temp > 30 &&
      ["Cactus", "Succulent"].includes(plant.category)
    ) {
      reasons.push("🌞 Ideal for hot weather");
    }
    if (weather?.temp < 20 && ["Fern", "Peace Lily"].includes(plant.category)) {
      reasons.push("❄️ Prefers cooler temperatures");
    }
    if (
      weather?.humidity > 70 &&
      ["Daily", "Twice a week"].includes(plant.watering)
    ) {
      reasons.push("💧 Suited for humid climates");
    }
    if (
      weather?.condition === "Rain" &&
      ["Partial Shade", "Indirect Light"].includes(plant.sunlight)
    ) {
      reasons.push("🌥️ Grows well in low light/rainy conditions");
    }

    return reasons.length > 0
      ? reasons.join(", ")
      : "🌱 Suitable for current weather";
  }

  // Get user's location on load
  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const { data } = await axios.get(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=a2e84c136a26fcd35b2464ad6ed35474`
          );
          const cityName = data[0]?.name;
          setActualCity(cityName);
          setCity(cityName); // preload input
        } catch (err) {
          console.error("Reverse geocoding failed", err);
        }
      });
    }
  };

  const fetchWeatherAndPlants = async (selectedCity) => {
    try {
      const key = "a2e84c136a26fcd35b2464ad6ed35474";
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${key}&units=metric`
      );

      setWeather({
  temp: data.main.temp,
  feels_like: data.main.feels_like,
  humidity: data.main.humidity,
  condition: data.weather[0].main,
  icon: data.weather[0].icon,
  wind: data.wind.speed,
  country: data.sys.country,
  timezone: data.timezone,
});


      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/weather-suggested`,
        {
          params: {
            temp: data.main.temp,
            humidity: data.main.humidity,
            weather: data.weather[0].main,
          },
        }
      );

      setPlants(res.data);
    } catch (err) {
      console.error("Weather/Plants fetch error:", err);
    }
  };

  // Format city name to title case
  const formatCityName = (name) => {
    return name
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const formattedCity = formatCityName(city.trim());
      setActualCity(formattedCity);
    }
  };

  // Fetch on location or on confirmed city change
  useEffect(() => {
    if (actualCity) fetchWeatherAndPlants(actualCity);
  }, [actualCity]);

  useEffect(() => {
    fetchUserLocation();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-green-800 mb-4">
        🌿 Weather-Based Plant Suggestions
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left - Weather Info */}
        <div className="md:w-1/3 bg-green-50 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">
            📍 Weather in {actualCity || "..."}
          </h2>

          {weather ? (
            <ul className="space-y-1">
              <li>🌡️ Temperature: {weather.temp}°C</li>
              <li>💧 Humidity: {weather.humidity}%</li>
              <li>🌦️ Condition: {weather.condition}</li>
            </ul>
          ) : (
            <p className="text-gray-500">Fetching weather data...</p>
          )}

          <input
            type="text"
            placeholder="Enter city and press Enter..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyPress}
            className="mt-4 w-full border p-2 rounded focus:outline-none"
          />
        </div>

        {/* Right - Suggested Plants */}
        <div className="md:w-2/3">
          <h2 className="text-xl font-semibold mb-4 text-center uppercase">Suggested Plants</h2>
          {plants.length === 0 ? (
            <p className="text-gray-600">No matching plants found.</p>
          ) : (
            <>
              {/* Deduplicate and show all reasons only once */}
              <div className="mb-4 p-3 bg-green-100 rounded text-green-800 text-sm shadow">
                <p className="font-semibold mb-1">Why these plants?</p>
                <ul className="list-disc ml-5">
                  {[
                    ...new Set(
                      plants.flatMap((plant) =>
                        getLocalReason(plant).split(", ")
                      )
                    ),
                  ].map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
              </div>

              <ProductGrid products={plants} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherSuggestions;
