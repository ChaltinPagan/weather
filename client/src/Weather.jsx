import React, { Component } from 'react';
import axios from 'axios';

class Weather extends Component {
    constructor(){
        super();
        this.state = {
            location: null,
            current: null,
            forecast: null
        }
    }

    getWeather = () => {
        axios.get('weather')
            .then( res => {
                console.log(res.data);
                this.setState({
                    location: res.data.location,
                    current: res.data.current,
                    forecast: res.data.forecast
                })
            })
    }

    componentDidMount = () => {
        this.getWeather();
    }

    render(){
        const { location, forecast } = this.state;
        console.log("forecast: ", forecast)
        if (!forecast) {
            return(
                <div>Try again later.</div>
            )
        }

        return(
            <section id="weather">
                <h1>5-Day Forecast</h1>
                <h2 id="location">{location.name}</h2>
                {forecast.map( (el, i) =>
                    <section className="forecast" key={i}>
                        <p id="day">Day:{" "}{new Date(el.date_epoch*1000).toUTCString().slice(0, 16)}</p>
                        <img src={el.day.condition.icon} alt={el.day.condition.text} />
                        <p id="high-temp">High:{" "}{el.day.maxtemp_f} &deg;F</p>
                        <p id="low-temp">Low:{" "}{el.day.mintemp_f} &deg;F</p>
                        <p id="precipitation">Precipitation:{" "} {el.day.totalprecip_in} in.</p>
                        <p id="humidity">Humidity:{" "}{el.day.avghumidity}%</p>
                        <p id="uv-index">UV Index:{" "}{el.day.uv}</p>
                        <p id="sunrise">Sunrise:{" "}{el.astro.sunrise}</p>
                        <p id="sunset">Sunset:{" "}{el.astro.sunset}</p>
                    </section>
                    )}
            </section>
        )
    }
}

export default Weather;