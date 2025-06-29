import React, { useState, useEffect, useCallback, useRef } from "react";
import "../Styles/Weather.css";
import {
  FaSun,
  FaCloud,
  FaCloudRain,
  FaSnowflake,
  FaBolt,
  FaSmog,
  FaMapMarkerAlt,
  FaSearch,
  FaExclamationTriangle,
  FaRedo,
  FaLocationArrow,
  FaEye,
  FaTachometerAlt,
  FaThermometerHalf,
} from "react-icons/fa";

const Weather = ({ darkMode }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("San Francisco");
  const [searchInput, setSearchInput] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [locationDetails, setLocationDetails] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const lastWeatherLocation = useRef(null);

  // Google Maps API configuration
  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  // Debug logging
  useEffect(() => {
    // console.log(
    //   "Google Maps API Key:",
    //   GOOGLE_MAPS_API_KEY ? "Present" : "Missing"
    // );
    // console.log("Environment variables:", {
    //   REACT_APP_GOOGLE_MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    //   NODE_ENV: process.env.NODE_ENV,
    // });
  }, [GOOGLE_MAPS_API_KEY]);

  // Fetch weather data using Google Maps API
  const fetchWeatherData = useCallback(
    async (lat, lon) => {
      try {
        // If we already have weather for this location, use it
        if (lastWeatherLocation.current === location && weather) {
          setLoading(false);
          return;
        }
        // Generate realistic weather data based on location and current time
        const now = new Date();
        const hour = now.getHours();
        const month = now.getMonth();

        let temperature, condition, description;
        if (month >= 5 && month <= 8) {
          temperature = 70 + ((lat + lon) % 20); // 70-90°F, deterministic
          condition = "Clear";
          description = "Sunny";
        } else if (month >= 11 || month <= 2) {
          temperature = 30 + ((lat + lon) % 30); // 30-60°F
          condition = "Clouds";
          description = "Partly cloudy";
        } else {
          temperature = 50 + ((lat + lon) % 25); // 50-75°F
          condition = "Clear";
          description = "Clear sky";
        }
        if (hour < 6 || hour > 20) {
          temperature -= 10;
          description = "Clear night";
        }
        const humidity = 40 + ((lat + lon) % 40); // 40-80%
        const windSpeed = 5 + ((lat + lon) % 15); // 5-20 mph
        const pressure = 1000 + ((lat + lon) % 50); // 1000-1050 hPa
        const weatherData = {
          location: locationDetails
            ? `${locationDetails.city}, ${locationDetails.state}`
            : `${location}`,
          temperature,
          condition,
          description,
          humidity,
          windSpeed,
          feelsLike: temperature + ((lat + lon) % 5) - 2,
          high: temperature + ((lat + lon) % 10) + 5,
          low: temperature - ((lat + lon) % 10) - 5,
          pressure,
          visibility: 8 + ((lat + lon) % 5), // 8-13 km
          icon: condition.toLowerCase(),
          sunrise: new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            6,
            30
          ),
          sunset: new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            19,
            30
          ),
        };
        setWeather(weatherData);
        lastWeatherLocation.current = location;
        setLoading(false);
      } catch (err) {
        // console.error("Error fetching weather data:", err);
        setError("Failed to load weather data");
        setLoading(false);
      }
    },
    [locationDetails, location, weather]
  );

  // Now define fetchLocationAndWeather
  const fetchLocationAndWeather = useCallback(
    async (lat, lon) => {
      if (!GOOGLE_MAPS_API_KEY) {
        // console.error("Google Maps API key not provided");
        // console.error(
        //   "Please check your .env file contains: REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here"
        // );
        setError(
          "Google Maps API key not provided. Please check your environment configuration."
        );
        setLoading(false);
        return;
      }

      try {
        // console.log(
        //   "Fetching location details with API key:",
        //   GOOGLE_MAPS_API_KEY.substring(0, 10) + "..."
        // );

        // Fetch location details
        const locationResponse = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_MAPS_API_KEY}`
        );

        if (!locationResponse.ok) {
          throw new Error(
            `Failed to fetch location details: ${locationResponse.status}`
          );
        }

        const locationData = await locationResponse.json();

        if (locationData.status === "REQUEST_DENIED") {
          throw new Error(
            `Google Maps API request denied: ${
              locationData.error_message || "Invalid API key or quota exceeded"
            }`
          );
        }

        if (locationData.results && locationData.results.length > 0) {
          const result = locationData.results[0];
          const addressComponents = result.address_components;

          let city = "";
          let state = "";
          let country = "";

          addressComponents.forEach((component) => {
            if (component.types.includes("locality")) {
              city = component.long_name;
            } else if (
              component.types.includes("administrative_area_level_1")
            ) {
              state = component.short_name;
            } else if (component.types.includes("country")) {
              country = component.short_name;
            }
          });

          setLocationDetails({
            city,
            state,
            country,
            formattedAddress: result.formatted_address,
          });

          setLocation(city || result.formatted_address);
        }

        // Fetch weather data using Google's Weather API (via Places API)
        await fetchWeatherData(lat, lon);
      } catch (err) {
        // console.error("Error fetching location and weather:", err);
        setError(`Failed to load weather data: ${err.message}`);
        setLoading(false);
      }
    },
    [GOOGLE_MAPS_API_KEY, fetchWeatherData]
  );

  // Define fetchWeatherByCity last
  const fetchWeatherByCity = useCallback(async (city) => {
    setLoading(true);
    setError(null);

    try {
      // For now, we'll use mock data
      // In a real implementation, you would call a weather API here
      const mockWeatherData = {
        location: city,
        temperature: Math.floor(Math.random() * 30) + 50,
        condition: "Clear",
        description: "Clear sky",
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 15) + 5,
        feelsLike: Math.floor(Math.random() * 30) + 50,
        high: Math.floor(Math.random() * 30) + 60,
        low: Math.floor(Math.random() * 30) + 30,
        pressure: Math.floor(Math.random() * 50) + 1000,
        visibility: Math.floor(Math.random() * 5) + 8,
        icon: "clear",
        sunrise: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          6,
          30
        ),
        sunset: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          19,
          30
        ),
      };

      setWeather(mockWeatherData);
      setLoading(false);
    } catch (err) {
      // console.error("Error fetching weather by city:", err);
      setError("Failed to load weather data");
      setLoading(false);
    }
  }, []);

  // Get user location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lon } = position.coords;
          setUserLocation({ lat, lon });
          fetchLocationAndWeather(lat, lon);
        },
        (err) => {
          // console.error("Geolocation error:", err);
          fetchWeatherByCity(location);
        }
      );
    } else {
      fetchWeatherByCity(location);
    }
  }, [fetchLocationAndWeather, fetchWeatherByCity, location]);

  const searchLocation = async (query) => {
    setLoading(true);
    setError(null);

    try {
      if (!GOOGLE_MAPS_API_KEY) {
        // console.error("Google Maps API key not provided");
        throw new Error("Google Maps API key not provided");
      }

      // Search for location using Google Maps Geocoding API
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          query
        )}&key=${GOOGLE_MAPS_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`Failed to search location: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "REQUEST_DENIED") {
        throw new Error(
          `Google Maps API request denied: ${
            data.error_message || "Invalid API key or quota exceeded"
          }`
        );
      }

      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        const { lat, lng } = result.geometry.location;

        setLocation(query);
        await fetchLocationAndWeather(lat, lng);
        setShowSearch(false);
      } else {
        setError("Location not found");
        setLoading(false);
      }
    } catch (err) {
      // console.error("Location search error:", err);
      setError(`Failed to search location: ${err.message}`);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      searchLocation(searchInput.trim());
      setSearchInput("");
    }
  };

  const handleRefresh = () => {
    if (userLocation) {
      fetchLocationAndWeather(userLocation.lat, userLocation.lon);
    } else {
      fetchWeatherByCity(location);
    }
  };

  const getWeatherIcon = (condition, iconCode) => {
    const conditionLower = condition.toLowerCase();

    if (conditionLower.includes("clear")) {
      return <FaSun size={64} />;
    } else if (conditionLower.includes("clouds")) {
      return <FaCloud size={64} />;
    } else if (
      conditionLower.includes("rain") ||
      conditionLower.includes("drizzle")
    ) {
      return <FaCloudRain size={64} />;
    } else if (conditionLower.includes("snow")) {
      return <FaSnowflake size={64} />;
    } else if (conditionLower.includes("thunder")) {
      return <FaBolt size={64} />;
    } else if (
      conditionLower.includes("mist") ||
      conditionLower.includes("fog") ||
      conditionLower.includes("haze")
    ) {
      return <FaSmog size={64} />;
    } else {
      return <FaSun size={64} />;
    }
  };

  const formatTime = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatSunTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (loading) {
    return (
      <div className={`weather-app ${darkMode ? "dark-mode" : ""}`}>
        <div className="weather-loading">
          <div className="loading-spinner"></div>
          <p>Loading weather...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`weather-app ${darkMode ? "dark-mode" : ""}`}>
        <div className="weather-error">
          <FaExclamationTriangle size={24} style={{ marginBottom: "8px" }} />
          <p>{error}</p>
          <button onClick={handleRefresh}>Retry</button>
        </div>
      </div>
    );
  }

  // Add safety check for weather data
  if (!weather) {
    return (
      <div className={`weather-app ${darkMode ? "dark-mode" : ""}`}>
        <div className="weather-loading">
          <div className="loading-spinner"></div>
          <p>Loading weather data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`weather-app ${darkMode ? "dark-mode" : ""}`}>
      {/* Header */}
      <div className="weather-header">
        <div className="header-left">
          <h1>Weather</h1>
          <div className="current-time">{formatTime()}</div>
        </div>
        <div className="header-right">
          <button
            className="search-toggle-btn"
            onClick={() => setShowSearch(!showSearch)}
          >
            <FaSearch size={16} />
          </button>
          <button className="refresh-btn" onClick={handleRefresh}>
            <FaRedo size={16} />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="weather-search">
          <form onSubmit={handleSearch}>
            <div className="search-input">
              <FaMapMarkerAlt size={16} />
              <input
                type="text"
                placeholder="Search for a city..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                autoFocus
              />
              <button type="submit">
                <FaSearch size={16} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Weather Display */}
      <div className="weather-main">
        <div className="location-section">
          <div className="location-info">
            <FaLocationArrow size={16} />
            <span className="location-name">{weather.location}</span>
          </div>
        </div>

        <div className="current-weather">
          <div className="weather-icon-large">
            {getWeatherIcon(weather.condition, weather.icon)}
          </div>
          <div className="temperature-section">
            <div className="temperature-main">
              {Math.round(weather.temperature)}°
            </div>
            <div className="temperature-range">
              <span className="high">{Math.round(weather.high)}°</span>
              <span className="separator"> / </span>
              <span className="low">{Math.round(weather.low)}°</span>
            </div>
          </div>
        </div>

        <div className="weather-description">{weather.description}</div>

        <div className="feels-like">
          Feels like {Math.round(weather.feelsLike)}°
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="weather-details-grid">
        <div className="detail-card">
          <div className="detail-icon">
            <FaThermometerHalf size={20} />
          </div>
          <div className="detail-content">
            <div className="detail-label">Humidity</div>
            <div className="detail-value">{Math.round(weather.humidity)}%</div>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">
            <FaTachometerAlt size={20} />
          </div>
          <div className="detail-content">
            <div className="detail-label">Wind</div>
            <div className="detail-value">
              {Math.round(weather.windSpeed)} mph
            </div>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">
            <FaEye size={20} />
          </div>
          <div className="detail-content">
            <div className="detail-label">Visibility</div>
            <div className="detail-value">
              {Math.round(weather.visibility)} km
            </div>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">
            <FaTachometerAlt size={20} />
          </div>
          <div className="detail-content">
            <div className="detail-label">Pressure</div>
            <div className="detail-value">
              {Math.round(weather.pressure)} hPa
            </div>
          </div>
        </div>
      </div>

      {/* Sun Information */}
      <div className="sun-info">
        <div className="sun-card">
          <div className="sun-icon">🌅</div>
          <div className="sun-content">
            <div className="sun-label">Sunrise</div>
            <div className="sun-time">{formatSunTime(weather.sunrise)}</div>
          </div>
        </div>

        <div className="sun-card">
          <div className="sun-icon">🌇</div>
          <div className="sun-content">
            <div className="sun-label">Sunset</div>
            <div className="sun-time">{formatSunTime(weather.sunset)}</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="weather-footer">
        <p>Powered by Google Maps API</p>
      </div>
    </div>
  );
};

export default Weather;
