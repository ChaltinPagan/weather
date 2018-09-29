import React, { Component } from 'react';
import axios from 'axios';
import Form from './Form';
import Forecast from './Forecast';

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
            return (
                <div id="loading">
                    <i id="loading" className="fas fa-spinner fa-pulse"></i>
                </div>
            )
        }

        if (!forecast) {
            return (
                <div id="technical-difficulty">
                    <i className="fas fa-exclamation"></i>
                    <p>We are experiencing technical difficulties.<br />
                    Please try again later.</p>
                </div>
            )
        }

        return(
            <section id="weather">
                <header>
                    <h1>5-Day Forecast for {location.name}</h1>
                </header>

                <Form city_input={city_input} 
                handleCityInput={this.handleCityInput} 
                getWeather={this.getWeather} />
                
                <section id="temp-choice">
                    <button id="celsius" name="temp_unit" onClick={this.handleTempUnit}>&deg;C</button>
                    <button id="fahrenheit" name="temp_unit" onClick={this.handleTempUnit}>&deg;F</button>
                </section>

                <Forecast forecast={forecast} 
                temp_unit={temp_unit} />

            </section>
        )
    }
}

export default Weather;