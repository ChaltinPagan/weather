const express = require('express');
const logger = require('morgan');
const app = express();
const axios = require('axios');
const key = process.env.API_KEY;
const port = process.env.PORT || 8000;

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', function (req, res, next) {
    res.send("APIXU Weather Routes");
});

app.get('/weather/:city', function (req, res, next) {
    axios.get(`https://api.apixu.com/v1/forecast.json?key=${key.api_key}&q=${req.params.city}&days=5`)
        .then( response => {
            res.status(200)
                .send({
                    status: 'success',
                    location: response.data.location,
                    current: response.data.current,
                    forecast: response.data.forecast.forecastday
                });
        })
        .catch( err => {
            console.log(err);
        })
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});