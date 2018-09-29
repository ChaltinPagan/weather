import React from 'react';

const Form = ({ city_input, handleCityInput, getWeather }) => {
    return (
        <section id="city">
            <input id="city-input" type="text" value={city_input} onChange={handleCityInput} /><br />
            <button id="city-submit" type="submit" onClick={getWeather}>Submit</button>
        </section>
    )
}

export default Form;