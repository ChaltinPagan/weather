import React, { Component } from 'react';
import axios from 'axios';
import Form from './components/Form';

class Weather extends Component {
    constructor(){
        super();
        this.state = {
            location: null,
            current: null,
            forecast: null,
            temp_unit: "fahrenheit", 
            city_input: "New York", 
            loading: false
        }
    }

    getWeather = () => {
        const { city_input } = this.state;
        this.setState({ loading: true }, () => {
            axios.get(`/weather/${city_input}`)
                .then( res => {
                    setTimeout(() => {
                        console.log(res.data);
                        this.setState({
                            location: res.data.location,
                            current: res.data.current,
                            forecast: res.data.forecast,
                            loading: false
                        })
                    }, 2000)
                })
        })
        // axios.get(`/weather/${city_input}`)
        //     .then( res => {
        //         console.log(res.data);
        //         this.setState({
        //             location: res.data.location,
        //             current: res.data.current,
        //             forecast: res.data.forecast
        //         })
        //     })
    }

    handleTempUnit = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.id
        })
    }

    handleCityInput = (e) => {
        e.preventDefault();
        this.setState({
            city_input: e.target.value
        })
    }

    componentDidMount = () => {
        this.getWeather();
    }

    render(){
        const { location, forecast, temp_unit, city_input, loading } = this.state;
        console.log("forecast: ", forecast);
        console.log("temp unit: ", temp_unit);
        console.log("city input: ", city_input);

        if (loading) {
            return <div>Loading...</div>
        }

        if (!forecast) {
            return <div>Try again later.</div>
        }

        return(
            <section id="weather">
                <header>
                    <h1>5-Day Forecast for {location.name}</h1>
                </header>

                <Form city_input={city_input} handleCityInput={this.handleCityInput} getWeather={this.getWeather} />
                
                <section id="temp-choice">
                    <button id="celsius" name="temp_unit" onClick={this.handleTempUnit}>&deg;C</button>
                    <button id="fahrenheit" name="temp_unit" onClick={this.handleTempUnit}>&deg;F</button>
                </section>

                {forecast.map( (el, i) =>
                    <section className="forecast" key={i}>
                        <p id="day">{new Date(el.date_epoch*1000).toUTCString().slice(0, 16)}</p>
                        <img src={el.day.condition.icon} alt={el.day.condition.text} id="condition-icon"/>
                        <p id="condition-text">{el.day.condition.text}</p>
                        <p id="high-temp">High:{" "}{temp_unit === "fahrenheit" ? el.day.maxtemp_f : el.day.maxtemp_c}</p>
                        <p id="low-temp">Low:{" "}{temp_unit === "fahrenheit" ?el.day.mintemp_f : el.day.mintemp_c}</p>
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