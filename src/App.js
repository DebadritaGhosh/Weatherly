import React, { useEffect, useState } from 'react';
import axios from "axios";
import styled from "styled-components";

const App = () => {

  const [weather, setWeather] = useState(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    const location = axios.get(`http://api.weatherapi.com/v1/current.json?key=ac42b55a5c264f8aabb142914211706&q=Kolkata`)
      .then(data => { setWeather(data.data) })
      .catch(err => { console.log(err) })
  }, []);

  const weatherInput = (e) => {
    setInput(e.target.value);
  }
  const searchWeather = () => {
    const location = axios.get(`http://api.weatherapi.com/v1/current.json?key=ac42b55a5c264f8aabb142914211706&q=${input}`)
      .then(data => { setWeather(data.data) })
      .catch(err => { console.log(err) })
  }
  return (
    <>
      {weather && (
        <WeatherApp>
          <Logo>Weatherly</Logo>
          <WeatherSearch>
            <input type="text" onChange={weatherInput} placeholder="Enter city name" />
            <button onClick={searchWeather}>Search</button>
          </WeatherSearch>
          <WeatherInfo>
            <h1>{weather.location.country}</h1>
            <h2>{weather.location.region}</h2>
            <div>
              <h3>{weather.current.condition.text}</h3>
              <img src={weather.current.condition.icon} alt="error" />
              <h3>{weather.current.temp_c} celsius</h3>
            </div>
          </WeatherInfo>
        </WeatherApp>
      )}
    </>
  );
}

const WeatherApp = styled.div`
  min-height: 100vh;
  display : flex;
  flex-direction: column;
  align-items: center;
  padding:  5rem;
  background-color: #CAD5E2;
`;
const WeatherSearch = styled.div`
  min-height: 10vh;
  width: 100%;
  display : flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  input{
    width: 30%;
    padding: 0.6rem;
  }
  button {
    width: 20%;
    height: 3rem;
    padding: 0.2rem;
    border-radius: 5px;
    border: none;
    background-color: #E03B8B;
    cursor: pointer;
    color: #FFF;
    font-size: 1.2rem;
    &:hover{
      background-color: #FFF;
      color:#E03B8B;
      transition: all 1s ease-in;
      border: 2px solid #E03B8B;
    }
  }
`;
const WeatherInfo = styled.div`
  text-align: center;
`;

const Logo = styled.h1`
  font-family: 'Great Vibes', cursive;
  color:#E03B8B;
`;
export default App;
