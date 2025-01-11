import { useEffect, useState } from "react";
import axios from "axios";
import "./FrontPage.css";
import weatherImg from "./weatherApplicationMainImg.avif";
import logo from "./weatherlogo-removebg-preview.png";


const FrontPage = () => {
  const [city, setCity] = useState(null);
  const [searchCity, setSearchCity] = useState("Nagpur");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=7366b12c7fbd1954d0cc9fb3b38b8ddf&units=metric`;
      try {
        const response = await axios.get(url);
        setCity(response.data);
        setError(null);
      } catch (error) {
        setError("Failed to fetch weather data.");
        setCity(null);
      }
    };
    fetchApi();
  }, [searchCity]);

  return (
    <>
      <div className="WeatherApp">
        <img
          className="weatherImg"
          src={weatherImg}
          alt=""
        />
        <div className="mainContent">
          <h1 className="fontfamily text-center"><img className="logo" src={logo} alt="" />Weather Application</h1>
          <h3 className="fontfamily text-white text-center">"Your Weather, Your Way: Accurate Forecasts at Your Fingertips!"</h3>
          <div className="InfoContent">
            <div>
              <input
                value={searchCity}
                onChange={(evt) => {
                  setSearchCity(evt.target.value);
                }}
                className="searchCity"
                type="text"
                placeholder="Search Place..."
              />
              {!searchCity ? (
                <p className="errorMsg fontfamily">Please enter a city name.</p>
              ) : error ? (
                <p className="errorMsg fontfamily">{error}</p>
              ) : !city ? (
                <p className="errorMsg fontfamily">No Data Found</p>
              ) : (
                <div className="Info">
                  <p className="display-4 fontfamily text-white">
                    <i className="fas fa-street-view streetViewIcon "></i> {searchCity}
                  </p>
                  <h3>{city.main.temp}°C</h3>
                  <p className="fontfamily" style={{fontSize:"20px"}}>
                    Min: {city.main.temp_min}°C | | Max: {city.main.temp_max}°C
                  </p>

                  <div className=" d-flex align-items-center justify-content-center"style={{columnGap:"2rem"}}>
                <p className="temp fontfamily"> Humidity <i className="fa-solid fa-droplet"></i> {city.main.humidity}</p>
                <p className="temp fontfamily">Wind  <i className="fa-solid fa-wind"></i> {city.wind.speed}</p>
             </div>
                </div>               
              )}
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FrontPage;

