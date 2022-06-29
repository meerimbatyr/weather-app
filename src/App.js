import axios from "axios";
import { useState, useEffect } from "react";
import "./app.css";
/*this object will have your keys and the base urs*/
/* please get your key from https://home.openweathermap.org/users/sign_up */
const api = {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const cities = [
    "Select a City",
    "Bishkek",
    "california",
    "Sonsonate",
    "Moscow",
    "Qatar",
    "Aktau",
    "Aberdeen",
    "Abilene",
    "Akron",
    "Albany",
    "Albuquerque",
    "Alexandria",
    "Allentown",
    "Amarillo",
    "Anaheim",
    "Anchorage",
    "Ann Arbor",
    "Antioch",
    "Apple Valley",
    "Appleton",
    "Arlington",
    "Arvada",
    "Asheville",
    "Athens",
    "Atlanta",
    "Atlantic City",
    "Augusta",
    "Aurora",
    "Austin",
    "Bakersfield",
    "Baltimore",
    "Barnstable",
    "Baton Rouge",
    "Beaumont",
    "Bel Air",
    "Bellevue",
    "Berkeley",
    "Bethlehem",
    "Billings",
    "Birmingham",
    "Bloomington",
    "Boise",
    "Boise City",
    "Bonita Springs",
    "Boston",
    "Boulder",
    "Bradenton",
    "Bremerton",
    "Bridgeport",
    "Brighton",
  ];
  {
    /*you can add more cities here*/
  }

  // im giving you one useState that is with the start value of the cities index[1]
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

  // maybe after calling the API in use effect you will need to save the information in another useState
  // like weather

  // remeber every time the city changes you need to call the api with the new data
  //here you will write your useEffect

  /*create a fuction to call the api*/
  /* here you have a model of the api*/
  /* `${api.base}weather?q=${selectedCity}&units=metric&APPID=${api.key}`*/

  // here is needed to filter the data that you aredy got from your API
  //
  // HINT !!!! maybe when you call the API the will be empty and you will have an error

  const handleChange = (event) => {
    setSelectedCity(event.target.value);
  };
  return (
    <div className="container warm">
      <div className=" app warm">
        <main>
          <div className="top">
            <div className="location">{selectedCity}</div>
            {/* render The city*/}
            <div>
              <div className="temp">
                <h2>{weather.main?.temp.toFixed()}°C</h2>{" "}
                {/*render the temperature*/}
              </div>
              <div>
                <div className="situation">
                  <h3>{weather.weather && weather.weather[0].description}</h3>{" "}
                  {/*render Situation*/}
                </div>
              </div>
            </div>
          </div>
          <div className="select-area">
            {" "}
            {/*create a selector to show the cities
            on change you need to update your selectedCity
*/}
            <select
              className="custom-select"
              onChange={(event) => handleChange(event)}
            >
              {
                /* we need to map our cities in order to show the options */
                cities.map((el) => {
                  return <option value={el}>{el}</option>;
                })
              }

              <option></option>
            </select>
            <br />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
