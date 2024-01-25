import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./app.css";

class App extends React.Component {
  state = {
    userPosition: {
      latitude: {},
      longitude: {}
    },
    data: [],
    dailyData: []
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {

        let pos = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        this.setState({ userPosition: pos });
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.userPosition.latitude}&lon=${this.state.userPosition.longitude}&%20exclude=minutely&appid=128944992833eb85f19eeebe5415027c`
        )
          .then((response) => response.json())
          .then((data) => {
            this.setState({ data: data, dailyData: data.daily });
          });
      });
    }
  }

  render() {
    const location = this.state.data.timezone;
    const listItems = this.state.dailyData.map(
      ({ dt, temp: { day }, weather: [{ description, icon, main, id }] }) => (
        <ul key={dt}>
          <li>{moment(dt * 1000).format("dddd")}</li>
          <li>{moment(dt * 1000).format("MMMM Do, h:mm a")}</li>
          <li>
            <img
              src={`http://openweathermap.org/img/wn/${icon}.png`}
              alt="weather icon"
            />
          </li>
          <li>{Math.round(day - 273.15)}°C</li>
          <li>{description}</li>
        </ul>
      )
    );
    const DivStyles = {
      margin: "10px",
      padding: "10px",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center"
    };
    return (
      <>
        <h1>{location}</h1>
        <h2>8 Day Weather Forecast</h2>
        <div style={DivStyles}>{listItems}
        <footer className="app-footer">
          <p>&copy; Weather App Created By Vishu Vaishnav</p>
        </footer></div>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
