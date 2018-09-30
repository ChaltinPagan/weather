import React from 'react';

const Forecast = ({ forecast, temp_unit }) => {
    return (
        <section id="forecast">
        {forecast.map( (el, i) =>
            <section className="daily-forecast card" key={i}>
                <h5 id="day" className="card-header">{new Date(el.date_epoch*1000).toUTCString().slice(0, 16)}</h5>
                <div className="card-body">
                    <img src={el.day.condition.icon} alt={el.day.condition.text} id="condition-icon"/>
                    <p id="condition-text" className="card-title">{el.day.condition.text}</p>
                    <hr />
                    <p id="high-temp">High:{" "}{temp_unit === "fahrenheit" ? el.day.maxtemp_f + " F" : el.day.maxtemp_c + " C"}</p>
                    <p id="low-temp">Low:{" "}{temp_unit === "fahrenheit" ?el.day.mintemp_f + " F" : el.day.mintemp_c + " C"}</p>
                    <p id="precipitation">Precipitation:{" "} {el.day.totalprecip_in} in.</p>
                    <p id="humidity">Humidity:{" "}{el.day.avghumidity}%</p>
                    <p id="uv-index">UV Index:{" "}{el.day.uv}</p>
                    <p id="sunrise">Sunrise:{" "}{el.astro.sunrise}</p>
                    <p id="sunset">Sunset:{" "}{el.astro.sunset}</p>
                </div>
            </section>
            )}
        </section>
    )
}

export default Forecast;