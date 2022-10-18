import axios from "axios";
import { useState, useEffect } from "react";
import "./app.css";
import cities from "./data";

const api = {
  key: "f842afde2b36c118775f4b64e7a80d62",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [selectedCity, setSelectedCity] = useState(cities[1]);
  const [weather, setWeather] = useState([]);

  const getWeatherData = async () => {
    const { data } = await axios.get(
      `${api.base}weather?q=${selectedCity}&units=metric&APPID=${api.key}`
    );
    setWeather(data);
    console.log(data);
  };

  useEffect(() => {
    getWeatherData();
  }, [selectedCity]);

  const dateBuilder = (d) => {
    console.log(d);
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day}, ${date} ${month}, ${year}`;
  };

  return (
    <div
      className={
        weather.main?.temp.toFixed() > 16 ? "container warm" : "container"
      }
    >
      <div className={weather.main?.temp.toFixed() > 16 ? "app warm" : "app"}>
        <main>
          <div className="top">
            {typeof weather.main != "undefined" && (
              <div>
                <div className="location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="date">{dateBuilder(new Date())}</div>

                <div>
                  <div className="temp">
                    <h2>{weather.main?.temp.toFixed()}°C</h2>
                  </div>
                  <div>
                    <div className="situation">
                      <h3>
                        {weather.weather && weather.weather[0].description}
                      </h3>{" "}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="select-area">
            <select
              className="custom-select"
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              {cities.map((el, index) => {
                return (
                  <option value={el} key={index}>
                    {el}
                  </option>
                );
              })}
            </select>
            <br />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
