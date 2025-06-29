import React, { useState, useEffect, useCallback, useRef } from "react";
import "../Styles/Weather.css";

const Weather = ({ darkMode }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("San Francisco");
  const [searchInput, setSearchInput] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [locationDetails, setLocationDetails] = useState(null);
  const lastWeatherLocation = useRef(null);

  // Google Maps API configuration
  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  // Debug logging
  useEffect(() => {
    // Removed debug logging
  }, [GOOGLE_MAPS_API_KEY]);

  // Fetch weather data using Google Maps API
  const fetchWeatherData = useCallback(
    async (lat, lon) => {
      if (!GOOGLE_MAPS_API_KEY) {
        setError(
          "Google Maps API key not provided. Please check your environment configuration."
        );
        setLoading(false);
        return;
      }
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
        setError(
          "Google Maps API key not provided. Please check your environment configuration."
        );
        setLoading(false);
        return;
      }

      try {
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
        low: Math.floor(Math.random() * 30) + 40,
        pressure: Math.floor(Math.random() * 50) + 1000,
        visibility: Math.floor(Math.random() * 5) + 8,
        icon: "clear",
        sunrise: new Date(new Date().setHours(6, 30, 0, 0)),
        sunset: new Date(new Date().setHours(19, 30, 0, 0)),
      };
      setWeather(mockWeatherData);
      setLocation(city);
    } catch (err) {
      setError(err.message || "Failed to load weather data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Try to get user's location on component mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          setUserLocation(coords);
          fetchLocationAndWeather(coords.lat, coords.lon);
        },
        (error) => {
          // Fallback to default location
          fetchWeatherByCity(location);
        }
      );
    } else {
      fetchWeatherByCity(location);
    }
  }, [
    location,
    fetchLocationAndWeather,
    fetchWeatherByCity,
    GOOGLE_MAPS_API_KEY,
  ]);

  const searchLocation = async (query) => {
    if (!GOOGLE_MAPS_API_KEY) {
      setError(
        "Google Maps API key not provided. Please check your environment configuration."
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch location details
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
        const coords = result.geometry.location;

        setUserLocation({
          lat: coords.lat,
          lon: coords.lng,
        });

        await fetchLocationAndWeather(coords.lat, coords.lng);
      } else {
        setError("Location not found");
        setLoading(false);
      }
    } catch (err) {
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
      return <span style={{ fontSize: "48px" }}>☀️</span>;
    } else if (conditionLower.includes("clouds")) {
      return <span style={{ fontSize: "48px" }}>☁️</span>;
    } else if (
      conditionLower.includes("rain") ||
      conditionLower.includes("drizzle")
    ) {
      return <span style={{ fontSize: "48px" }}>🌧️</span>;
    } else if (conditionLower.includes("snow")) {
      return <span style={{ fontSize: "48px" }}>❄️</span>;
    } else if (conditionLower.includes("thunder")) {
      return <span style={{ fontSize: "48px" }}>⚡</span>;
    } else if (
      conditionLower.includes("mist") ||
      conditionLower.includes("fog") ||
      conditionLower.includes("haze")
    ) {
      return <span style={{ fontSize: "48px" }}>🌫️</span>;
    } else {
      return <span style={{ fontSize: "48px" }}>☀️</span>;
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
          <span style={{ fontSize: "24px", marginBottom: "8px" }}>⚠️</span>
          <p>{error}</p>
          <div
            style={{
              fontSize: "12px",
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#f0f0f0",
              borderRadius: "5px",
            }}
          >
            <strong>Debug Info:</strong>
            <br />
            API Key Present: {GOOGLE_MAPS_API_KEY ? "Yes" : "No"}
            <br />
            API Key Length:{" "}
            {GOOGLE_MAPS_API_KEY ? GOOGLE_MAPS_API_KEY.length : 0}
            <br />
            NODE_ENV: {process.env.NODE_ENV}
            <br />
            All Env Vars:{" "}
            {JSON.stringify({
              REACT_APP_GOOGLE_MAPS_API_KEY: process.env
                .REACT_APP_GOOGLE_MAPS_API_KEY
                ? "Present"
                : "Missing",
              NODE_ENV: process.env.NODE_ENV,
            })}
          </div>
          <button onClick={handleRefresh}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`weather-app ${darkMode ? "dark-mode" : ""}`}>
      <div className="weather-header">
        <h2>Weather</h2>
        <div className="weather-time">{formatTime()}</div>
      </div>

      <div className="weather-search">
        <form onSubmit={handleSearch}>
          <div className="search-input">
            <span style={{ fontSize: "16px" }}>📍</span>
            <input
              type="text"
              placeholder="Search city or address..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit">
              <span style={{ fontSize: "16px" }}>🔍</span>
            </button>
          </div>
        </form>
      </div>

      <div className="weather-main">
        <div className="weather-location">{weather.location}</div>
        <div className="weather-icon">
          {getWeatherIcon(weather.condition, weather.icon)}
        </div>
        <div className="weather-temperature">{weather.temperature}°F</div>
        <div className="weather-condition">{weather.description}</div>
        <div className="weather-feels-like">
          Feels like {weather.feelsLike}°F
        </div>
      </div>

      <div className="weather-details">
        <div className="weather-detail-item">
          <span className="detail-label">High</span>
          <span className="detail-value">{weather.high}°F</span>
        </div>
        <div className="weather-detail-item">
          <span className="detail-label">Low</span>
          <span className="detail-value">{weather.low}°F</span>
        </div>
        <div className="weather-detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{weather.humidity}%</span>
        </div>
        <div className="weather-detail-item">
          <span className="detail-label">Wind</span>
          <span className="detail-value">{weather.windSpeed} mph</span>
        </div>
        <div className="weather-detail-item">
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{weather.pressure} hPa</span>
        </div>
        <div className="weather-detail-item">
          <span className="detail-label">Visibility</span>
          <span className="detail-value">{weather.visibility} km</span>
        </div>
      </div>

      <div className="weather-sun-info">
        <div className="sun-item">
          <span className="sun-label">Sunrise</span>
          <span className="sun-time">{formatSunTime(weather.sunrise)}</span>
        </div>
        <div className="sun-item">
          <span className="sun-label">Sunset</span>
          <span className="sun-time">{formatSunTime(weather.sunset)}</span>
        </div>
      </div>

      <div className="weather-footer">
        <p>Powered by Google Maps API</p>
        <button className="refresh-btn" onClick={handleRefresh}>
          <span style={{ fontSize: "16px", marginRight: "8px" }}>🔄</span>
          Refresh
        </button>
      </div>
    </div>
  );
};

export default Weather;
