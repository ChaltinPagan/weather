const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');
const key = require('./env.js');
const port = 8000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res, next) {
    // res.sendFile(path.join(__dirname, 'routes.html'));
    res.send("APIXU Weather Routes");
});

app.get('/weather', function (req, res, next) {
    axios.get(`https://api.apixu.com/v1/forecast.json?key=${key.api_key}&q=new%20york&days=5`)
        .then( response => {
            res.status(200)
                .send({
                    status: 'success',
                    data: response.data
                });
        })
        .catch( err => {
            console.log(err);
        })
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});