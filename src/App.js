// import React, { useState, useEffect } from 'react';
//
// function Weather() {
//   const [temperature, setTemperature] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//
//   const latitude = 37.7749;
//   const longitude = -122.4194;
//
//   useEffect(() => {
//     const fetchTemperature = async () => {
//       try {
//         const response = await fetch(
//             `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
//         );
//         const data = await response.json();
//
//         if (data.current_weather && data.current_weather.temperature) {
//           setTemperature(data.current_weather.temperature);
//         } else {
//           throw new Error("Temperature data not available");
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTemperature();
//   }, [latitude, longitude]);
//
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;
//
//   return (
//       <div>
//         <h1>Current Temperature</h1>
//         {temperature !== null ? (
//             <p>{temperature}°C</p>
//         ) : (
//             <p>Temperature data is unavailable.</p>
//         )}
//       </div>
//   );
// }
//
// export default Weather;

// import React, { useState, useEffect } from 'react';
//
// // List of cities with their latitude and longitude coordinates
// const cities = [
//   { name: "San Francisco", latitude: 37.7749, longitude: -122.4194 },
//   { name: "New York", latitude: 40.7128, longitude: -74.0060 },
//   { name: "London", latitude: 51.5074, longitude: -0.1278 },
//   { name: "Tokyo", latitude: 35.6895, longitude: 139.6917 },
//   { name: "Sydney", latitude: -33.8688, longitude: 151.2093 },
// ];
//
// function Weather() {
//   const [selectedCity, setSelectedCity] = useState(cities[0]); // Default city
//   const [temperature, setTemperature] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//
//   useEffect(() => {
//     const fetchTemperature = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(
//             `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.latitude}&longitude=${selectedCity.longitude}&current_weather=true`
//         );
//         const data = await response.json();
//
//         // Check if the temperature data is available
//         if (data.current_weather && data.current_weather.temperature) {
//           setTemperature(data.current_weather.temperature);
//         } else {
//           throw new Error("Temperature data not available");
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTemperature();
//   }, [selectedCity]);
//
//   const handleCityChange = (e) => {
//     const city = cities.find(city => city.name === e.target.value);
//     setSelectedCity(city);
//   };
//
//   return (
//       <div style={styles.container}>
//         <h1 style={styles.header}>Weather Widget</h1>
//         <select onChange={handleCityChange} value={selectedCity.name} style={styles.select}>
//           {cities.map(city => (
//               <option key={city.name} value={city.name}>
//                 {city.name}
//               </option>
//           ))}
//         </select>
//
//         <div style={styles.weatherInfo}>
//           <h2 style={styles.cityName}>{selectedCity.name}</h2>
//           {loading ? (
//               <p style={styles.loading}>Loading...</p>
//           ) : error ? (
//               <p style={styles.error}>Error: {error}</p>
//           ) : (
//               <p style={styles.temperature}>{temperature}°C</p>
//           )}
//         </div>
//       </div>
//   );
// }
//
// const styles = {
//   container: {
//     padding: '20px',
//     borderRadius: '10px',
//     backgroundColor: '#f0f4f8',
//     maxWidth: '300px',
//     margin: 'auto',
//     textAlign: 'center',
//     boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//     fontFamily: 'Arial, sans-serif',
//   },
//   header: {
//     fontSize: '24px',
//     color: '#333',
//     marginBottom: '10px',
//   },
//   select: {
//     padding: '8px',
//     fontSize: '16px',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//     marginBottom: '15px',
//     cursor: 'pointer',
//   },
//   weatherInfo: {
//     backgroundColor: '#fff',
//     padding: '15px',
//     borderRadius: '8px',
//     boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
//   },
//   cityName: {
//     fontSize: '20px',
//     color: '#333',
//     marginBottom: '5px',
//   },
//   temperature: {
//     fontSize: '32px',
//     fontWeight: 'bold',
//     color: '#ff4500',
//   },
//   error: {
//     color: '#d9534f',
//   },
//   loading: {
//     color: '#555',
//   },
// };
//
// export default Weather;
//
// import React, { useState, useEffect } from 'react';
//
// // List of cities with their latitude and longitude coordinates
// const cities = [
//   { name: "San Francisco", latitude: 37.7749, longitude: -122.4194 },
//   { name: "New York", latitude: 40.7128, longitude: -74.0060 },
//   { name: "London", latitude: 51.5074, longitude: -0.1278 },
//   { name: "Tokyo", latitude: 35.6895, longitude: 139.6917 },
//   { name: "Sydney", latitude: -33.8688, longitude: 151.2093 },
//   { name: "Paris", latitude: 48.8566, longitude: 2.3522 },
//   { name: "Berlin", latitude: 52.52, longitude: 13.4050 },
//   { name: "Moscow", latitude: 55.7558, longitude: 37.6176 },
//   { name: "Toronto", latitude: 43.65107, longitude: -79.347015 },
//   { name: "Mumbai", latitude: 19.0760, longitude: 72.8777 },
// ];
//
// function WeatherCarousel() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [weatherData, setWeatherData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//
//   const citiesPerPage = 5;
//
//   // Fetch weather data for all cities at once
//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const data = await Promise.all(
//             cities.map(async (city) => {
//               const response = await fetch(
//                   `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true&temperature_2m&relative_humidity_2m&cloudcover&windspeed_10m&precipitation_sum&uv_index`
//               );
//               const weather = await response.json();
//
//               if (weather.current_weather) {
//                 return {
//                   name: city.name,
//                   temperature: weather.current_weather.temperature,
//                   humidity: weather.current_weather.relative_humidity,
//                   cloudiness: weather.current_weather.cloudcover,
//                   windSpeed: weather.current_weather.windspeed,
//                   precipitation: weather.current_weather.precipitation,
//                   uvIndex: weather.current_weather.uv_index,
//                 };
//               } else {
//                 throw new Error("Weather data not available");
//               }
//             })
//         );
//         setWeatherData(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchWeatherData();
//   }, []);
//
//   // Automatic carousel scrolling every 10 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + citiesPerPage) % cities.length);
//     }, 10000); // 10 seconds
//
//     return () => clearInterval(interval);
//   }, []);
//
//   // Get the current set of 5 cities
//   const currentCities = weatherData.slice(currentIndex, currentIndex + citiesPerPage);
//
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;
//
//   return (
//       <div style={styles.container}>
//         <h1 style={styles.header}>Weather Carousel</h1>
//         <div style={styles.carousel}>
//           {currentCities.map((city, index) => (
//               <div key={index} style={styles.cityCard}>
//                 <h2 style={styles.cityName}>{city.name}</h2>
//                 <p style={styles.info}>🌡️ Temperature: {city.temperature}°C</p>
//                 <p style={styles.info}>💧 Humidity: {city.humidity}%</p>
//                 <p style={styles.info}>☁️ Cloudiness: {city.cloudiness}%</p>
//                 <p style={styles.info}>🌬️ Wind Speed: {city.windSpeed} m/s</p>
//                 <p style={styles.info}>☔ Precipitation: {city.precipitation} mm</p>
//                 <p style={styles.info}>☀️ UV Index: {city.uvIndex}</p>
//               </div>
//           ))}
//         </div>
//         <p style={styles.note}>Switching cities every 10 seconds...</p>
//       </div>
//   );
// }
//
// const styles = {
//   container: {
//     padding: '20px',
//     borderRadius: '10px',
//     backgroundColor: '#f0f4f8',
//     maxWidth: '800px',
//     margin: 'auto',
//     textAlign: 'center',
//     boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//     fontFamily: 'Arial, sans-serif',
//   },
//   header: {
//     fontSize: '24px',
//     color: '#333',
//     marginBottom: '10px',
//   },
//   carousel: {
//     display: 'flex',
//     justifyContent: 'space-around',
//     gap: '10px',
//   },
//   cityCard: {
//     backgroundColor: '#fff',
//     padding: '15px',
//     borderRadius: '8px',
//     boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
//     width: '140px',
//     textAlign: 'center',
//   },
//   cityName: {
//     fontSize: '18px',
//     color: '#333',
//     marginBottom: '5px',
//   },
//   info: {
//     fontSize: '14px',
//     margin: '5px 0',
//   },
//   note: {
//     fontSize: '12px',
//     color: '#888',
//     marginTop: '10px',
//   },
// };
//
// export default WeatherCarousel;

import Sidebar from "./pages/Sidebar";

function App() {
  return (
      <div>
        <Sidebar />
      </div>
  );
}

export default App;